"use strict";

import {Object2D} from "../Object2D.js";
import {Box2} from "../math/Box2.js";
import {Vector2} from "../math/Vector2.js";

/**
 * Image object is used to draw an image from URL.
 */
function Image(src)
{
	Object2D.call(this);
	
	/**
	 * Box object containing the size of the object.
	 */
	this.box = new Box2(new Vector2(0, 0), new Vector2(0, 0));

	/**
	 * Image source DOM element.
	 */
	this.image = document.createElement("img");

	this.setImage(src);
}

Image.prototype = Object.create(Object2D.prototype);

/**
 * Set the image of the object.
 *
 * Automatically sets the box size to match the image.
 */
Image.prototype.setImage = function(src)
{
	var self = this;

	this.image.onload = function()
	{
		self.box.min.set(0, 0);
		self.box.max.set(this.naturalWidth, this.naturalHeight);
	};
	this.image.src = src;
};

Image.prototype.isInside = function(point)
{
	return this.box.containsPoint(point);
};

Image.prototype.draw = function(context)
{
	context.drawImage(this.image, 0, 0);
};

export {Image};
