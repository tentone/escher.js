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
	 * Style of the object border line.
	 *
	 * If set null it is ignored.
	 */
	this.strokeStyle = null;

	/**
	 * Line width, only used if a valid strokeStyle is defined.
	 */
	this.lineWidth = 1;

	/**
	 * Background color of the box.
	 *
	 * If set null it is ignored.
	 */
	this.fillStyle = "#000000";

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
	context.textBaseline = "middle";
	
	if(this.fillStyle !== null)
	{
		context.fillStyle = this.fillStyle;
		context.fillText(this.text, 0, 0);
	}

	if(this.strokeStyle !== null)
	{
		context.strokeStyle = this.strokeStyle;
		context.strokeText(this.text, 0, 0);
	}
};

export {Text};
