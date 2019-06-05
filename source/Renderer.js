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
}

/**
 * Update the renderer state, update the input handlers, calculate the object and viewport transformation matrices.
 *
 * Render the object using the viewport into a canvas element.
 *
 * The canvas state is saved and restored for each individual object, ensuring that the code of one object does not affect another one.
 *
 * Should be called at a fixed rate preferably using the requestAnimationFrame() method.
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

	// Object transformation matrices
	for(var i = 0; i < objects.length; i++)
	{
		var child = objects[i];
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

			// Pointer just pressed
			if(pointer.buttonJustPressed(Pointer.LEFT))
			{
				if(child.onButtonDown !== null)
				{
					child.onButtonDown(pointer, viewport);
				}

				if(child.draggable)
				{
					child.beingDragged = true;
					break;
				}
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

	// Pointer drag event
	for(var i = 0; i < objects.length; i++)
	{
		var child = objects[i];

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

		child.updateMatrix();
	}

	// Sort objects by layer
	objects.sort(function(a, b)
	{
		return a.layer - b.layer;
	});

	// Render the content
	var context = this.context;

	// Clear canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	// Set viewport matrix transform
	viewport.matrix.setContextTransform(context);

	// Render into the canvas
	for(var i = 0; i < objects.length; i++)
	{	
		if(objects[i].saveContextState)
		{
			context.save();
		}

		if(objects[i].ignoreViewport)
		{
			context.setTransform(1, 0, 0, 1, 0, 0);
		}

		objects[i].transform(context, viewport);
		objects[i].draw(context, viewport);

		if(objects[i].restoreContextState)
		{
			context.restore();
		}
	}
};

export {Renderer};
