/**
 * Class representing a 2D vector. A 2D vector is an ordered pair of numbers (labeled x and y), which can be used to represent points in space, directions, etc.
 *
 * @class
 * @param {number} x
 * @param {number} y
 */
function Vector2(x, y)
{
	this.x = x || 0;
	this.y = y || 0;
}

/**
 * Set vector x and y values.
 *
 * @param {number} x
 * @param {number} y
 */
Vector2.prototype.set = function(x, y)
{
	this.x = x;
	this.y = y;
};

/**
 * Set a scalar value into the x and y values.
 */
Vector2.prototype.setScalar = function(scalar)
{
	this.x = scalar;
	this.y = scalar;
};

/**
 * Create a clone of this vector object.
 */
Vector2.prototype.clone = function()
{
	return new Vector2(this.x, this.y);
};

/**
 * Copy the content of another vector into this one.
 *
 * @param {Vector2} v
 */
Vector2.prototype.copy = function(v)
{
	this.x = v.x;
	this.y = v.y;
};

/**
 * Add the content of another vector to this one.
 *
 * @param {Vector2} v
 */
Vector2.prototype.add = function(v)
{
	this.x += v.x;
	this.y += v.y;
};

/**
 * Add a scalar value to booth vector components.
 *
 * @param {number} s
 */
Vector2.prototype.addScalar = function(s)
{
	this.x += s;
	this.y += s;
};

/** 
 * Add two vectors and store the result in this vector.
 *
 * @param {Vector2} a
 * @param {Vector2} b
 */
Vector2.prototype.addVectors = function(a, b)
{
	this.x = a.x + b.x;
	this.y = a.y + b.y;
};

/**
 * Scale a vector components and add the result to this vector.
 *
 * @param {Vector2} v
 * @param {number} s
 */
Vector2.prototype.addScaledVector = function(v, s)
{
	this.x += v.x * s;
	this.y += v.y * s;
};

/**
 * Subtract the content of another vector to this one.
 *
 * @param {Vector2} v
 */
Vector2.prototype.sub = function(v)
{
	this.x -= v.x;
	this.y -= v.y;
};

/**
 * Subtract a scalar value to booth vector components.
 *
 * @param {number} s
 */
Vector2.prototype.subScalar = function(s)
{
	this.x -= s;
	this.y -= s;
};

/** 
 * Subtract two vectors and store the result in this vector.
 *
 * @param {Vector2} a
 * @param {Vector2} b
 */
Vector2.prototype.subVectors = function(a, b)
{
	this.x = a.x - b.x;
	this.y = a.y - b.y;
};

/**
 * Multiply the content of another vector to this one.
 *
 * @param {Vector2} v
 */
Vector2.prototype.multiply = function(v)
{
	this.x *= v.x;
	this.y *= v.y;
};

/**
 * Multiply a scalar value by booth vector components.
 *
 * @param {number} scalar
 */
Vector2.prototype.multiplyScalar = function(scalar)
{
	this.x *= scalar;
	this.y *= scalar;
};


/**
 * Divide the content of another vector from this one.
 *
 * @param {Vector2} v
 */
Vector2.prototype.divide = function(v)
{
	this.x /= v.x;
	this.y /= v.y;
};

/**
 * Divide a scalar value by booth vector components.
 *
 * @param {number} s
 */
Vector2.prototype.divideScalar = function(scalar)
{
	return this.multiplyScalar(1 / scalar);
};

/**
 * Set the minimum of x and y coordinates between two vectors.
 *
 * X is set as the min between this vector and the other vector. 
 *
 * @param {Vector2} v
 */
Vector2.prototype.min = function(v)
{
	this.x = Math.min(this.x, v.x);
	this.y = Math.min(this.y, v.y);
};

/**
 * Set the maximum of x and y coordinates between two vectors.
 *
 * X is set as the max between this vector and the other vector. 
 *
 * @param {Vector2} v
 */
Vector2.prototype.max = function(v)
{
	this.x = Math.max(this.x, v.x);
	this.y = Math.max(this.y, v.y);
};

/**
 * Clamp the vector coordinates to the range defined by two vectors.
 * 
 * Applied to x and y independently.
 * 
 * @param {Vector2} min Minimum value.
 * @param {Vector2} max Maximum value.
 */
Vector2.prototype.clamp = function(min, max)
{
	// assumes min < max, componentwise
	this.x = Math.max(min.x, Math.min(max.x, this.x));
	this.y = Math.max(min.y, Math.min(max.y, this.y));
};

/**
 * Clamp the vector coordinates to the range defined by two scalars.
 * 
 * @param {number} minVal Minimum value.
 * @param {number} maxVal Maximum value.
 */
Vector2.prototype.clampScalar = function(minVal, maxVal)
{
	this.x = Math.max(minVal, Math.min(maxVal, this.x));
	this.y = Math.max(minVal, Math.min(maxVal, this.y));
};

