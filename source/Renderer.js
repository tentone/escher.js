"use strict";

import {Pointer} from "./input/Pointer.js";

/**
 * The renderer is resposible for drawing the structure into the canvas element.
 *
 * Its also resposible for managing the canvas state.
 *
 * @class
 */
function Renderer(canvas)
{
	/**
	 * Canvas DOM element, has to be managed by the user.
	 */
	this.canvas = canvas;

	/**
	 * Canvas 2D rendering context used to draw content.
	 */
	this.context = canvas.getContext("2d");
	this.context.imageSmoothingEnabled = true;
	this.context.globalCompositeOperation = "source-over";

	/**
	 * Pointer input handler object.
	 */
	this.pointer = new Pointer();
	this.pointer.setCanvas(canvas);

	/**
	 * Indicates if the canvas should be automatically cleared on each new frame.
	 */
	this.autoClear = true;
}

/**
 * Creates a infinite render loop to render the group into a viewport each frame.
 *
 * The render loop cannot be destroyed.
 *
 * @param {Object2D} group Group to be rendererd.
 * @param {Viewport} viewport Viewport into the objects.
 * @param {Function} onUpdate Function called before rendering the frame.
 */
Renderer.prototype.createRenderLoop = function(group, viewport, onUpdate)
{
	function loop()
	{
		if(onUpdate !== undefined)
		{
			onUpdate();
		}

		this.update(group, viewport);
		requestAnimationFrame(loop);
	}

	loop();
};

/**
 * Update the renderer state, update the input handlers, calculate the object and viewport transformation matrices.
 *
 * Render the object using the viewport into a canvas element.
 *
 * The canvas state is saved and restored for each individual object, ensuring that the code of one object does not affect another one.
 *
 * Should be called at a fixed rate preferably using the requestAnimationFrame() method, its also possible to use the createRenderLoop() method, that automatically creates a infinite render loop.
 *
 * @param object Object to be updated.
 * @param viewport Viewport to be updated (should be the one where the objects will be rendered after).
 */
Renderer.prototype.update = function(object, viewport)
{
	// Get objects to be rendered
	var objects = []
	object.traverse(function(child)
	{
		if(child.visible)
		{
			objects.push(child);
		}
	});

	// Sort objects by layer
	objects.sort(function(a, b)
	{
		return b.layer - a.layer;
	});

	// Pointer object update
	var pointer = this.pointer;
	pointer.update();

	// Viewport transform matrix
	viewport.updateControls(pointer);
	viewport.updateMatrix();

	// Project pointer coordinates
	var point = pointer.position.clone();
	var viewportPoint = viewport.inverseMatrix.transformPoint(point);

	// Object pointer events
	for(var i = 0; i < objects.length; i++)
	{
		var child = objects[i];
		
		//Process the
		if(child.pointerEvents)
		{
			var childPoint = child.inverseGlobalMatrix.transformPoint(child.ignoreViewport ? point : viewportPoint);

			// Check if the pointer pointer is inside
			if(child.isInside(childPoint))
			{
				// Pointer enter
				if(!child.pointerInside && child.onPointerEnter !== null)
				{			
					child.onPointerEnter(pointer, viewport);
				}

				// Pointer over
				if(child.onPointerOver !== null)
				{
					child.onPointerOver(pointer, viewport);
				}

				// Pointer pressed
				if(pointer.buttonPressed(Pointer.LEFT) && child.onButtonPressed !== null)
				{	
					child.onButtonPressed(pointer, viewport);
				}

				// Just released
				if(pointer.buttonJustReleased(Pointer.LEFT) && child.onButtonUp !== null)
				{	
					child.onButtonUp(pointer, viewport);
				}

				// Pointer just pressed
				if(pointer.buttonJustPressed(Pointer.LEFT))
				{
					if(child.onButtonDown !== null)
					{
						child.onButtonDown(pointer, viewport);
					}

					// Drag object and break to only start a drag operation on the top element.
					if(child.draggable)
					{
						child.beingDragged = true;
						break;
					}
				}

				child.pointerInside = true;
			}
			else if(child.pointerInside)
			{
				// Pointer leave
				if(child.onPointerLeave !== null)
				{
					child.onPointerLeave(pointer, viewport);
				}

				child.pointerInside = false;
			}

			// Stop object drag
			if(pointer.buttonJustReleased(Pointer.LEFT))
			{	
				if(child.draggable)
				{
					child.beingDragged = false;
				}
			}
		}
	}

	// Object drag events and update logic
	for(var i = 0; i < objects.length; i++)
	{
		var child = objects[i];

		// Pointer drag event
		if(child.beingDragged)
		{	
			var lastPosition = pointer.position.clone();
			lastPosition.sub(pointer.delta);

			var positionWorld =  viewport.inverseMatrix.transformPoint(pointer.position);
			var lastWorld =  viewport.inverseMatrix.transformPoint(lastPosition);

			// Mouse delta in world coordinates
			positionWorld.sub(lastWorld);

			if(child.onPointerDrag !== null)
			{
				child.onPointerDrag(pointer, viewport, positionWorld);
			}
		}

		// On update
		if(child.onUpdate !== null)
		{
			child.onUpdate();
		}
	}

	// Update transformation matrices
	object.traverse(function(child)
	{
		child.updateMatrix();
	});
	
	// Sort objects by layer
	objects.sort(function(a, b)
	{
		return a.layer - b.layer;
	});
	
	this.context.setTransform(1, 0, 0, 1, 0, 0);
	
	// Clear canvas content
	if(this.autoClear)
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	// Render into the canvas
	for(var i = 0; i < objects.length; i++)
	{	
		if(objects[i].isMask)
		{
			continue;
		}

		if(objects[i].saveContextState)
		{
			this.context.save();
		}

		// Apply all masks
		var masks = objects[i].masks;
		for(var j = 0; j < masks.length; j++)
		{
			if(!masks[j].ignoreViewport)
			{
				viewport.matrix.setContextTransform(this.context);
			}

			masks[j].clip(this.context, viewport, this.canvas);
		}

		// Set the viewport transform
		if(!objects[i].ignoreViewport)
		{
			viewport.matrix.setContextTransform(this.context);
		}

		// Apply the object transform to the canvas context
		objects[i].transform(this.context, viewport, this.canvas);
		objects[i].draw(this.context, viewport, this.canvas);

		if(objects[i].restoreContextState)
		{
			this.context.restore();
		}
	}
};

export {Renderer};
