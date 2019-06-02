"use strict";

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
	 * Mouse input handler object.
	 */
	this.mouse = new Mouse();
	this.mouse.setCanvas(canvas);
}

/**
 * Update the renderer state, update the input handlers, calculate the object and viewport transformation matrices.
 *
 * @param object Object to be updated.
 * @param viewport Viewport to be updated (should be the one where the objects will be rendered after).
 */
Renderer.prototype.update = function(object, viewport)
{
	this.mouse.update();

	var mouse = this.mouse;

	// Viewport transform matrix
	viewport.updateControls(mouse);
	viewport.updateMatrix();

	// Project mouse coordinates
	var point = mouse.position.clone();
	var viewportPoint = viewport.inverseMatrix.transformPoint(point);

	// Object transformation matrices
	object.traverse(function(child)
	{
		child.updateMatrix();
		
		var childPoint = child.inverseGlobalMatrix.transformPoint(viewportPoint);

		// Check if the mouse pointer is inside
		if(child.isInside(childPoint))
		{
			// Pointer enter
			if(!child.pointerInside && child.onPointerEnter !== null)
			{			
				child.onPointerEnter(mouse, viewport);
			}

			// Pointer over
			if(child.onPointerOver !== null)
			{
				child.onPointerOver(mouse, viewport);
			}

			// Pointer pressed
			if(mouse.buttonPressed(Mouse.LEFT))
			{
				if(child.onButtonPressed !== null)
				{
					child.onButtonPressed(mouse, viewport);
				}

				if(child.draggable)
				{
					child.beingDragged = true;
				}
			}

			// Just pressed
			if(mouse.buttonJustPressed(Mouse.LEFT) && child.onButtonDown !== null)
			{	
				child.onButtonDown(mouse, viewport);
			}

			// Just released
			if(mouse.buttonJustReleased(Mouse.LEFT) && child.onButtonUp !== null)
			{	
				child.onButtonUp(mouse, viewport);
			}

			child.pointerInside = true;
		}
		else if(child.pointerInside)
		{
			// Pointer leave
			if(child.onPointerLeave !== null)
			{
				child.onPointerLeave(mouse, viewport);
			}

			child.pointerInside = false;
		}

		// Stop object drag
		if(mouse.buttonJustReleased(Mouse.LEFT))
		{	
			if(child.draggable)
			{
				child.beingDragged = false;
			}
		}

		// Pointer drag event
		if(child.beingDragged && child.onPointerDrag !== null)
		{
			var matrix = viewport.inverseMatrix.clone();
			matrix.multiply(child.inverseGlobalMatrix);
			matrix.setPosition(0, 0);

			var delta = matrix.transformPoint(mouse.delta);

			child.onPointerDrag(mouse, viewport, delta)
		}
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

	// Render into the canvas
	object.traverse(function(child)
	{
		context.save();

		child.globalMatrix.tranformContext(context);
		child.draw(context);
		
		context.restore();
	});
};