import {Object2D} from "../Object2D.js";
import {Box2} from "../math/Box2.js";

/**
 * Image object is used to draw an image from URL.
 *
 * @class
 * @param {string} src Source URL of the image.
 * @extends {Object2D}
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
Image.prototype.constructor = Image;
Image.prototype.type = "Image";
Object2D.register(Image, "Image");

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

Image.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	data.box = this.box.toArray();
	data.image = this.image.src;

	return data;
};

Image.prototype.parse = function(data, root)
{
	Object2D.prototype.parse.call(this, data, root);

	this.box.fromArray(data.box);
	this.image.src = data.image;
};

export {Image};
