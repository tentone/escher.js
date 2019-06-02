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
	this.borderColor = "#000000";

	/**
	 * Background color of the box.
	 */
	this.backgroundColor = "#FFFFFF";

	this.dragging = false;
}

Box.prototype = Object.create(Object2D.prototype);

Box.prototype.onPointerDown = function(mouse, viewport)
{
	this.dragging = true;
};

Box.prototype.onPointerUp = function(mouse, viewport)
{
	this.dragging = false;
};

Box.prototype.onPointerOver = function(mouse, viewport)
{
	if(this.dragging)
	{
		var matrix = viewport.inverseMatrix.clone();
		matrix.multiply(this.inverseGlobalMatrix);

		var scale = matrix.getScale();

		this.position.x += mouse.delta.x * scale.x;
		this.position.y += mouse.delta.y * scale.y;
	}
};


Box.prototype.onPointerEnter = function(mouse, viewport)
{
	this.backgroundColor = "#CCCCCC";
};

Box.prototype.onPointerLeave = function(mouse, viewport)
{
	this.backgroundColor = "#FFFFFF";
};


Box.prototype.isInside = function(point)
{
	return this.box.containsPoint(point);
};

Box.prototype.draw = function(context)
{
	var width = this.box.max.x - this.box.min.x;
	var height = this.box.max.y - this.box.min.y;

	context.fillStyle = this.backgroundColor;
	context.fillRect(this.box.min.x, this.box.min.y, width, height);

	context.setLineDash([]);
	context.lineWidth = 1;
	context.strokeStyle = this.borderColor;
	context.strokeRect(this.box.min.x, this.box.min.y, width, height);
};
