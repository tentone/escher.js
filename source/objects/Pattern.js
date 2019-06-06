"use strict";

import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";
import {Pattern2} from "../math/Pattern2.js";
import {Helpers} from "../utils/Helpers.js";
import {Circle} from "./Circle.js";

/**
 * Pattern object draw a box.
 */
function Pattern()
{
	Object2D.call(this);

	/**
	 * Image source DOM element.
	 */
	this.image = document.createElement("img");

	/**
	 * A DOMString indicating how to repeat the pattern image.
	 */
	this.repetition = "repeat"
}

Pattern.prototype = Object.create(Object2D.prototype);

Pattern.prototype.draw = function(context, viewport)
{
	var width = this.box.max.x - this.box.min.x;
	var height = this.box.max.y - this.box.min.y;

	var pattern = context.createPattern(this.image, this.repetition);
	//pattern.setTransform();

	context.fillStyle = this.fillStyle;
	context.fillRect(this.box.min.x, this.box.min.y, width, height);
};

export {Pattern};
