"use strict";

import {Object2D} from "../Object2D.js";
import {Box2} from "../math/Box2.js";
import {Vector2} from "../math/Vector2.js";

/**
 * Image object is used to draw an image from URL.
 *
 * @class
 * @param {string} [src] Source URL of the image.
 */
function Image(src)
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

	if(src !== undefined)
	{
		this.setImage(src);
	}
}

Image.prototype = Object.create(Object2D.prototype);

/**
 * Set the image of the object.
 *
 * Automatically sets the box size to match the image.
 *
 * @param {string} src Source URL of the image.
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

Image.prototype.draw = function(context, viewport, canvas)
{
	if(this.image.src.length > 0)
	{
		context.drawImage(this.image, 0, 0, this.image.naturalWidth, this.image.naturalHeight, this.box.min.x, this.box.min.y, this.box.max.x - this.box.min.x, this.box.max.y - this.box.min.y);
	}
};

export {Image};
