"use strict";

function Circle()
{
	Object2D.call(this);

	/**
	 * Radius of the circle.
	 */
	this.radius = 10.0;

	/**
	 * Color of the box border line.
	 */
	this.strokeStyle = "#000000";
}

Circle.prototype = Object.create(Object2D.prototype);

Circle.prototype.isInside = function(point)
{
	return point.length() <= this.radius;
};

Circle.prototype.onPointerEnter = function(mouse, viewport)
{
	this.strokeStyle = "#FF0000";
};

Circle.prototype.onPointerLeave = function(mouse, viewport)
{
	this.strokeStyle = "#000000";
};

Circle.prototype.draw = function(context)
{
	//context.setLineDash([]);
	//context.lineWidth = 1;
	context.strokeStyle = this.strokeStyle;

	context.beginPath();
	context.arc(0, 0, this.radius, 0, 2 * Math.PI);
	context.stroke();
};
