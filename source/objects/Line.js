"use strict";

function Line()
{
	Object2D.call(this);

	/**
	 * Initial point of the line.
	 */
	this.from = new Vector2();

	/**
	 * Final point of the line.
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
	context.lineWidth = 2;
	context.strokeStyle = this.strokeStyle;
	context.setLineDash([10, 10]);
	
	context.beginPath();
	context.moveTo(this.from.x, this.from.y);
	context.lineTo(this.to.x, this.to.y);
	context.stroke();
};
