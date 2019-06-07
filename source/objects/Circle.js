"use strict";

import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";

/**
 * Circle object draw a circular object, into the canvas.
 *
 * @class
 */
function Circle()
{
	Object2D.call(this);

	/**
	 * Radius of the circle.
	 */
	this.radius = 10.0;

	/**
	 * Color of the circle border line.
	 */
	this.strokeStyle = "#000000";

	/**
	 * Background color of the circle.
	 */
	this.fillStyle = "#FFFFFF";
}

Circle.prototype = Object.create(Object2D.prototype);

Circle.prototype.isInside = function(point)
{
	return point.length() <= this.radius;
};

Circle.prototype.onPointerEnter = function(pointer, viewport)
{
	this.fillStyle = "#CCCCCC";
};

Circle.prototype.onPointerLeave = function(pointer, viewport)
{
	this.fillStyle = "#FFFFFF";
};

Circle.prototype.draw = function(context, viewport, canvas)
{
	context.beginPath();
	context.arc(0, 0, this.radius, 0, 2 * Math.PI);
	
	context.fillStyle = this.fillStyle;
	context.fill();

	context.lineWidth = 1;
	context.strokeStyle = this.strokeStyle;
	context.stroke();
};

export {Circle};