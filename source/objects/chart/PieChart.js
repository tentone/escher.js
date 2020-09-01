import {Object2D} from "../../Object2D.js";

/**
 * Pie chart represents a set of data in a pie like chart graph.
 * 
 * The values are drawn in porportion relative to their sum.
 *
 * @class
 * @extends {Object2D}
 */
function PieChart(data)
{
	Object2D.call(this);

	/**
	 * Data to be displayed on the pie chart. Each element should store a value and a stroke/fill styles.
	 * 
	 * Each element should use the following structure {value: 0.0, fillStyle: ..., strokestyle: ...}.
	 */
	this.data = data !== undefined ? data : [];

	/**
	 * Variable pie slice size based on their value compared to the biggest value.
	 *
	 * @type {boolean}
	 */
	this.sliceSize = false;

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
	if(this.data.length === 0)
	{
		return;
	}

	var sum = 0;
	var max = this.data[0].value;

	for(var i = 0; i < this.data.length; i++)
	{
		sum += this.data[i].value;

		if(this.data[i].value > max)
		{
			max = this.data[i].value;
		}
	}

	context.lineWidth = this.lineWidth;
	
	var angleRange = this.endAngle - this.startAngle;
	var angle = this.startAngle;

	// Fill
	for(var i = 0; i < this.data.length; i++)
	{
		var section = angleRange * (this.data[i].value / sum);

		if(this.data[i].fillStyle)
		{
			context.beginPath();
			context.moveTo(0, 0);

			var radius = this.sliceSize ? ((this.data[i].value / max) * this.radius) : this.radius;
			context.arc(0, 0, radius, angle, angle + section);
			context.moveTo(0, 0);

			context.fillStyle = this.data[i].fillStyle.get(context);
			context.fill();
		}

		angle += section;
	}

	// Stroke
	for(var i = 0; i < this.data.length; i++)
	{
		var section = angleRange * (this.data[i].value / sum);

		if(this.data[i].strokeStyle)
		{
			context.beginPath();
			context.moveTo(0, 0);

			var radius = this.sliceSize ? ((this.data[i].value / max) * this.radius) : this.radius;
			context.arc(0, 0, radius, angle, angle + section);
			context.moveTo(0, 0);

			context.strokeStyle = this.data[i].strokeStyle.get(context);
			context.stroke();
		}

		angle += section;
	}
};

PieChart.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	data.radius = this.radius;
	data.lineWidth = this.lineWidth;
	data.startAngle = this.startAngle;
	data.endAngle = this.endAngle;
	data.sliceSize = this.sliceSize;

	return data;
};

PieChart.prototype.parse = function(data, root)
{
	Object2D.prototype.parse.call(this, data, root);

	this.radius = data.radius;
	this.lineWidth = data.lineWidth;
	this.startAngle = data.startAngle;
	this.endAngle = data.endAngle;
	this.sliceSize = data.sliceSize;
};

export {PieChart};
