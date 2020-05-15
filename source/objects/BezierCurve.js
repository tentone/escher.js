import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";
import {Circle} from "./Circle.js";
import {Line} from "./Line.js";

/**
 * Bezier curve object draw as bezier curve between two points.
 *
 * @class
 * @extends {Line}
 */
function BezierCurve()
{
	Line.call(this);

	/**
	 * Initial position control point, indicates the tangent of the bezier curve on the first point.
	 *
	 * @type {Vector2}
	 */
	this.fromCp = new Vector2();

	/**
	 * Final position control point, indicates the tangent of the bezier curve on the last point.
	 *
	 * @type {Vector2}
	 */
	this.toCp = new Vector2();
}

BezierCurve.prototype = Object.create(Line.prototype);
BezierCurve.prototype.constructor = BezierCurve;

/**
 * Create a bezier curve helper, to edit the bezier curve anchor points.
 *
 * Helper objects are added to the parent of the curve object.
 *
 * @static
 * @param {BezierCurve} object Object to create the helper for.
 */
BezierCurve.curveHelper = function(object)
{
	var fromCp = new Circle();
	fromCp.radius = 3;
	fromCp.layer = object.layer + 1;
	fromCp.draggable = true;
	fromCp.onPointerDrag = function(pointer, viewport, delta)
	{
		Object2D.prototype.onPointerDrag.call(this, pointer, viewport, delta);
		object.fromCp.copy(fromCp.position);
	};
	object.parent.add(fromCp);

	var fromLine = new Line();
	fromLine.from = object.from;
	fromLine.to = object.fromCp;
	object.parent.add(fromLine);

	var toCp = new Circle();
	toCp.radius = 3;
	toCp.layer = object.layer + 1;
	toCp.draggable = true;
	toCp.onPointerDrag = function(pointer, viewport, delta)
	{
		Object2D.prototype.onPointerDrag.call(this, pointer, viewport, delta);
		object.toCp.copy(toCp.position);
	};
	object.parent.add(toCp);

	var toLine = new Line();
	toLine.from = object.to;
	toLine.to = object.toCp;
	object.parent.add(toLine);
};

BezierCurve.prototype.draw = function(context, viewport, canvas)
{
	context.beginPath();
	context.moveTo(this.from.x, this.from.y);
	context.bezierCurveTo(this.fromCp.x, this.fromCp.y, this.toCp.x, this.toCp.y, this.to.x, this.to.y);
	context.stroke();
};

export {BezierCurve};
