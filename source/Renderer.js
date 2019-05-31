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
}

/**
 * Render the object using the viewport into a canvas element.
 */
Renderer.render = function(object, viewport)
{
	// Update matrixes
	this.object.traverse(function(child)
	{

	});

	// Render into the canvas
	this.object.traverse(function(child)
	{

	});
};