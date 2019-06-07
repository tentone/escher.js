"use strict";

import {Object2D} from "../Object2D.js";

/**
 * Text element, used to draw text into the canvas.
 *
 * @class
 */
function Text()
{
	Object2D.call(this);

	/**
	 * Text value.
	 */
	this.text = "";

	/**
	 * Font of the text.
	 */
	this.font = "16px Arial";

	/**
	 * Color (style) of the text.
	 */
	this.color = "#000000";

	/**
	 * Text align property.
	 */
	this.textAlign = "center";
}

Text.prototype = Object.create(Object2D.prototype);

Text.prototype.draw = function(context, viewport, canvas)
{
	context.font = this.font;
	context.textAlign = this.textAlign;
	context.fillStyle = this.color;
	context.textBaseline = "middle";
	
	context.fillText(this.text, 0, 0);
};

export {Text};
