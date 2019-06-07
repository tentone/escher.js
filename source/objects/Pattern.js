"use strict";

import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";
import {Box2} from "../math/Box2.js";
import {Helpers} from "../utils/Helpers.js";
import {Circle} from "./Circle.js";

/**
 * Pattern object draw a image repeated as a pattern.
 *
 * Its similar to the Image class but the image can be repeat infinitly.
 *
 * @class
 */
function Pattern(src)
{
	Object2D.call(this);

	/**
	 * Box object containing the size of the object.
	 */
	this.box = new Box2();

	/**
	 * Image source DOM element.
	 */
	this.image = document.createElement("img");

	/**
	 * A DOMString indicating how to repeat the pattern image.
	 */
	this.repetition = "repeat"

	if(src !== undefined)
	{
		this.setImage(src);
	}
}

Pattern.prototype = Object.create(Object2D.prototype);

/**
 * Set the image of the object.
 *
 * Automatically sets the box size to match the image.
 */
Pattern.prototype.setImage = function(src)
{
	var self = this;

	this.image.onload = function()
	{
		self.box.min.set(0, 0);
		self.box.max.set(this.naturalWidth, this.naturalHeight);
	};
	this.image.src = src;
};

Pattern.prototype.isInside = function(point)
{
	return this.box.containsPoint(point);
};

Pattern.prototype.draw = function(context, viewport, canvas)
{
	var width = this.box.max.x - this.box.min.x;
	var height = this.box.max.y - this.box.min.y;

	if(this.image.src.length > 0)
	{
		var pattern = context.createPattern(this.image, this.repetition);

		context.fillStyle = pattern;
		context.fillRect(this.box.min.x, this.box.min.y, width, height);
	}
};

export {Pattern};
