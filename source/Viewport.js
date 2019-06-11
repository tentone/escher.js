"use strict";

import {Vector2} from "./math/Vector2.js";
import {Matrix} from "./math/Matrix.js";
import {UUID} from "./math/UUID.js";
import {Pointer} from "./input/Pointer.js";

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

	/**
	 * Value of the initial point of rotation if the viewport is being rotated.
	 *
	 * Is set to null when the viewport is not being rotated.
	 */
	this.rotationPoint = null;
}

/**
 * Update the viewport controls using the pointer object.
 */
Viewport.prototype.updateControls = function(pointer)
{	
	if(pointer.wheel !== 0)
	{
		this.scale -= pointer.wheel * 1e-3 * this.scale;

		if(this.moveOnScale)
		{	
			var speed = pointer.wheel;
			var halfWidth = pointer.canvas.width / 2;
			var halfWeight = pointer.canvas.height / 2;

			this.position.x += ((pointer.position.x - halfWidth) / halfWidth) * speed;
			this.position.y += ((pointer.position.y - halfWeight) / halfWeight) * speed;
		}
	}

	if(pointer.buttonPressed(Pointer.RIGHT) && pointer.buttonPressed(Pointer.LEFT))
	{
		this.rotation += pointer.delta.angle() * 1e-3;
	}
	else if(pointer.buttonPressed(Pointer.RIGHT))
	{
		this.position.x += pointer.delta.x;
		this.position.y += pointer.delta.y;
	}


};

/**
 * Calculate and update the viewport transformation matrix.
 */
Viewport.prototype.updateMatrix = function()
{
	if(this.matrixNeedsUpdate)
	{
		this.matrix.compose(this.position.x, this.position.y, this.scale, this.scale, 0, 0, this.rotation);
		this.inverseMatrix = this.matrix.getInverse();
		//this.matrixNeedsUpdate = false;
	}
};

/**
 * Center the viewport relative to a object.
 *
 * @param {Object2D} object Object to be centered on the viewport.
 * @param {DOM} canvas Canvas element where the image is drawn.
 */
Viewport.prototype.centerObject = function(object, canvas)
{
	var position = object.globalMatrix.transformPoint(new Vector2());
	position.multiplyScalar(-this.scale);

	position.x += canvas.width / 2;
	position.y += canvas.height / 2;

	this.position.copy(position);
};

export {Viewport};
