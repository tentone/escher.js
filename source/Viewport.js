"use strict";

import {Vector2} from "./math/Vector2.js";
import {Matrix} from "./math/Matrix.js";
import {UUID} from "./math/UUID.js";
import {Pointer} from "./input/Pointer.js";

/**
 * Used to indicate how the user views the content inside of the canvas.
 *
 * @class
 * @param {DOM} canvas Canvas DOM element where the viewport is being rendered.
 */
function Viewport(canvas)
{
	/**
	 * UUID of the object.
	 */
	this.uuid = UUID.generate(); 

	/**
	 * Canvas DOM element where the viewport is being rendered.
	 */
	this.canvas = canvas;

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
	this.moveOnScale = false;

	/**
	 * Value of the initial point of rotation if the viewport is being rotated.
	 *
	 * Is set to null when the viewport is not being rotated.
	 */
	this.rotationPoint = null;
}

/**
 * Calculate and update the viewport transformation matrix.
 *
 * Also updates the inverse matrix of the viewport.
 */
Viewport.prototype.updateMatrix = function()
{
	if(this.matrixNeedsUpdate)
	{
		this.matrix.m = [1, 0, 0, 1, this.position.x, this.position.y];

		if(this.rotation !== 0)
		{		
			var c = Math.cos(this.rotation);
			var s = Math.sin(this.rotation);
			this.matrix.multiply(new Matrix([c, s, -s, c, 0, 0]));
		}
		
		if(this.scale !== 1)
		{
			this.matrix.scale(this.scale, this.scale);
		}

		this.inverseMatrix = this.matrix.getInverse();
		this.matrixNeedsUpdate = false;
	}
};

/**
 * Center the viewport relative to a object.
 *
 * The position of the object is used a central point, this method does not consider "box" attributes or other strucures in the object.
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
	this.matrixNeedsUpdate = true;
};

export {Viewport};
