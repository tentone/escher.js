"use strict";

import {Vector2} from "./Vector2.js";

/**
 * Box is described by a minimum and maximum points.
 *
 * Can be used for collision detection with points and other boxes.
 *
 * @class
 */
function Box2(min, max)
{
	this.min = (min !== undefined) ? min : new Vector2();
	this.max = (max !== undefined) ? max : new Vector2();
}

Box2.prototype.set = function(min, max)
{
	this.min.copy(min);
	this.max.copy(max);

	return this;
};

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

Box2.prototype.setFromCenterAndSize = function(center, size)
{
	var v1 = new Vector2();
	var halfSize = v1.copy(size).multiplyScalar(0.5);
	this.min.copy(center).sub(halfSize);
	this.max.copy(center).add(halfSize);

	return this;
};

Box2.prototype.clone = function()
{
	var box = new Box2();
	box.copy(this);
	return box;
};

Box2.prototype.copy = function(box)
{
	this.min.copy(box.min);
	this.max.copy(box.max);

	return this;
};

Box2.prototype.isEmpty = function()
{
	// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
	return (this.max.x < this.min.x) || (this.max.y < this.min.y);
};

Box2.prototype.getCenter = function(target)
{
	return this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
};

Box2.prototype.getSize = function(target)
{
	return this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min);
};

Box2.prototype.expandByPoint = function(point)
{
	this.min.min(point);
	this.max.max(point);

	return this;
};

Box2.prototype.expandByVector = function(vector)
{
	this.min.sub(vector);
	this.max.add(vector);

	return this;
};

Box2.prototype.expandByScalar = function(scalar)
{
	this.min.addScalar(-scalar);
	this.max.addScalar(scalar);

	return this;
};

Box2.prototype.containsPoint = function(point)
{
	return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y ? false : true;
};

Box2.prototype.containsBox = function(box)
{
	return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y;
};

// using 4 splitting planes to rule out intersections
Box2.prototype.intersectsBox = function(box)
{
	return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y ? false : true;
};

Box2.prototype.clampPoint = function(point, target)
{
	return target.copy(point).clamp(this.min, this.max);
};

Box2.prototype.distanceToPoint = function(point)
{
	var v = new Vector2();
	var clampedPoint = v.copy(point).clamp(this.min, this.max);
	return clampedPoint.sub(point).length();
};

Box2.prototype.intersect = function(box)
{
	this.min.max(box.min);
	this.max.min(box.max);

	return this;
};

Box2.prototype.union = function(box)
{
	this.min.min(box.min);
	this.max.max(box.max);

	return this;
};

Box2.prototype.translate = function(offset)
{
	this.min.add(offset);
	this.max.add(offset);

	return this;
};

Box2.prototype.equals = function(box)
{
	return box.min.equals(this.min) && box.max.equals(this.max);
};

export {Box2};
