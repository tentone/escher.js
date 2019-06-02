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
}

ConnectionLine.prototype = Object.create(Object2D.prototype);

ConnectionLine.prototype.draw = function(context)
{
	//TODO
};
