import {Object2D} from "../Object2D.js";

/**
 * Text element, used to draw single line text into the canvas.
 *
 * For multi line text with support for line break check {MultiLineText} object.
 *
 * @class
 * @extends {Object2D}
 */
function Text()
{
	Object2D.call(this);

	/**
	 * Text value displayed by this element.
	 *
	 * @type {string}
	 */
	this.text = "";

	/**
	 * Font of the text.
	 *
	 * @type {string}
	 */
	this.font = "16px Arial";

	/**
	 * Style of the object border line. If set null it is ignored.
	 *
	 * @type {string}
	 */
	this.strokeStyle = null;

	/**
	 * Line width, only used if a valid strokeStyle is defined.
	 *
	 * @type {number}
	 */
	this.lineWidth = 1;

	/**
	 * CSS background color of the box. If set null it is ignored.
	 *
	 * @type {string}
	 */
	this.fillStyle = "#000000";

	/**
	 * Text align property. Same values as used for canvas text applies
	 *
	 * Check documentation at https://developer.mozilla.org/en-US/docs/Web/CSS/text-align for mode details about this property.
	 *
	 * @type {string}
	 */
	this.textAlign = "center";

	/**
	 * Text baseline defines the vertical position of the text relative to the imaginary line Y position. Same values as used for canvas text applies
	 *
	 * Check documentation at https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline for mode details about this property.
	 *
	 * @type {string}
	 */
	this.textBaseline = "middle";
}

Text.prototype = Object.create(Object2D.prototype);

Text.prototype.draw = function(context, viewport, canvas)
{
	context.font = this.font;
	context.textAlign = this.textAlign;
	context.textBaseline = this.textBaseline ;
	
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
