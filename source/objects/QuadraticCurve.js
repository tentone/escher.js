import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";
import {Circle} from "./Circle.js";
import {Line} from "./Line.js";

/**
 * Bezier curve object draw as bezier curve between two points.
 *
 * @class
 * @extends {Object2D}
 */
function QuadraticCurve()
{
	Object2D.call(this);

	/**
	 * Initial point of the curve.
	 *
	 * Can be equal to the position object of another object. (Making it automatically follow that object.)
	 */
	this.from = new Vector2();

	/**
	 * Control point of the quadratic curve used to control the curvature of the line between the from and to point.
	 *
	 * The curve is interpolated in the direction of the control point it defined the path of the curve.
	 */
	this.controlPoint = new Vector2();

	/**
	 * Final point of the curve.
	 *
	 * Can be equal to the position object of another object. (Making it automatically follow that object.)
	 */
	this.to = new Vector2();

	/**
	 * Dash line pattern to be used, if empty draws a solid line.
	 *
	 * Dash pattern is defined as the size of dashes as pairs of space with no line and with line.
	 *
	 * E.g if the pattern is [1, 2] we get 1 point with line, 2 without line repeat infinitely.
	 */
	this.dashPattern = [5, 5];

	/**
	 * Style of the object line.
	 */
	this.strokeStyle = "#000000";

	/**
	 * Line width of the line.
	 */
	this.lineWidth = 1;
}

QuadraticCurve.prototype = Object.create(Object2D.prototype);

/**
 * Create a quadratic curve helper, to edit the curve control point.
 *
 * Helper objects are added to the parent of the curve object.
 *
 * @static
 * @param {QuadraticCurve} object Object to create the helper for.
 */
QuadraticCurve.curveHelper = function(object)
{
	var fromLine = new Line();
	fromLine.from = object.from;
	fromLine.to = object.controlPoint;
	object.parent.add(fromLine);

	var controlPoint = new Circle();
	controlPoint.radius = 3;
	controlPoint.layer = object.layer + 1;
	controlPoint.draggable = true;
	controlPoint.position = object.controlPoint;
	controlPoint.onPointerDrag = function(pointer, viewport, delta)
	{
		Object2D.prototype.onPointerDrag.call(this, pointer, viewport, delta);
		object.controlPoint.copy(controlPoint.position);
	};
	object.parent.add(controlPoint);

	var toLine = new Line();
	toLine.from = object.to;
	toLine.to = object.controlPoint;
	object.parent.add(toLine);
};

QuadraticCurve.prototype.draw = function(context, viewport, canvas)
{
	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.strokeStyle;
	context.setLineDash(this.dashPattern);
	
	context.beginPath();
	context.moveTo(this.from.x, this.from.y);
	context.quadraticCurveTo(this.controlPoint.x, this.controlPoint.y, this.to.x, this.to.y);
	context.stroke();
};

export {QuadraticCurve};
