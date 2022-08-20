import {Object2D} from "../../Object2D.js";
import {Graph} from "./Graph.js";

/**
 * Bar graph can be used to plot bar data into the canvas.
 *
 * @class
 * @extends {Object2D}
 */
function BarGraph()
{
	Graph.call(this);

	/**
	 * Width of each bar in the graph.
	 * 
	 * If set null is automatically calculated from the graph size and number of points.
	 * 
	 * @type {number}
	 */
	this.barWidth = null;
}

BarGraph.prototype = Object.create(Graph.prototype);
BarGraph.prototype.constructor = BarGraph;
BarGraph.prototype.type = "BarGraph";
Object2D.register(BarGraph, "BarGraph");

BarGraph.prototype.draw = function(context, viewport, canvas)
{
	if(this.data.length === 0)
	{
		return;
	}
	
	var width = this.box.max.x - this.box.min.x;
	var height = this.box.max.y - this.box.min.y;

	var step = width / (this.data.length - 1);
	var gamma = this.max - this.min;

	context.lineWidth = this.lineWidth;
	context.beginPath();

	var barWidth = this.barWidth !== null ? this.barWidth : width / this.data.length;
	var barHalfWidth = barWidth / 2.0;

	for(var i = 0, s = 0; i < this.data.length; s += step, i++)
	{
		var y = this.box.max.y - ((this.data[i] - this.min) / gamma) * height;

		context.moveTo(this.box.min.x + s - barHalfWidth, y);
		context.rect(this.box.min.x + s - barHalfWidth, y, barWidth, this.box.max.y - y);
	}

	if(this.strokeStyle !== null)
	{
		context.strokeStyle = this.strokeStyle.get(context);
		context.stroke();
	}

	if(this.fillStyle !== null)
	{
		context.fillStyle = this.fillStyle.get(context);
		context.fill();
	}
};

BarGraph.prototype.serialize = function(recursive)
{
	var data = Graph.prototype.serialize.call(this, recursive);

	return data;
};

BarGraph.prototype.parse = function(data, root)
{
	Graph.prototype.parse.call(this, data, root);
};

export {BarGraph};
