import {Mask} from "./Mask.js";
import {Vector2} from "../../math/Vector2.js";
import {Box2} from "../../math/Box2.js";

/**
 * Box mask can be used to clear a box mask region.
 *
 * It will limit the drawing region to this box.
 *
 * @class
 * @extends {Mask}
 */
function BoxMask()
{
	Mask.call(this);

	/**
	 * Box object containing the size of the object.
	 *
	 * @type {Box2}
	 */
	this.box = new Box2(new Vector2(-50, -35), new Vector2(50, 35));

	/**
	 * If inverted the mask considers the outside of the box instead of the inside.
	 *
	 * @type {boolean}
	 */
	this.invert = false;
}

BoxMask.prototype = Object.create(Mask.prototype);
BoxMask.prototype.constructor = BoxMask;
BoxMask.prototype.type = "BoxMask";
Object2D.register(BoxMask, "BoxMask");

BoxMask.prototype.isInside = function(point)
{
	return this.box.containsPoint(point);
};

BoxMask.prototype.clip = function(context, viewport, canvas)
{
	context.beginPath();
	
	var width = this.box.max.x - this.box.min.x;
	
	if(this.invert)
	{	
		context.rect(this.box.min.x - 1e4, -5e3, 1e4, 1e4);
		context.rect(this.box.max.x, -5e3, 1e4, 1e4);
		context.rect(this.box.min.x, this.box.min.y - 1e4, width, 1e4);
		context.rect(this.box.min.x, this.box.max.y, width, 1e4);
	}
	else
	{
		var height = this.box.max.y - this.box.min.y;
		context.fillRect(this.box.min.x, this.box.min.y, width, height);
	}

	context.clip();
};

export {BoxMask};
