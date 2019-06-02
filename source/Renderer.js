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
	this.canvas = canvas;

	this.context = canvas.getContext("2d");

	this.mouse = new Mouse(canvas);
	this.mouse.setCanvas(canvas);
}

/**
 * Render the object using the viewport into a canvas element.
 */
Renderer.prototype.render = function(object, viewport)
{
	this.mouse.update();

	var mouse = this.mouse;
	var context = this.context;

	// Clear canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	// Update viewport transform matrix
	viewport.updateMatrix();

	// Update object transformation matrices
	object.traverse(function(child)
	{
		child.updateMatrix();
		
		var point = mouse.position.clone();
		point = viewport.inverseMatrix.transformPoint(point);
		point = child.inverseGlobalMatrix.transformPoint(point);

		if(child.isInside(point))
		{
			child.onOver();
		}
	});

	// Render into the canvas
	object.traverse(function(child)
	{
		viewport.matrix.setContextTransform(context);		
		child.globalMatrix.tranformContext(context);
		child.draw(context);
	});
};