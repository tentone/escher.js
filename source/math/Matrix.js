"use strict";

import {Vector2} from "./Vector2.js";

/**
 * 2D 3x2 transformation matrix, applied to the canvas elements.
 *
 * @class
 */
function Matrix(values)
{
	if(values !== undefined)
	{
		this.m = values;
	}
	else
	{
		this.identity();
	}
}

/**
 * Copy the content of another matrix and store in this one.
 */
Matrix.prototype.copy = function(mat)
{
	this.m = mat.m.slice(0);
};

/**
 * Create a new matrix object with a copy of the content of this one.
 */
Matrix.prototype.clone = function()
{
	return new Matrix(this.m.slice(0))
};

/**
 * Reset this matrix to indentity.
 */
Matrix.prototype.identity = function()
{
	this.m = [1, 0, 0, 1, 0, 0];
};

/**
 * Multiply another matrix by this one and store the result.
 *
 * @param mat Matrix array.
 */
Matrix.prototype.multiply = function(mat)
{
	var m0 = this.m[0] * mat.m[0] + this.m[2] * mat.m[1];
	var m1 = this.m[1] * mat.m[0] + this.m[3] * mat.m[1];
	var m2 = this.m[0] * mat.m[2] + this.m[2] * mat.m[3];
	var m3 = this.m[1] * mat.m[2] + this.m[3] * mat.m[3];
	var m4 = this.m[0] * mat.m[4] + this.m[2] * mat.m[5] + this.m[4];
	var m5 = this.m[1] * mat.m[4] + this.m[3] * mat.m[5] + this.m[5];
	
	this.m = [m0, m1, m2, m3, m4, m5];
};

/**
 * Premultiply another matrix by this one and store the result.
 *
 * @param mat Matrix array to multiply.
 */
Matrix.prototype.premultiply = function(mat)
{
	var m0 = mat.m[0] * this.m[0] + mat.m[2] * this.m[1];
	var m1 = mat.m[1] * this.m[0] + mat.m[3] * this.m[1];
	var m2 = mat.m[0] * this.m[2] + mat.m[2] * this.m[3];
	var m3 = mat.m[1] * this.m[2] + mat.m[3] * this.m[3];
	var m4 = mat.m[0] * this.m[4] + mat.m[2] * this.m[5] + mat.m[4];
	var m5 = mat.m[1] * this.m[4] + mat.m[3] * this.m[5] + mat.m[5];
	
	this.m = [m0, m1, m2, m3, m4, m5];
};

/**
 * Compose this transformation matrix with position scale and rotation.
 */
Matrix.prototype.compose = function(px, py, sx, sy, a)
{
	this.m = [1, 0, 0, 1, px, py];

	var c = Math.cos(a);
	var s = Math.sin(a);
	this.multiply(new Matrix([c, s, -s, c, 0, 0]));

	this.scale(sx, sy);
};

/**
 * Apply translation to this matrix.
 */
Matrix.prototype.translate = function(x, y)
{
	this.m[4] += this.m[0] * x + this.m[2] * y;
	this.m[5] += this.m[1] * x + this.m[3] * y;
};

/**
 * Apply rotation to this matrix.
 *
 * @param angle Angle in radians.
 */
Matrix.prototype.rotate = function(rad)
{
	var c = Math.cos(rad);
	var s = Math.sin(rad);

	var m11 = this.m[0] * c + this.m[2] * s;
	var m12 = this.m[1] * c + this.m[3] * s;
	var m21 = this.m[0] * -s + this.m[2] * c;
	var m22 = this.m[1] * -s + this.m[3] * c;

	this.m[0] = m11;
	this.m[1] = m12;
	this.m[2] = m21;
	this.m[3] = m22;
};

/**
 * Apply scale to this matrix.
 */
Matrix.prototype.scale = function(sx, sy)
{
	this.m[0] *= sx;
	this.m[1] *= sx;
	this.m[2] *= sy;
	this.m[3] *= sy;
};

/**
 * Set the position of the transformation matrix.
 */
Matrix.prototype.setPosition = function(x, y)
{
	this.m[4] = x;
	this.m[5] = y;
};

/**
 * Get the scale from the transformation matrix.
 */
Matrix.prototype.getScale = function()
{
	return new Vector2(this.m[0], this.m[3]);
};

/**
 * Get the position from the transformation matrix.
 */
Matrix.prototype.getPosition = function()
{
	return new Vector2(this.m[4], this.m[5]);
};

/**
 * Apply skew to this matrix.
 */
Matrix.prototype.skew = function(radianX, radianY)
{
	this.multiply(new Matrix([1, Math.tan(radianY), Math.tan(radianX), 1, 0, 0]));
};

/**
 * Get the matrix determinant.
 */
Matrix.prototype.determinant = function()
{
	return 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
};

/**
 * Get the inverse matrix.
 */
Matrix.prototype.getInverse = function()
{
	var d = this.determinant();

	return new Matrix([this.m[3] * d, -this.m[1] * d, -this.m[2] * d, this.m[0] * d, d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]), d * (this.m[1] * this.m[4] - this.m[0] * this.m[5])]);
};

/**
 * Transform a point using this matrix.
 */
Matrix.prototype.transformPoint = function(p)
{
	var px = p.x * this.m[0] + p.y * this.m[2] + this.m[4];
	var py = p.x * this.m[1] + p.y * this.m[3] + this.m[5];

	return new Vector2(px, py);
};

/**
 * Set a canvas context to use this transformation.
 */
Matrix.prototype.setContextTransform = function(context)
{
	context.setTransform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
};

/**
 * Transform on top of the current context transformation.
 */
Matrix.prototype.tranformContext = function(context)
{
	context.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
};

export {Matrix};
