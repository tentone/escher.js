import {Text} from "./Text.js";

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
	 * Maximum width of the text content. After text reaches the max width a line break is placed.
	 *
	 * Can be set to null to be ignored.
	 *
	 * @type {number}
	 */
	this.maxWidth = null;

	/**
	 * Height of each line of text, can be smaller or larger than the actual font size.
	 *
	 * Can be set to null to be ignored.
	 *
	 * @type {number}
	 */
	this.lineHeight = null;
}

MultiLineText.prototype = Object.create(Text.prototype);
MultiLineText.prototype.constructor = MultiLineText;
MultiLineText.prototype.type = "MultiLineText";
Object2D.register(MultiLineText, "MultiLineText");

MultiLineText.prototype.draw = function(context, viewport, canvas)
{
	context.font = this.font;
	context.textAlign = this.textAlign;
	context.textBaseline = this.textBaseline;

	var lineHeight = this.lineHeight || Number.parseFloat(this.font);
	var lines = this.text.split("\n");
	var offsetY = 0;

	// Iterate trough all lines (breakpoints)
	for(var i = 0; i < lines.length; i++)
	{
		var line = lines[i];
		var size = context.measureText(line);
		var sublines = [];

		// Split into multiple sub-lines
		if(this.maxWidth !== null && size.width > this.maxWidth)
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
				context.fillText(sublines[j], this.position.x, this.position.y + offsetY);
			}

			if(this.strokeStyle !== null)
			{
				context.strokeStyle = this.strokeStyle;
				context.strokeText(sublines[j], this.position.x, this.position.y + offsetY);
			}

			offsetY += lineHeight;
		}
	}
};

MultiLineText.prototype.serialize = function(recursive)
{
	var data = Text.prototype.serialize.call(this, recursive);

	data.maxWidth = this.maxWidth;
	data.lineHeight = this.lineHeight;

	return data;
};

MultiLineText.prototype.parse = function(data)
{
	Text.prototype.parse.call(this, data);

	this.maxWidth = data.maxWidth;
	this.lineHeight = data.lineHeight;
};

export {MultiLineText};
