"use strict";

function ConnectionLine(src)
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
	this.color = "#000000";
}

ConnectionLine.prototype = Object.create(Object2D.prototype);

ConnectionLine.prototype.draw = function(context)
{
	context.lineWidth = 2;
	context.strokeStyle = this.color;

	context.beginPath();
	context.moveTo(this.from.x, this.from.y);
	context.lineTo(this.to.x, this.to.y);
	context.stroke();
};
