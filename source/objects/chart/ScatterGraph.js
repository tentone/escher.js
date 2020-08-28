import {Object2D} from "../../Object2D.js";
import {Graph} from "./Graph.js";

/**
 * Scatter graph can be used to draw numeric data as points.
 *
 * @class
 * @extends {Object2D}
 */
function ScatterGraph()
{
	Graph.call(this);

	/**
	 * Radius of each point represented in the scatter plot.
	 */
	this.radius = 5.0;
}

ScatterGraph.prototype = Object.create(Graph.prototype);
ScatterGraph.prototype.constructor = ScatterGraph;
ScatterGraph.prototype.type = "BarGraph";
Object2D.register(ScatterGraph, "BarGraph");

ScatterGraph.prototype.draw = function(context, viewport, canvas)
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

	for(var i = 0, s = 0; i < this.data.length; s += step, i++)
	{
		var y = this.box.max.y - ((this.data[i] - this.min) / gamma) * height;

		context.moveTo(this.box.min.x + s + this.radius, y);
		context.arc(this.box.min.x + s, y, this.radius, 0, Math.PI * 2, true);
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

ScatterGraph.prototype.serialize = function(recursive)
{
	var data = Graph.prototype.serialize.call(this, recursive);

	data.radius = this.radius;

	return data;
};

ScatterGraph.prototype.parse = function(data, root)
{
	Graph.prototype.parse.call(this, data, root);

	this.radius = data.radius;
};

export {ScatterGraph};
