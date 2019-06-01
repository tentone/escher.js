"use strict";

function ConnectionLine(src)
{
	Object2D.call(this);

	this.from = new Vector2();

	this.to = new Vector2();
}

ConnectionLine.prototype = Object.create(Object2D.prototype);

ConnectionLine.prototype.draw = function(context)
{
	//TODO
};
