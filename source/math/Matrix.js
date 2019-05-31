"use strict";

/**
 * 2D 3x2 transformation matrix, applied to the canvas elements.
 *
 * @class
 */
function Matrix(values)
{
	if(value !== undefined)
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
 * Set position of the transformation matrix.
 */
Matrix.prototype.setPosition = function(x, y)
{
	this.m[4] = x;
	this.m[5] = y;
}

/**
 * Apply translation to this matrix.
 */
Matrix.prototype.translate = function(x, y)
{
	this.multiply([1, 0, 0, 1, x, y]);
};

/**
 * Apply rotation to this matrix.
 */
Matrix.prototype.rotate = function(rAngle)
{
	var c = Math.cos(rAngle);
	var s = Math.sin(rAngle);
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

/*
	var screenPoint=(transformedX, transformedY) =>
	{
		// invert
		var d =1/(this.m[0] * this.m[3] - this.m[1] * this.m[2]);
		var im = [m[3] * d, -m[1] * d, -m[2] * d, this.m[0] * d, d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]), d * (this.m[1] * this.m[4] - this.m[0] * this.m[5])];

		// point
		return(
		{
			x: transformedX * im[0] + transformedY * im[2] + im[4],
			y: transformedX * im[1] + transformedY * im[3] + im[5]
		});
	};

	var transformedPoint = (screenX, screenY) => (
	{
		x: screenX * this.m[0] + screenY * this.m[2] + this.m[4],
		y: screenX * this.m[1] + screenY * this.m[3] + this.m[5]
	});
*/
