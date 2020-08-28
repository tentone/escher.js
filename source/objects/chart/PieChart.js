import {Object2D} from "../../Object2D.js";
import { ColorStyle } from "../style/ColorStyle.js";

/**
 * Pie chart represents a set of data in a pie like chart graph.
 * 
 * The values are drawn in porportion relative to their sum.
 *
 * @class
 * @extends {Object2D}
 */
function PieChart()
{
	Object2D.call(this);

	/**
	 * Data to be displayed on the pie chart. Each element should store a value and a stroke/fill styles.
	 * 
	 * Each element should use the following structure {value: 0.0, fillStyle: ..., strokestyle: ...}.
	 */
	this.data = [
		{value: 10, fillStyle: new ColorStyle("#FD5748"), strokeStyle: new ColorStyle("#AAAAAA")},
		{value: 15, fillStyle: new ColorStyle("#23AB48"), strokeStyle: new ColorStyle("#AAAAAA")},
		{value: 5, fillStyle: new ColorStyle("#6285F8"), strokeStyle: new ColorStyle("#AAAAAA")}
	];

	/**
	 * Radius of the pie chart object.
	 *
	 * @type {number}
	 */
	this.radius = 50;

	/**
	 * The line width of each pie chart section.
	 *
	 * @type {number}
	 */
	this.lineWidth = 1.0;

	/**
	 * Start angle of the pie chart.
	 *
	 * @type {number}
	 */
	this.startAngle = 0;

	/**
	 * End angle of the pie chart.
	 *
	 * @type {number}
	 */
	this.endAngle = 2 * Math.PI;
}

PieChart.prototype = Object.create(Object2D.prototype);
PieChart.prototype.constructor = PieChart;
PieChart.prototype.type = "PieChart";
Object2D.register(PieChart, "PieChart");

PieChart.prototype.isInside = function(point)
{
	return point.length() <= this.radius;
};

PieChart.prototype.draw = function(context)
{
	var sum = 0;
	for(var i = 0; i < this.data.length; i++)
	{
		sum += this.data[i].value;
	}

	context.lineWidth = this.lineWidth;
	
	var angleRange = this.endAngle - this.startAngle;
	var angle = this.startAngle;

	for(var i = 0; i < this.data.length; i++)
	{
		var section = angleRange * (this.data[i].value / sum);
		
		context.beginPath();
		context.arc(0, 0, this.radius, angle, section);
		
		angle += section;

		if(this.data[i].strokeStyle)
		{
			context.strokeStyle = this.data[i].strokeStyle.get(context);
			context.stroke();
		}

		if(this.data[i].fillStyle)
		{
			context.fillStyle = this.data[i].fillStyle.get(context);
			context.fill();
		}
	}
};

PieChart.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	data.radius = this.radius;
	data.lineWidth = this.lineWidth;
	data.startAngle = this.startAngle;
	data.endAngle = this.endAngle;

	return data;
};

PieChart.prototype.parse = function(data, root)
{
	Object2D.prototype.parse.call(this, data, root);

	this.radius = data.radius;
	this.lineWidth = data.lineWidth;
	this.startAngle = data.startAngle;
	this.endAngle = data.endAngle;
};

export {PieChart};
