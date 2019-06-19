"use strict";

import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";

/**
 * Line object draw a line from one point to another.
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
	 * Can be equal to the position object of another object. (Making it automatically follow that object.)
	 */
	this.from = new Vector2();

	/**
	 * Final point of the line.
	 *
	 * Can be equal to the position object of another object. (Making it automatically follow that object.)
	 */
	this.to = new Vector2();

	/**
	 * Dash line pattern to be used, if empty draws a solid line.
	 *
	 * Dash parttern is defined as the size of dashes as pairs of space with no line and with line.
	 *
	 * E.g if the daspattern is [1, 2] we get 1 point with line, 2 without line repeat infinitelly.
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

Line.prototype = Object.create(Object2D.prototype);

Line.prototype.draw = function(context, viewport, canvas)
{
	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.strokeStyle;
	context.setLineDash(this.dashPattern);
	
	context.beginPath();
	context.moveTo(this.from.x, this.from.y);
	context.lineTo(this.to.x, this.to.y);
	context.stroke();
};

export {Line};