Vector2.prototype.clampLength = function(min, max)
{
	var length = this.length();

	return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
};

/**
 * Round the vector coordinates to integer by flooring to the smaller integer.
 */ 
Vector2.prototype.floor = function()
{
	this.x = Math.floor(this.x);
	this.y = Math.floor(this.y);
};

/**
 * Round the vector coordinates to integer by ceiling to the bigger integer.
 */ 
Vector2.prototype.ceil = function()
{
	this.x = Math.ceil(this.x);
	this.y = Math.ceil(this.y);
};

/**
 * Round the vector coordinates to their closest integer.
 */
Vector2.prototype.round = function()
{
	this.x = Math.round(this.x);
	this.y = Math.round(this.y);
};

/**
 * Negate the coordinates of this vector.
 */
Vector2.prototype.negate = function()
{
	this.x = -this.x;
	this.y = -this.y;

	return this;
};

/**
 * Dot multiplication between this vector and another vector.
 *
 * @param {Vector2} vector
 * @return {number} Result of the dot multiplication.
 */
Vector2.prototype.dot = function(v)
{
	return this.x * v.x + this.y * v.y;
};

/**
 * Cross multiplication between this vector and another vector.
 *
 * @param {Vector2} vector
 * @return {number} Result of the cross multiplication.
 */
Vector2.prototype.cross = function(v)
{
	return this.x * v.y - this.y * v.x;
};

/**
 * Squared length of the vector.
 *
 * Faster for comparions.
 */
Vector2.prototype.lengthSq = function()
{
	return this.x * this.x + this.y * this.y;
};

/**
 * Length of the vector.
 */
Vector2.prototype.length = function()
{
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * Manhattan length of the vector.
 */
Vector2.prototype.manhattanLength = function()
{
	return Math.abs(this.x) + Math.abs(this.y);
};

/**
 * Normalize the vector (make it length one).
 */
Vector2.prototype.normalize = function()
{
	return this.divideScalar(this.length() || 1);
};

/**
 * Computes the angle in radians with respect to the positive x-axis.
 * 
 * @param {boolean} forcePositive If true, the angle will be forced to be positive.
 * @return {number} Angle in radians.
 */
Vector2.prototype.angle = function(forcePositive)
{
	var angle = Math.atan2(this.y, this.x);

	if(forcePositive && angle < 0)
	{
		angle += 2 * Math.PI;
	}
	
	return angle;
};

/**
 * Distance between two vector positions.
 * 
 * @param {Vector2} v Vector to compute the distance to.
 * @return {number} Distance between the two vectors.
 */
Vector2.prototype.distanceTo = function(v)
{
	return Math.sqrt(this.distanceToSquared(v));
};

/**
 * Distance between two vector positions squared.
 *
 * Faster for comparisons.
 * 
 * @param {Vector2} v Vector to compute the distance to.
 * @return {number} Distance between the two vectors squared.
 */
Vector2.prototype.distanceToSquared = function(v)
{
	var dx = this.x - v.x;
	var dy = this.y - v.y;

	return dx * dx + dy * dy;
};

/**
 * Manhattan distance between two vector positions.
 * 
 * @param {Vector2} v Vector to compute the distance to.
 * @return {number} Manhattan distance between the two vectors.
 */
Vector2.prototype.manhattanDistanceTo = function(v)
{
	return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
};

/**
 * Scale the vector to have a defined length value.
 * 
 * @param {number} length Length to scale the vector to.
 * @return {Vector2} This vector.
 */
Vector2.prototype.setLength = function(length)
{
	return this.normalize().multiplyScalar(length);
};

Vector2.prototype.lerp = function(v, alpha)
{
	this.x += (v.x - this.x) * alpha;
	this.y += (v.y - this.y) * alpha;
};

Vector2.prototype.lerpVectors = function(v1, v2, alpha)
{
	return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
};

/**
 * Check if two vectors are equal.
 *
 * @param {Vector2} v
 */
Vector2.prototype.equals = function(v)
{
	return ((v.x === this.x) && (v.y === this.y));
};

/**
 * Set vector value from array [x, y].
 *
 * The vector can be converted to array using the toArray() method.
 *
 * @param {number[]} array
 */
Vector2.prototype.fromArray = function(array)
{
	this.set(array[0], array[1]);
};

/**
 * Convert this vector to an array. Useful for serialization and storage.
 *
 * Values stored as [x, y].
 *
 * @return {number[]} Array containing the values of the vector.
 */
Vector2.prototype.toArray = function()
{
	return [this.x, this.y];
};

/**
 * Rotate the vector around a central point.
 *
 * @param {Vector2} center
 * @param {number} angle
 */
Vector2.prototype.rotateAround = function(center, angle)
{
	var c = Math.cos(angle);
	var s = Math.sin(angle);

	var x = this.x - center.x;
	var y = this.y - center.y;

	this.x = x * c - y * s + center.x;
	this.y = x * s + y * c + center.y;
};

export {Vector2};
