import {Object2D} from "../Object2D.js";

/**
 * Circle object draw a circular object, into the canvas.
 *
 * Can be used as a base to implement other circular objects, already implements the circle collision for pointer events.
 *
 * @class
 * @extends {Object2D}
 */
function Circle()
{
	Object2D.call(this);

	/**
	 * Radius of the circle.
	 */
	this.radius = 10.0;

	/**
	 * Style of the object border line.
	 *
	 * If set null it is ignored.
	 */
	this.strokeStyle = "#000000";

	/**
	 * Line width, only used if a valid strokeStyle is defined.
	 */
	this.lineWidth = 1;

	/**
	 * Background color of the circle.
	 *
	 * If set null it is ignored.
	 */
	this.fillStyle = "#FFFFFF";
}

Circle.prototype = Object.create(Object2D.prototype);
Circle.prototype.constructor = Circle;
Circle.prototype.type = "Circle";

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
	
	if(this.fillStyle !== null)
	{	
		context.fillStyle = this.fillStyle;
		context.fill();
	}

	if(this.strokeStyle !== null)
	{
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.strokeStyle;
		context.stroke();
	}
};

Circle.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	data.radius = this.radius;
	data.strokeStyle = this.strokeStyle;
	data.lineWidth = this.lineWidth;
	data.fillStyle = this.fillStyle;

	return data;
};

Circle.prototype.parse = function(data)
{
	Object2D.prototype.parse.call(this, data);

	this.radius = data.radius;
	this.strokeStyle = data.strokeStyle;
	this.lineWidth = data.lineWidth;
	this.fillStyle = data.fillStyle;
};

export {Circle};
