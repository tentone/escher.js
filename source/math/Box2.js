"use strict";

import {Vector2} from "./Vector2.js";

/**
 * Box is described by a minimum and maximum points.
 *
 * Can be used for collision detection with points and other boxes.
 *
 * @class
 * @param {Vector2} min
 * @param {Vector2} max
 */
function Box2(min, max)
{
	this.min = (min !== undefined) ? min : new Vector2();
	this.max = (max !== undefined) ? max : new Vector2();
}

/**
 * Set the box values.
 *
 * @param {Vector2} min
 * @param {Vector2} max
 */
Box2.prototype.set = function(min, max)
{
	this.min.copy(min);
	this.max.copy(max);

	return this;
};

/**
 * Set the box from a list of Vector2 points.
 *
 * @param {Array} points
 */
Box2.prototype.setFromPoints = function(points)
{
	this.min = new Vector2(+Infinity, +Infinity);
	this.max = new Vector2(-Infinity, -Infinity);

	for(var i = 0, il = points.length; i < il; i++)
	{
		this.expandByPoint(points[i]);
	}

	return this;
};

/** 
 * Set the box minimum and maximum from center point and size.
 *
 * @param {Vector2} center
 * @param {Vector2} size
 */
Box2.prototype.setFromCenterAndSize = function(center, size)
{
	var v1 = new Vector2();
	var halfSize = v1.copy(size).multiplyScalar(0.5);
	this.min.copy(center).sub(halfSize);
	this.max.copy(center).add(halfSize);

	return this;
};

/**
 * Clone the box into a new object.
 *
 * Should be used when it it necessary to make operations to this box.
 *
 * @return {Box2} New box object with the copy of this object.
 */
Box2.prototype.clone = function()
{
	var box = new Box2();
	box.copy(this);
	return box;
};

/**
 * Copy the box value from another box.
 *
 * @param {Box2} point
 */
Box2.prototype.copy = function(box)
{
	this.min.copy(box.min);
	this.max.copy(box.max);
};

/**
 * Check if the box is empty (size equals zero or is negative).
 *
 * The box size is condireded valid on two negative axis.
 *
 * @return {boolean} True if the box is empty.
 */
Box2.prototype.isEmpty = function()
{
	return (this.max.x < this.min.x) || (this.max.y < this.min.y);
};

/**
 * Calculate the center point of the box.
 *
 * @param {Vector2} [target] Vector to store the result.
 * @return {Vector2} Central point of the box.
 */
Box2.prototype.getCenter = function(target)
{
	if(target === undefined)
	{
		target = new Vector2();
	}

	this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);

	return target;
};

/**
 * Get the size of the box from its min and max points.
 *
 * @param {Vector2} [target] Vector to store the result.
 * @return {Vector2} Vector with the calculated size.
 */
Box2.prototype.getSize = function(target)
{
	if(target === undefined)
	{
		target = new Vector2();
	}

	this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min);

	return target;
};

/**
 * Expand the box to contain a new point.
 *
 * @param {Vector2} point
 */
Box2.prototype.expandByPoint = function(point)
{
	this.min.min(point);
	this.max.max(point);

	return this;
};

/**
 * Expand the box by adding a border with the vector size.
 *
 * Vector is subtracted from min and added to the max points.
 *
 * @param {Vector2} vector
 */
Box2.prototype.expandByVector = function(vector)
{
	this.min.sub(vector);
	this.max.add(vector);
};

/**
 * Expand the box by adding a border with the scalar value.
 *
 * @param {number} scalar
 */
Box2.prototype.expandByScalar = function(scalar)
{
	this.min.addScalar(-scalar);
	this.max.addScalar(scalar);
};

/**
 * Check if the box contains a point inside.
 *
 * @param {Vector2} point
 * @return {boolean} True if the box contains point.
 */
Box2.prototype.containsPoint = function(point)
{
	return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y ? false : true;
};

/**
 * Check if the box fully contains another box inside (different from intersects box).
 *
 * Only returns true if the box is fully contained.
 *
 * @param {Box2} box
 * @return {boolean} True if the box contains box.
 */
Box2.prototype.containsBox = function(box)
{
	return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y;
};

/**
 * Check if two boxes intersect each other, using 4 splitting planes to rule out intersections.
 * 
 * @param {Box2} box
 * @return {boolean} True if the boxes intersect each other.
 */
Box2.prototype.intersectsBox = function(box)
{
	return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y ? false : true;
};

/**
 * Calculate the distance to a point.
 *
 * @param {Vector2} point
 * @return {number} Distance to point calculated.
 */
Box2.prototype.distanceToPoint = function(point)
{
	var v = new Vector2();
	var clampedPoint = v.copy(point).clamp(this.min, this.max);
	return clampedPoint.sub(point).length();
};

/**
 * Make a intersection between this box and another box.
 *
 * Store the result in this object.
 *
 * @param {Box2} box
 */
Box2.prototype.intersect = function(box)
{
	this.min.max(box.min);
	this.max.min(box.max);
};

/**
 * Make a union between this box and another box.
 *
 * Store the result in this object.
 *
 * @param {Box2} box
 */
Box2.prototype.union = function(box)
{
	this.min.min(box.min);
	this.max.max(box.max);
};

/**
 * Translate the box by a offset value, adds the offset to booth min and max.
 *
 * @param {Vector2} offset
 */
Box2.prototype.translate = function(offset)
{
	this.min.add(offset);
	this.max.add(offset);
};

/**
 * Checks if two boxes are equal.
 *
 * @param {Box2} box
 * @return {boolean} True if the two boxes are equal.
 */
Box2.prototype.equals = function(box)
{
	return box.min.equals(this.min) && box.max.equals(this.max);
};

export {Box2};
