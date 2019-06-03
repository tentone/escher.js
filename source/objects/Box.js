"use strict";

import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";
import {Box2} from "../math/Box2.js";
import {Circle} from "./Circle.js";
/**
 * Box object draw a box.
 */
function Box(resizable)
{
	Object2D.call(this);

	var self = this;

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

	if(resizable)
	{
		this.createResizeHelpers();
	}
}

Box.prototype = Object.create(Object2D.prototype);

Box.prototype.createResizeHelpers = function(first_argument)
{
	var self = this;

	function updateHelpers()
	{
		topRight.position.copy(self.box.min);
		bottomLeft.position.copy(self.box.max);
		topLeft.position.set(self.box.max.x, self.box.min.y);
		bottomRight.position.set(self.box.min.x, self.box.max.y);
	}

	var topRight = new Circle();
	topRight.radius = 4;
	topRight.onPointerDrag = function(pointer, viewport, delta)
	{
		self.box.min.copy(topRight.position);
		updateHelpers();
	};
	this.add(topRight);

	var topLeft = new Circle();
	topLeft.radius = 4;
	topLeft.onPointerDrag = function(pointer, viewport, delta)
	{
		self.box.max.x = topLeft.position.x;
		self.box.min.y = topLeft.position.y;
		updateHelpers();
	};
	this.add(topLeft);

	var bottomLeft = new Circle();
	bottomLeft.radius = 4;
	bottomLeft.onPointerDrag = function(pointer, viewport, delta)
	{
		self.box.max.copy(bottomLeft.position);
		updateHelpers();
	};
	this.add(bottomLeft);

	var bottomRight = new Circle();
	bottomRight.radius = 4;
	bottomRight.onPointerDrag = function(pointer, viewport, delta)
	{
		self.box.min.x = bottomRight.position.x;
		self.box.max.y = bottomRight.position.y;
		updateHelpers();
	};
	this.add(bottomRight);

	updateHelpers();
};

Box.prototype.onPointerEnter = function(pointer, viewport)
{
	this.fillStyle = "#CCCCCC";
};

Box.prototype.onPointerLeave = function(pointer, viewport)
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

	context.lineWidth = 1;
	context.strokeStyle = this.strokeStyle;
	context.strokeRect(this.box.min.x, this.box.min.y, width, height);
};

export {Box};
