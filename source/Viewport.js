"use strict";

import {Vector2} from "./math/Vector2.js";
import {Matrix} from "./math/Matrix.js";
import {UUID} from "./math/UUID.js";
import {Mouse} from "./input/Mouse.js";

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

	/**
	 * Flag to indicate if the viewport should move when scalling.
	 *
	 * For some application its easier to focus the target if the viewport moves to the pointer location while scalling.
	 */
	this.moveOnScale = true;
}

/**
 * Update the viewport controls using the mouse object.
 */
Viewport.prototype.updateControls = function(mouse)
{	
	if(mouse.wheel !== 0)
	{
		this.scale -= mouse.wheel * 1e-3 * this.scale;

		if(this.moveOnScale)
		{	
			var speed = mouse.wheel / this.scale;
			var halfWidth = mouse.canvas.width / 2;
			var halfWeight = mouse.canvas.height / 2;

			this.position.x += ((mouse.position.x - halfWidth) / halfWidth) * speed;
			this.position.y += ((mouse.position.y - halfWeight) / halfWeight) * speed;
		}
	}

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

export {Viewport};
