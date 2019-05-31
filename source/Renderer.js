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
}

/**
 * Render the object using the viewport into a canvas element.
 */
Renderer.prototype.render = function(object, viewport)
{
	var context = this.context;

	// Clear canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	// Update viewport transform matrix
	viewport.updateMatrix();

	// Render into the canvas
	object.traverse(function(child)
	{
		viewport.matrix.setContextTransform(context);

		child.updateMatrix();
		
		child.matrix.tranformContext(context);
		child.draw(context);
	});
};