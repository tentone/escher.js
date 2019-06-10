"use strict";

import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";
import {Circle} from "./Circle.js";
import {Line} from "./Line.js";

/**
 * BezierCurve object draw as bezier curve between two points.
 *
 * @class
 */
function BezierCurve()
{
	Object2D.call(this);

	/**
	 * Initial point of the curve.
	 *
	 * Can be equal to the position object of another object. (Making it automatically follow that object.)
	 */
	this.from = new Vector2();

	/**
	 * Intial position control point, indicates the tangent of the bezier curve on the first point.
	 */
	this.fromCp = new Vector2();

	/**
	 * Final point of the curve.
	 *
	 * Can be equal to the position object of another object. (Making it automatically follow that object.)
	 */
	this.to = new Vector2();

	/**
	 * Final position control point, indicates the tangent of the bezier curve on the last point.
	 */
	this.toCp = new Vector2();

	/**
	 * Color of the line.
	 */
	this.strokeStyle = "#000000";

	/**
	 * Dash line pattern to be used, is empty draws a solid line.
	 */
	this.dashPattern = [5, 5];

	/**
	 * BezierCurve width.
	 */
	this.lineWidth = 1;
}

BezierCurve.prototype = Object.create(Object2D.prototype);

/**
 * Create a bezier curve helper, to edit the bezier curve anchor points.
 *
 * @static
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
	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.strokeStyle;
	context.setLineDash(this.dashPattern);
	
	context.beginPath();
	context.moveTo(this.from.x, this.from.y);
	context.bezierCurveTo(this.fromCp.x, this.fromCp.y, this.toCp.x, this.toCp.y, this.to.x, this.to.y);
	context.stroke();
};

export {BezierCurve};
