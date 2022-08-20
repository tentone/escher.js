import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";
import {Circle} from "./Circle.js";
import {Line} from "./Line.js";

/**
 * Quadratic curve object draw as quadratic curve between two points.
 * 
 * Quadratic curve data is composed of two anchor points, one for the start of the curve and one for the end of the curve.
 *
 * @class
 * @extends {Object2D}
 */
function QuadraticCurve()
{
	Line.call(this);

	/**
	 * Control point of the quadratic curve used to control the curvature of the line between the from and to point.
	 *
	 * The curve is interpolated in the direction of the control point it defined the path of the curve.
	 *
	 * @type {Vector2}
	 */
	this.controlPoint = new Vector2();
}

QuadraticCurve.prototype = Object.create(Line.prototype);
QuadraticCurve.prototype.constructor = QuadraticCurve;
QuadraticCurve.prototype.type = "QuadraticCurve";
Object2D.register(QuadraticCurve, "QuadraticCurve");

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
	context.beginPath();
	context.moveTo(this.from.x, this.from.y);
	context.quadraticCurveTo(this.controlPoint.x, this.controlPoint.y, this.to.x, this.to.y);
	context.stroke();
};

QuadraticCurve.prototype.serialize = function(recursive)
{
	var data = Line.prototype.serialize.call(this, recursive);

	data.controlPoint = this.controlPoint.toArray();

	return data;
};

QuadraticCurve.prototype.parse = function(data, root)
{
	Line.prototype.parse.call(this, data, root);

	this.controlPoint.fromArray(data.controlPoint);
};

export {QuadraticCurve};
