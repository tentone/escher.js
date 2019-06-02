"use strict";

function Box()
{
	Object2D.call(this);

	/**
	 * Box object containing the size of the object.
	 */
	this.box = new Box2(new Vector2(-50, -35), new Vector2(50, 35));

	/**
	 * Color of the box border line.
	 */
	this.strokeStyle = "#000000";

	/**
	 * Background color of the box.
	 */
	this.fillStyle = "#FFFFFF";
}

Box.prototype = Object.create(Object2D.prototype);

Box.prototype.onPointerDrag = function(mouse, viewport, delta)
{
	this.position.x += delta.x;
	this.position.y += delta.y;
};

Box.prototype.onPointerEnter = function(mouse, viewport)
{
	this.fillStyle = "#CCCCCC";
};

Box.prototype.onPointerLeave = function(mouse, viewport)
{
	this.fillStyle = "#FFFFFF";
};


Box.prototype.isInside = function(point)
{
	return this.box.containsPoint(point);
};

Box.prototype.draw = function(context)
{
	var width = this.box.max.x - this.box.min.x;
	var height = this.box.max.y - this.box.min.y;

	context.fillStyle = this.fillStyle;
	context.fillRect(this.box.min.x, this.box.min.y, width, height);

	context.setLineDash([]);
	context.lineWidth = 3;
	context.strokeStyle = this.strokeStyle;
	context.strokeRect(this.box.min.x, this.box.min.y, width, height);
};
