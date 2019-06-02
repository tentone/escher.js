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
	 * Inverse of the local transformation matrix.
	 */
	this.inverseMatrix = new Matrix();

	/**
	 * If true the matrix is updated before rendering the object.
	 */
	this.matrixNeedsUpdate = true;
}

/**
 * Update the viewport controls using the mouse object.
 */
Viewport.prototype.updateControls = function(mouse)
{
	this.scale -= mouse.wheel * 1e-3 * this.scale;

	if(mouse.buttonPressed(Mouse.RIGHT))
	{
		this.position.x += mouse.delta.x;
		this.position.y += mouse.delta.y;
	}
};

/**
 * Calculate and update the viewport transformation matrix.
 */
Viewport.prototype.updateMatrix = function()
{
	if(this.matrixNeedsUpdate)
	{
		this.matrix.compose(this.position.x, this.position.y, this.scale, this.scale, this.rotation);
		this.inverseMatrix = this.matrix.getInverse();
		//this.matrixNeedsUpdate = false;
	}
};

