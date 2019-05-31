"use strict";

function Rect(src)
{
	Object2D.call(this);
}

Rect.prototype = Object.create(Object2D.prototype);

Rect.prototype.draw = function(context)
{
	context.fillRect(-20, -20, 40, 40);
};
