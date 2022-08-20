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
	 * 
	 * @type {number}
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

Circle.prototype.draw = function(context, viewport, canvas)
{
	context.beginPath();
	context.arc(0, 0, this.radius, 0, 2 * Math.PI);
	
	if(this.fillStyle !== null)
	{	
		context.fillStyle = this.fillStyle.get(context);
		context.fill();
	}

	if(this.strokeStyle !== null)
	{
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.strokeStyle.get(context);
		context.stroke();
	}
};

Circle.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	data.radius = this.radius;
	data.strokeStyle = this.strokeStyle !== null ? this.strokeStyle.serialize() : null;
	data.lineWidth = this.lineWidth;
	data.fillStyle = this.fillStyle !== null ? this.fillStyle.serialize() : null;

	return data;
};

Circle.prototype.parse = function(data, root)
{
	Object2D.prototype.parse.call(this, data, root);

	this.radius = data.radius;
	this.strokeStyle = data.strokeStyle !== null ? Style.parse(data.strokeStyle) : null;
	this.lineWidth = data.lineWidth;
	this.fillStyle = data.fillStyle !== null ? Style.parse(data.fillStyle) : null;
};

export {Circle};
