import {Object2D} from "../../Object2D.js";
import {ColorStyle} from "../style/ColorStyle";

/**
 * Gauge object is used to draw gauge like graphic.
 *
 * It has a defined range, start angle, end angle and style controls.
 *
 * @class
 * @extends {Object2D}
 */
function Gauge()
{
	Object2D.call(this);

	/**
	 * Value displayed by this gauge. It is displayed based on min and max values.
	 *
	 * @type {number}
	 */
	this.value = 50;

	/**
	 * Minimum value of the gauge. Necessary to display the value correctly to scale.
	 *
	 * @type {number}
	 */
	this.min = 0;

	/**
	 * Maximum value of the gauge. Necessary to display the value correctly to scale.
	 *
	 * @type {number}
	 */
	this.max = 100;

	/**
	 * Radius of the gauge object.
	 *
	 * @type {number}
	 */
	this.radius = 80;

	/**
	 * The line width of the gauge semi-circle.
	 *
	 * @type {number}
	 */
	this.lineWidth = 10;

	/**
	 * Start angle of the gauge.
	 *
	 * @type {number}
	 */
	this.startAngle = Math.PI;

	/**
	 * End angle of the gauge.
	 *
	 * @type {number}
	 */
	this.endAngle = 2 * Math.PI;

	/**
	 * If true draw a circular dial at the end of the gauge bar.
	 *
	 * @type {boolean}
	 */
	this.dial = false;

	/**
	 * Style of the base of the gauge object, (the background of the gauge bar).
	 *
	 * @type {Style}
	 */
	this.baseStyle = new ColorStyle("#e9ecf1");

	/**
	 * Style of the gauge bar.
	 *
	 * @type {Style}
	 */
	this.barStyle = new LinearGradientStyle();
	this.barStyle.addColorStop(0, "#61ff50");
	this.barStyle.addColorStop(0.5, "#ffbb50");
	this.barStyle.addColorStop(1, "#ff3269");
}

Gauge.prototype = Object.create(Object2D.prototype);
Gauge.prototype.constructor = Gauge;
Gauge.prototype.type = "Gauge";
Object2D.register(Gauge, "Gauge");

Gauge.prototype.isInside = function(point)
{
	return point.length() <= this.radius;
};

Gauge.prototype.draw = function(context, viewport, canvas)
{
	var percentage = this.value / (this.max - this.min);

	var range = [this.startAngle, this.endAngle];
	var diff = range[1] - range[0];
	var angle = range[0] + diff * percentage;
	var center = [0, 0];

	//Back
	context.lineWidth = this.lineWidth;
	context.lineCap = "round";
	context.strokeStyle = this.baseStyle.get(context);
	context.beginPath();
	context.arc(center[0], center[1], this.radius, range[0], range[1]);
	context.stroke();

	// Fill gradient
	var gradient = context.createLinearGradient(-this.radius, 0, this.radius, 0);

	context.strokeStyle = this.barStyle.get(context);

	context.lineWidth = this.lineWidth;
	context.beginPath();
	context.arc(center[0], center[1], this.radius, range[0], angle);
	context.stroke();

	if(this.dial)
	{
		var dialAngle = (this.startAngle - this.endAngle) * percentage;
		var dialCenter = [Math.cos(dialAngle) * this.radius, Math.sin(dialAngle) * this.radius];
		dialCenter[0] = dialCenter[0] - center[0];
		dialCenter[1] = dialCenter[1] - center[1];

		context.fillStyle = "#FFFFFF";
		context.beginPath();
		context.arc(dialCenter[0], dialCenter[1], this.lineWidth / 2, 0, 2 * Math.PI);
		context.fill();

		context.fillStyle = gradient;
		context.beginPath();
		context.arc(dialCenter[0], dialCenter[1], this.lineWidth / 3, 0, 2 * Math.PI);
		context.fill();
	}
};

Gauge.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	// TODO <ADD CODE HERE>

	return data;
};

Gauge.prototype.parse = function(data, root)
{
	Object2D.prototype.parse.call(this, data, root);

	// TODO <ADD CODE HERE>
};


export {Gauge};
