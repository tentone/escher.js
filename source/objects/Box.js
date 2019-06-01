"use strict";

function Box(src)
{
	Object2D.call(this);

	this.width = 100;

	this.height = 70;
}

Box.prototype = Object.create(Object2D.prototype);

Box.prototype.draw = function(context)
{
	var halfWidth = this.width / 2.0;
	var halfHeight = this.height / 2.0;

	context.lineWidth = 2;
	context.strokeStyle = "#000000";
	context.strokeRect(-halfWidth, -halfHeight, this.width, this.height);
};
