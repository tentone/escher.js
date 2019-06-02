"use strict";

/**
 * Line object draw a line from one point to another.
 */
function Line()
{
	Object2D.call(this);

	/**
	 * Initial point of the line.
	 *
	 * Can be equal to the position object of another object. (Making it automatically follow that object.)
	 */
	this.from = new Vector2();

	/**
	 * Final point of the line.
	 *
	 * Can be equal to the position object of another object. (Making it automatically follow that object.)
	 */
	this.to = new Vector2();

	/**
	 * Color of the line.
	 */
	this.strokeStyle = "#000000";
}

Line.prototype = Object.create(Object2D.prototype);

Line.prototype.draw = function(context)
{
	context.lineWidth = 1;
	context.strokeStyle = this.strokeStyle;
	context.setLineDash([5, 5]);
	
	context.beginPath();
	context.moveTo(this.from.x, this.from.y);
	context.lineTo(this.to.x, this.to.y);
	context.stroke();
};
