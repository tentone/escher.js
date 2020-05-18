import {Box} from "./Box";

/**
 * Rounded box object draw a rectangular object with rounded corners.
 *
 * @class
 * @extends {Box}
 */
function RoundedBox()
{
	Box.call(this);

	/**
	 * Radius of the circular section that makes up the box corners.
	 *
	 * @type {number}
	 */
	this.radius = 5;
}

RoundedBox.prototype = Object.create(Box.prototype);
RoundedBox.prototype.constructor = RoundedBox;
RoundedBox.prototype.type = "RoundedBox";
Object2D.register(RoundedBox, "RoundedBox");

/**
 * Draw a rounded rectangle into the canvas context using path to draw the rounded rectangle.
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x The top left x coordinate
 * @param {number} y The top left y coordinate
 * @param {number} width The width of the rectangle
 * @param {number} height The height of the rectangle
 * @param {number} radius Radius of the rectangle corners.
 */
RoundedBox.roundRect = function(context, x, y, width, height, radius)
{
	context.beginPath();
	context.moveTo(x + radius, y);
	context.lineTo(x + width - radius, y);
	context.quadraticCurveTo(x + width, y, x + width, y + radius);
	context.lineTo(x + width, y + height - radius);
	context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	context.lineTo(x + radius, y + height);
	context.quadraticCurveTo(x, y + height, x, y + height - radius);
	context.lineTo(x, y + radius);
	context.quadraticCurveTo(x, y, x + radius, y);
	context.closePath();
};

RoundedBox.prototype.draw = function(context, viewport, canvas)
{
	var width = this.box.max.x - this.box.min.x;
	var height = this.box.max.y - this.box.min.y;

	if(this.fillStyle !== null)
	{	
		context.fillStyle = this.fillStyle;
		RoundedBox.roundRect(context, this.box.min.x, this.box.min.y, width, height, this.radius);
		context.fill();
	}

	if(this.strokeStyle !== null)
	{
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.strokeStyle;
		RoundedBox.roundRect(context, this.box.min.x, this.box.min.y, width, height, this.radius);
		context.stroke();
	}
};

RoundedBox.prototype.serialize = function(recursive)
{
	var data = Box.prototype.serialize.call(this, recursive);

	data.radius = this.radius;

	return data;
};

RoundedBox.prototype.parse = function(data)
{
	Box.prototype.parse.call(this, data);

	this.radius = data.radius;
};

export {RoundedBox};
