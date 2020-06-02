import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";
import {ColorStyle} from "./style/ColorStyle";
import {Style} from "./style/Style";

/**
 * Line object draw a line from one point to another without any kind of interpolation.
 *
 * For drawing lines with interpolation check {BezierCurve}
 *
 * @class
 * @extends {Object2D}
 */
function Line()
{
	Object2D.call(this);

	/**
	 * Initial point of the line.
	 *
	 * Can be equal to the position object of another object. Making it automatically follow that object.
	 *
	 * @type {Vector2}
	 */
	this.from = new Vector2();

	/**
	 * Final point of the line.
	 *
	 * Can be equal to the position object of another object. Making it automatically follow that object.
	 *
	 * @type {Vector2}
	 */
	this.to = new Vector2();

	/**
	 * Dash line pattern to be used, if empty draws a solid line.
	 *
	 * Dash pattern is defined as the size of dashes as pairs of space with no line and with line.
	 *
	 * E.g if the dash pattern is [1, 2] we get 1 point with line, 2 without line repeat infinitelly.
	 *
	 * @type {number[]}
	 */
	this.dashPattern = [5, 5];

	/**
	 * Style of the object line.
	 *
	 * @type {Style}
	 */
	this.strokeStyle = new ColorStyle("#000000");

	/**
	 * Line width of the line.
	 *
	 * @type {number}
	 */
	this.lineWidth = 1;
}

Line.prototype = Object.create(Object2D.prototype);
Line.prototype.constructor = Line;
Line.prototype.type = "Line";
Object2D.register(Line, "Line");

Line.prototype.style = function(context, viewport, canvas)
{
	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.strokeStyle.get();
	context.setLineDash(this.dashPattern);
};

Line.prototype.draw = function(context, viewport, canvas)
{
	context.beginPath();
	context.moveTo(this.from.x, this.from.y);
	context.lineTo(this.to.x, this.to.y);
	context.stroke();
};

Line.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	data.from = this.from.toArray();
	data.to = this.to.toArray();
	data.dashPattern = this.dashPattern;
	data.strokeStyle = this.strokeStyle.serialize();
	data.lineWidth = this.lineWidth;

	return data;
};

Line.prototype.parse = function(data, root)
{
	Object2D.prototype.parse.call(this, data, root);

	this.to.fromArray(data.to);
	this.from.fromArray(data.from);
	this.dashPattern = data.dashPattern;
	this.strokeStyle = Style.parse(data.strokeStyle);
	this.lineWidth = data.lineWidth;
};

export {Line};
