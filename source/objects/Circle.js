import {Object2D} from "../Object2D.js";
import {ColorStyle} from "./style/ColorStyle";
import {Style} from "./style/Style";

/**
 * Circle object draw a circular object, into the canvas.
 *
 * Can be used as a base to implement other circular objects, already implements the circle collision for pointer events.
 *
 * @class
 * @extends {Object2D}
 */
function Circle()
{
	Object2D.call(this);

	/**
	 * Radius of the circle.
	 */
	this.radius = 10.0;

	/**
	 * Style of the object border line.
	 *
	 * If set null it is ignored.
	 *
	 * @type {Style}
	 */
	this.strokeStyle = new ColorStyle("#000000");

	/**
	 * Line width, only used if a valid strokeStyle is defined.
	 *
	 * @type {number}
	 */
	this.lineWidth = 1;

	/**
	 * Background color of the circle.
	 *
	 * If set null it is ignored.
	 *
	 * @type {Style}
	 */
	this.fillStyle = new ColorStyle("#FFFFFF");
}

Circle.prototype = Object.create(Object2D.prototype);
Circle.prototype.constructor = Circle;
Circle.prototype.type = "Circle";
Object2D.register(Circle, "Circle");

Circle.prototype.isInside = function(point)
{
	return point.length() <= this.radius;
};

Circle.prototype.onPointerEnter = function(pointer, viewport)
{
	this.fillStyle = new ColorStyle("#CCCCCC");
};

Circle.prototype.onPointerLeave = function(pointer, viewport)
{
	this.fillStyle = new ColorStyle("#FFFFFF");
};

Circle.prototype.draw = function(context, viewport, canvas)
{
	context.beginPath();
	context.arc(0, 0, this.radius, 0, 2 * Math.PI);
	
	if(this.fillStyle !== null)
	{	
		context.fillStyle = this.fillStyle.get();
		context.fill();
	}

	if(this.strokeStyle !== null)
	{
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.strokeStyle.get();
		context.stroke();
	}
};

Circle.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	data.radius = this.radius;
	data.strokeStyle = this.strokeStyle.serialize();
	data.lineWidth = this.lineWidth;
	data.fillStyle = this.fillStyle.serialize();

	return data;
};

Circle.prototype.parse = function(data, root)
{
	Object2D.prototype.parse.call(this, data, root);

	this.radius = data.radius;
	this.strokeStyle = Style.parse(data.strokeStyle);
	this.lineWidth = data.lineWidth;
	this.fillStyle = Style.parse(data.fillStyle);
};

export {Circle};
