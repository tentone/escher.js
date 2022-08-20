import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";
import {Box2} from "../math/Box2.js";
import {ColorStyle} from "./style/ColorStyle";
import {Style} from "./style/Style";

/**
 * Box object draw a rectangular object.
 *
 * Can be used as a base to implement other box objects, already implements collision for pointer events.
 *
 * @class
 * @extends {Object2D}
 */
function Box()
{
	Object2D.call(this);

	/**
	 * Box object containing the size of the object.
	 * 
	 * @type {Box2}
	 */
	this.box = new Box2(new Vector2(-50, -50), new Vector2(50, 50));

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
	 * Background color of the box.
	 *
	 * If set null it is ignored.
	 *
	 * @type {Style}
	 */
	this.fillStyle = new ColorStyle("#FFFFFF");
}

Box.prototype = Object.create(Object2D.prototype);
Box.prototype.constructor = Box;
Box.prototype.type = "Box";
Object2D.register(Box, "Box");

Box.prototype.isInside = function(point)
{
	return this.box.containsPoint(point);
};

Box.prototype.draw = function(context, viewport, canvas)
{
	var width = this.box.max.x - this.box.min.x;
	var height = this.box.max.y - this.box.min.y;

	if(this.fillStyle !== null)
	{	
		context.fillStyle = this.fillStyle.get(context);
		context.fillRect(this.box.min.x, this.box.min.y, width, height);
	}

	if(this.strokeStyle !== null)
	{
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.strokeStyle.get(context);
		context.strokeRect(this.box.min.x, this.box.min.y, width, height);
	}
};

Box.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	data.box = this.box.toArray();
	data.strokeStyle = this.strokeStyle !== null ? this.strokeStyle.serialize() : null;
	data.lineWidth = this.lineWidth;
	data.fillStyle = this.fillStyle !== null ? this.fillStyle.serialize() : null;

	return data;
};

Box.prototype.parse = function(data, root)
{
	Object2D.prototype.parse.call(this, data, root);

	this.box.fromArray(data.box);
	this.strokeStyle = data.strokeStyle !== null ? Style.parse(data.strokeStyle) : null;
	this.lineWidth = data.lineWidth;
	this.fillStyle = data.fillStyle !== null ? Style.parse(data.fillStyle) : null;
};

export {Box};
