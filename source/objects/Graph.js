import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";
import {Box2} from "../math/Box2.js";

/**
 * Graph object is used to draw simple graph data into the canvas.
 *
 * Graph data is composed of X, Y values.
 *
 * @class
 * @extends {Object2D}
 */
function Graph()
{
	Object2D.call(this);

	/**
	 * Graph object containing the size of the object.
	 */
	this.box = new Box2(new Vector2(-50, -35), new Vector2(50, 35));

	/**
	 * Color of the box border line.
	 */
	this.strokeStyle = "rgb(0, 153, 255)";

	/**
	 * Line width.
	 */
	this.lineWidth = 1;

	/**
	 * Background color of the box.
	 */
	this.fillStyle = "rgba(0, 153, 255, 0.3)";

	/**
	 * Minimum value of the graph.
	 */
	this.min = 0;

	/**
	 * Maximum value of the graph.
	 */
	this.max = 10;

	/**
	 * Data to be presented in the graph.
	 *
	 * The array should store numeric values.
	 */
	this.data = [];
}

Graph.prototype = Object.create(Object2D.prototype);

Graph.prototype.isInside = function(point)
{
	return this.box.containsPoint(point);
};

Graph.prototype.draw = function(context, viewport, canvas)
{
	if(this.data.length === 0)
	{
		return;
	}
	
	var width = this.box.max.x - this.box.min.x;
	var height = this.box.max.y - this.box.min.y;

	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.strokeStyle;
	context.beginPath();
		
	var step = width / (this.data.length - 1);
	var gamma = this.max - this.min;

	context.moveTo(this.box.min.x, this.box.max.y - ((this.data[0] - this.min) / gamma) * height);
	
	for(var i = 1, s = step; i < this.data.length; s += step, i++)
	{
		context.lineTo(this.box.min.x + s, this.box.max.y - ((this.data[i] - this.min) / gamma) * height);
	}

	context.stroke();

	if(this.fillStyle !== null)
	{
		context.fillStyle = this.fillStyle;

		context.lineTo(this.box.max.x, this.box.max.y);
		context.lineTo(this.box.min.x, this.box.max.y);
		context.fill();
	}
};

export {Graph};
