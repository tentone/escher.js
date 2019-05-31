"use strict";

/**
 * Used to indicate how the user views the content inside of the canvas.
 *
 * @class
 */
function Viewport()
{
	/**
	 * UUID of the object.
	 */
	this.uuid = UUID.generate(); 

	/**
	 * Position of the viewport.
	 */
	this.position = new Vector2(0, 0);

	/**
	 * Zoom level of the viewport.
	 */
	this.zoom = 1.0;

}