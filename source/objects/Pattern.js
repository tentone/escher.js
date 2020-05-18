import {Object2D} from "../Object2D.js";
import {Box2} from "../math/Box2.js";

/**
 * Pattern object draw a image repeated as a pattern.
 *
 * Its similar to the Image class but the image can be repeat infinitely.
 *
 * @class
 * @extends {Object2D}
 * @param {string} src Source image URL.
 */
function Pattern(src)
{
	Object2D.call(this);

	/**
	 * Box object containing the size of the object.
	 *
	 * @type {Box2}
	 */
	this.box = new Box2();

	/**
	 * Image source DOM element. Used as a source for the pattern image.
	 *
	 * This element can be replaced by one of other type (e.g canvas, video).
	 *
	 * @type {Element}
	 */
	this.image = document.createElement("img");

	/**
	 * Repetition indicates how the pattern image should be repeated.
	 *
	 * Possible values are "repeat", "repeat-x", "repeat-y" or "no-repeat".
	 *
	 * More information about this attribute here https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern.
	 *
	 * @type {string}
	 */
	this.repetition = "repeat"

	if(src !== undefined)
	{
		this.setImage(src);
	}
}

Pattern.prototype = Object.create(Object2D.prototype);
Pattern.prototype.constructor = Pattern;
Pattern.prototype.type = "Pattern";
Object2D.register(Pattern, "Pattern");

/**
 * Set the image source of the object. Can be anything accepted by the src field of an img element.
 *
 * Automatically sets the box size to match the image.
 *
 * @param {string} src Image source string.
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

Pattern.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	data.box = this.box.toArray();
	data.image = this.image.src;
	data.repetition = this.repetition;

	return data;
};

Pattern.prototype.parse = function(data)
{
	Object2D.prototype.parse.call(this, data);

	this.box.fromArray(data.box);
	this.image.src = data.image;
	this.repetition = data.repetition;
};

export {Pattern};
