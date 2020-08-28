import {Object2D} from "../../Object2D.js";

/**
 * Bar graph can be used to plot bar data into the canvas.
 *
 * @class
 * @extends {Object2D}
 */
function BarGraph()
{
	Graph.call(this);
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
	

	// TODO <ADD CODE HERE>
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
