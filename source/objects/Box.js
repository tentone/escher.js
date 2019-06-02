"use strict";

function Box(src)
{
	Object2D.call(this);

	/**
	 * Box object containing the size of the object.
	 */
	this.box = new Box2(new Vector2(-50, -35), new Vector2(50, 35));

	/**
	 * Color of the box border line.
	 */
	this.borderColor = "#000000";
}

Box.prototype = Object.create(Object2D.prototype);

Box.prototype.onOver = function(point)
{
	this.borderColor = "#FF0000";
};

Box.prototype.isInside = function(point)
{
	return this.box.containsPoint(point);
};

Box.prototype.draw = function(context)
{
	var width = this.box.max.x - this.box.min.x;
	var height = this.box.max.y - this.box.min.y;

	context.lineWidth = 2;
	context.strokeStyle = this.borderColor;
	context.strokeRect(this.box.min.x, this.box.min.y, width, height);
};
