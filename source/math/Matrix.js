"use strict";

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
		this.m = null;
		this.reset();
	}
}

/**
 * Reset this matrix to indentity.
 */
Matrix.prototype.reset = function()
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
	var m0 = this.m[0] * mat[0] + this.m[2] * mat[1];
	var m1 = this.m[1] * mat[0] + this.m[3] * mat[1];
	var m2 = this.m[0] * mat[2] + this.m[2] * mat[3];
	var m3 = this.m[1] * mat[2] + this.m[3] * mat[3];
	var m4 = this.m[0] * mat[4] + this.m[2] * mat[5] + this.m[4];
	var m5 = this.m[1] * mat[4] + this.m[3] * mat[5] + this.m[5];
	
	this.m = [m0, m1, m2, m3, m4, m5];
};

/**
 * Premultiply another matrix by this one and store the result.
 *
 * @param mat Matrix array to multiply.
 */
Matrix.prototype.premultiply = function(mat)
{
	var m0 = mat[0] * this.m[0] + mat[2] * this.m[1];
	var m1 = mat[1] * this.m[0] + mat[3] * this.m[1];
	var m2 = mat[0] * this.m[2] + mat[2] * this.m[3];
	var m3 = mat[1] * this.m[2] + mat[3] * this.m[3];
	var m4 = mat[0] * this.m[4] + mat[2] * this.m[5] + mat[4];
	var m5 = mat[1] * this.m[4] + mat[3] * this.m[5] + mat[5];
	
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
	this.multiply([c, s, -s, c, 0, 0]);

	this.scale(sx, sy);
};

/**
 * Apply translation to this matrix.
 */
Matrix.prototype.translate = function(x, y)
{
	this.multiply([1, 0, 0, 1, x, y]);
};

/**
 * Apply rotation to this matrix.
 *
 * @param angle Angle in radians.
 */
Matrix.prototype.rotate = function(angle)
{
	var c = Math.cos(angle);
	var s = Math.sin(angle);
	var mat = [c, s, -s, c, 0, 0];

	this.multiply(mat);
};

/**
 * Apply scale to this matrix.
 */
Matrix.prototype.scale = function(x, y)
{
	this.multiply([x, 0, 0, y, 0, 0]);
};

/**
 * Apply skew to this matrix.
 */
Matrix.prototype.skew = function(radianX, radianY)
{
	this.multiply([1, Math.tan(radianY), Math.tan(radianX), 1, 0, 0]);
};

/**
 * Get the matrix determinant.
 */
Matrix.prototype.determinant = function()
{
	return 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
};

/**
 * Get the ivnerse matrix.
 */
Matrix.prototype.getInverse = function()
{
	var d = this.determinant();

	return [this.m[3] * d, -this.m[1] * d, -this.m[2] * d, this.m[0] * d, d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]), d * (this.m[1] * this.m[4] - this.m[0] * this.m[5])];
}

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
