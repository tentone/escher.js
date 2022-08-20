import {Object2D} from "../../Object2D.js";
import {Vector2} from "../../math/Vector2.js";
import {Box2} from "../../math/Box2.js";
import {ColorStyle} from "../style/ColorStyle";

/**
 * Graph object is used to plot numeric graph data into the canvas.
 *
 * Graph data is composed of Y values that are interpolated across the X axis.
 *
 * @class
 * @extends {Object2D}
 */
function Graph()
{
	Object2D.call(this);

	/**
	 * Graph object containing the size of the object.
	 * 
	 * @type {Box2}
	 */
	this.box = new Box2(new Vector2(-50, -35), new Vector2(50, 35));

	/**
	 * Color of the box border line.
	 * 
	 * @type {ColorStyle}
	 */
	this.strokeStyle = new ColorStyle("rgb(0, 153, 255)");

	/**
	 * Line width used to stroke the graph data.
	 * 
	 * @type {number}
	 */
	this.lineWidth = 1.0;

	/**
	 * Background color of the box.
	 * 
	 * @type {ColorStyle}
	 */
	this.fillStyle = new ColorStyle("rgba(0, 153, 255, 0.3)");

	/**
	 * Minimum value of the graph.
	 * 
	 * @type {number}
	 */
	this.min = 0;

	/**
	 * Maximum value of the graph.
	 * 
	 * @type {number}
	 */
	this.max = 10;

	/**
	 * Data to be presented in the graph.
	 *
	 * The array should store numeric values.
	 * 
	 * @type {Array<number>}
	 */
	this.data = [];
}

Graph.prototype = Object.create(Object2D.prototype);
Graph.prototype.constructor = Graph;
Graph.prototype.type = "Graph";
Object2D.register(Graph, "Graph");

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
	context.beginPath();
			
	var step = width / (this.data.length - 1);
	var gamma = this.max - this.min;

	context.moveTo(this.box.min.x, this.box.max.y - ((this.data[0] - this.min) / gamma) * height);
	
	for(var i = 1, s = step; i < this.data.length; s += step, i++)
	{
		context.lineTo(this.box.min.x + s, this.box.max.y - ((this.data[i] - this.min) / gamma) * height);
	}

	if(this.strokeStyle !== null)
	{
		context.strokeStyle = this.strokeStyle.get(context);
		context.stroke();
	}

	if(this.fillStyle !== null)
	{
		context.fillStyle = this.fillStyle.get(context);
		context.lineTo(this.box.max.x, this.box.max.y);
		context.lineTo(this.box.min.x, this.box.max.y);
		context.fill();
	}
};

Graph.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	data.box = this.box.toArray();
	data.strokeStyle = this.strokeStyle !== null ? this.strokeStyle.serialize() : null;
	data.lineWidth = this.lineWidth;
	data.fillStyle = this.fillStyle !== null ? this.fillStyle.serialize() : null;
	data.min = this.min;
	data.max = this.max;
	data.data = this.data;

	return data;
};

Graph.prototype.parse = function(data, root)
{
	Object2D.prototype.parse.call(this, data, root);

	this.box.fromArray(data.box);
	this.strokeStyle = data.strokeStyle !== null ? Style.parse(data.strokeStyle) : null;
	this.lineWidth = data.lineWidth;
	this.fillStyle = data.fillStyle !== null ? Style.parse(data.fillStyle) : null;
	this.min = data.min;
	this.max = data.max;
	this.data = data.data;
};


export {Graph};
