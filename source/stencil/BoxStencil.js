"use strict";

import {Stencil} from "./Stencil.js";
import {Vector2} from "../math/Vector2.js";
import {Box2} from "../math/Box2.js";

function BoxStencil()
{
	Stencil.call(this);

	/**
	 * Box object containing the size of the object.
	 */
	this.box = new Box2(new Vector2(-50, -35), new Vector2(50, 35));

	/**
	 * If inverted the stencil considers the outside of the box instead of the inside.
	 */
	this.invert = false;
}

BoxStencil.prototype = Object.create(Stencil.prototype);

BoxStencil.prototype.clip = function(context, viewport, canvas)
{
	var width = this.box.max.x - this.box.min.x;
	
	context.beginPath();
	context.rect(this.box.min.x - 1e4, -5e3, 1e4, 1e4);
	context.rect(this.box.max.x, -5e3, 1e4, 1e4);
	context.rect(this.box.min.x, this.box.min.y - 1e4, width, 1e4);
	context.rect(this.box.min.x, this.box.max.y, width, 1e4);
	context.clip();
};
