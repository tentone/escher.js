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
 * @param object Object to be updated.
 * @param viewport Viewport to be updated (should be the one where the objects will be rendered after).
 */
Renderer.prototype.update = function(object, viewport)
{
	this.pointer.update();

	var pointer = this.pointer;

	// Viewport transform matrix
	viewport.updateControls(pointer);
	viewport.updateMatrix();

	// Project pointer coordinates
	var point = pointer.position.clone();
	var viewportPoint = viewport.inverseMatrix.transformPoint(point);

	// Object transformation matrices
	object.traverse(function(child)
	{		
		var childPoint = child.inverseGlobalMatrix.transformPoint(viewportPoint);

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

		// Pointer drag event
		if(child.beingDragged)
		{
			var matrix = viewport.inverseMatrix.clone();
			matrix.multiply(child.inverseGlobalMatrix);
			matrix.setPosition(0, 0);

			var delta = matrix.transformPoint(pointer.delta);
			child.position.add(delta);

			if(child.onPointerDrag !== null)
			{
				child.onPointerDrag(pointer, viewport, delta);
			}
		}

		// On update
		if(child.onUpdate !== null)
		{
			child.onUpdate();
		}

		child.updateMatrix();
	});
};

/**
 * Render the object using the viewport into a canvas element.
 *
 * The canvas state is saved and restored for each individual object, ensuring that the code of one object does not affect another one.
 *
 * @param object Object to be rendered.
 * @param viewport Viewport to render the objects.
 */
Renderer.prototype.render = function(object, viewport)
{
	var context = this.context;

	// Clear canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	// Set viewport matrix transform
	viewport.matrix.setContextTransform(context);

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
		return a.layer - b.layer;
	});

	// Render into the canvas
	for(var i = 0; i < objects.length; i++)
	{
		context.save();
		objects[i].globalMatrix.tranformContext(context);
		objects[i].draw(context);
		context.restore();
	}
};

export {Renderer};
