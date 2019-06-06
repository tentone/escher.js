"use strict";

import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";

/**
 * Line object draw a line from one point to another.
 *
 * @class
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
	 * Color of the line.
	 */
	this.strokeStyle = "#000000";

	/**
	 * Dash line pattern to be used, is empty draws a solid line.
	 */
	this.dashPattern = [5, 5];

	/**
	 * Line width.
	 */
	this.lineWidth = 1;
}

Line.prototype = Object.create(Object2D.prototype);

Line.prototype.draw = function(context)
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
