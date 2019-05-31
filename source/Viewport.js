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
	 * Position of the object.
	 */
	this.position = new Vector2(0, 0);

	/**
	 * Scale of the object.
	 */
	this.scale = 1.0

	/**
	 * Rotation of the object relative to its center.
	 */
	this.rotation = 0.0;

	/**
	 * Local transformation matrix applied to the object. 
	 */
	this.matrix = new Matrix();

	/**
	 * If true the matrix is updated before rendering the object.
	 */
	this.matrixNeedsUpdate = true;
}

/**
 * Set the transformation of the canvas context.
 *
 * @param context Canvas 2d drawing context.
 * @param canvas The canvas DOM element where its being drawn.
 */
Viewport.prototype.updateMatrix = function(context, canvas)
{
	if(true) //this.matrixNeedsUpdate)
	{
		this.matrix.compose(this.position.x, this.position.y, this.scale, this.scale, this.rotation);
		this.matrixNeedsUpdate = false;
	}
};

