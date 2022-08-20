import {Object2D} from "../Object2D.js";
import {ColorStyle} from "./style/ColorStyle";
import {Style} from "./style/Style";

/**
 * Path object can be used to draw paths build from commands into the canvas.
 * 
 * These paths can be also obtained from SVG files as a SVG command list.
 *
 * @class
 * @extends {Object2D}
 */
function Path(path)
{
	Object2D.call(this);

	/**
	 * Path2D object containing the commands to draw the shape into the canvas.
	 * 
	 * Check https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D for more details.
	 * 
	 * @type {Path2D}
	 */
	this.path = path !== undefined ? path : new Path2D("M10 10 h 80 v 80 h -80 Z");

	/**
	 * Style of the object border line.
	 *
	 * If set null it is ignored.
	 * 
	 * @type {Style}
	 */
	this.strokeStyle = new ColorStyle("#000000");

	/**
	 * Line width, only used if a valid strokeStyle is defined.
	 * 
	 * @type {number}
	 */
	this.lineWidth = 1;

	/**
	 * Background color of the path.
	 *
	 * If set null it is ignored.
	 *
	 * @param {Style}
	 */
	this.fillStyle = new ColorStyle("#FFFFFF");
}

Path.prototype = Object.create(Object2D.prototype);
Path.prototype.constructor = Path;
Path.prototype.type = "Path";
Object2D.register(Path, "Path");

Path.prototype.draw = function(context)
{
	if(this.fillStyle !== null)
	{	
		context.fillStyle = this.fillStyle.get(context);
		context.fill(this.path);
	}

	if(this.strokeStyle !== null)
	{
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.strokeStyle.get(context);
		context.stroke(this.path);
	}
};

Path.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	data.strokeStyle = this.strokeStyle !== null ? this.strokeStyle.serialize() : null;
	data.lineWidth = this.lineWidth;
	data.fillStyle = this.fillStyle !== null ? this.fillStyle.serialize() : null;

	return data;
};

Path.prototype.parse = function(data, root)
{
	Object2D.prototype.parse.call(this, data, root);

	this.strokeStyle = data.strokeStyle !== null ? Style.parse(data.strokeStyle) : null;
	this.lineWidth = data.lineWidth;
	this.fillStyle = data.fillStyle !== null ? Style.parse(data.fillStyle) : null;
};

export {Path};
