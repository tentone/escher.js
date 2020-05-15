import {Vector2} from "./Vector2.js";

/**
 * 2D 3x2 transformation matrix, used to represent linear geometric transformations over objects.
 *
 * The values of the matrix are stored as numeric array. The matrix can be applied to the canvas or DOM elements using CSS transforms.
 *
 * @class
 * @param {number[]} values Array of matrix values by row, needs to have exactly 6 values.
 */
function Matrix(values)
{
	if(values !== undefined)
	{
		/**
		 * Array that contains the matrix data by row. This matrix should have 6 values.
		 *
		 * Matrix can be directly edited by accessing this attribute.
		 *
		 * @type {number[]}
		 */
		this.m = values;
	}
	else
	{
		this.identity();
	}
}

/**
 * Copy the content of another matrix and store in this one.
 *
 * @param {Matrix} mat Matrix to copy values from.
 */
Matrix.prototype.copy = function(mat)
{
	this.m = mat.m.slice(0);
};

/**
 * Create a new matrix object with a copy of the content of this one.
 *
 * @return {Matrix} Copy of this matrix.
 */
Matrix.prototype.clone = function()
{
	return new Matrix(this.m.slice(0))
};

/**
 * Reset this matrix to identity.
 */
Matrix.prototype.identity = function()
{
	this.m = [1, 0, 0, 1, 0, 0];
};

/**
 * Multiply another matrix by this one and store the result.
 *
 * @param {Matrix} mat
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
 * @param {Matrix} mat
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
 * Compose this transformation matrix with position scale and rotation and origin point.
 *
 * @param {number} px Position X
 * @param {number} py Position Y
 * @param {number} sx Scale X
 * @param {number} sy Scale Y
 * @param {number} ox Origin X (applied before scale and rotation)
 * @param {number} oy Origin Y (applied before scale and rotation)
 * @param {number} a Rotation angle (radians).
 */
Matrix.prototype.compose = function(px, py, sx, sy, ox, oy, a)
{
	this.m = [1, 0, 0, 1, px, py];

	if(a !== 0)
	{		
		var c = Math.cos(a);
		var s = Math.sin(a);
		this.multiply(new Matrix([c, s, -s, c, 0, 0]));
	}

	if(sx !== 1 || sy !== 1)
	{
		this.scale(sx, sy);
	}

	if(ox !== 0 || oy !== 0)
	{	
		this.multiply(new Matrix([1, 0, 0, 1, -ox, -oy]));
	}
};

/**
 * Apply translation to this matrix.
 *
 * Adds position over the transformation already stored in the matrix.
 *
 * @param {number} x
 * @param {number} y
 */
Matrix.prototype.translate = function(x, y)
{
	this.m[4] += this.m[0] * x + this.m[2] * y;
	this.m[5] += this.m[1] * x + this.m[3] * y;
};

/**
 * Apply rotation to this matrix.
 *
 * @param {number} rad Angle to rotate the matrix in radians.
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
 *
 * @param {number} sx
 * @param {number} sy
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
 *
 * @param {number} x
 * @param {number} y
 */
Matrix.prototype.setPosition = function(x, y)
{
	this.m[4] = x;
	this.m[5] = y;
};

/**
 * Extract the scale from the transformation matrix.
 *
 * @return {Vector2} Scale of the matrix transformation.
 */
Matrix.prototype.getScale = function()
{
	return new Vector2(this.m[0], this.m[3]);
};

/**
 * Extract the position from the transformation matrix.
 *
 * @return {Vector2} Position of the matrix transformation.
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
 *
 * @return {number} Determinant of this matrix.
 */
Matrix.prototype.determinant = function()
{
	return 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
};

/**
 * Get the inverse matrix.
 *
 * @return {Matrix} New matrix instance containing the inverse matrix.
 */
Matrix.prototype.getInverse = function()
{
	var d = this.determinant();

	return new Matrix([this.m[3] * d, -this.m[1] * d, -this.m[2] * d, this.m[0] * d, d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]), d * (this.m[1] * this.m[4] - this.m[0] * this.m[5])]);
};

/**
 * Transform a point using this matrix.
 *
 * @param {Vector2} p Point to be transformed.
 * @return {Vector2} Transformed point.
 */
Matrix.prototype.transformPoint = function(p)
{
	var px = p.x * this.m[0] + p.y * this.m[2] + this.m[4];
	var py = p.x * this.m[1] + p.y * this.m[3] + this.m[5];

	return new Vector2(px, py);
};

/**
 * Set a canvas context to use this transformation.
 *
 * @param {CanvasRenderingContext2D} context Canvas context to apply this matrix transform.
 */
Matrix.prototype.setContextTransform = function(context)
{
	context.setTransform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
};

/**
 * Transform on top of the current context transformation.
 *
 * @param {CanvasRenderingContext2D} context Canvas context to apply this matrix transform.
 */
Matrix.prototype.tranformContext = function(context)
{
	context.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
};

/**
 * Generate a CSS transform string that can be applied to the transform style of any DOM element.
 *
 * @returns {string} CSS transform matrix.
 */
Matrix.prototype.cssTransform = function()
{
	return "matrix(" + this.m[0] + "," + this.m[1] + "," + this.m[2] + "," + this.m[3] + "," + this.m[4] + "," + this.m[5] + ")";
};

export {Matrix};
