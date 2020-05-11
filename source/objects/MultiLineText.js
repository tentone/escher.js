import {Text} from "../Text.js";

/**
 * Multiple line text drawing directly into the canvas.
 *
 * Has support for basic text indent and alignment.
 *
 * @class
 * @extends {Text}
 */
function MultiLineText()
{
	Text.call(this);

	/**
	 * Text baseline defines the vertical position of the text relative to the imaginary line Y position.
	 *
	 * @type {string}
	 */
	this.textBaseline = "middle";

	/**
	 * Maximum width of the text content. After text reaches the max width a line break is placed.
	 *
	 * @type {number}
	 */
	this.maxWidth = 100;

	/**
	 * Height of each line of text, can be smaller or larger than the actual font size.
	 *
	 * Can be set to null to be ignored.
	 *
	 * @type {number}
	 */
	this.lineHeight = 100;
}

MultiLineText.prototype = Object.create(Text.prototype);

MultiLineText.prototype.draw = function(context, viewport, canvas)
{
	context.font = this.font;
	context.textAlign = this.textAlign;
	context.textBaseline = this.textBaseline;
	context.font = font;

	var lineHeight = this.lineHeight || Number.parseFloat(font);
	var lines = text.split("\n");
	var offsetY = 0;

	// Iterate trough all lines (breakpoints)
	for(var i = 0; i < lines.length; i++)
	{
		var line = lines[i];
		var size = context.measureText(line);
		var sublines = [];

		// Split into multiple sub-lines
		if(size.width > this.maxWidth)
		{
			while(line.length > 0)
			{
				var subline = "";
				var subsize = context.measureText(subline + line[0]);

				while(subsize.width < this.maxWidth && line.length > 0)
				{
					subline += line[0];
					line = line.substr(1);
					subsize = context.measureText(subline + line[0]);
				}

				sublines.push(subline);
			}

		}
		// Fits into a single line
		else
		{
			sublines = [line];
		}

		for(var j = 0; j < sublines.length; j++)
		{
			if(this.fillStyle !== null)
			{
				context.fillStyle = this.fillStyle;
				context.fillText(sublines[j], x, y + offsetY);
			}

			if(this.strokeStyle !== null)
			{
				context.strokeStyle = this.strokeStyle;
				context.strokeText(sublines[j], x, y + offsetY);
			}

			offsetY += lineHeight;
		}
	}
};

export {MultiLineText};
