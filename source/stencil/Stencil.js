"use strict";

import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";
import {Box2} from "../math/Box2.js";

/**
 * A stencil can be used to set the drawing region.
 *
 * Stencils are treated as objects their shaphe is used to filter other objects shape.
 *
 * Multiple stencil objects can be active simulatenously.
 *
 * @class
 */
function Stencil()
{
	Object2D.call(this);
}

Stencil.prototype = Object.create(Object2D.prototype);

Stencil.prototype.isStencil = true;

/**
 * Clip the canvas context, to ensure that next objects being drawn are cliped to the path stored here.
 *
 * @param {CanvasContext} context Canvas 2d drawing context.
 * @param {Viewport} viewport Viewport applied to the canvas.
 * @param {DOM} canvas DOM canvas element where the content is being drawn.
 */
Stencil.prototype.clip = function(context, viewport, canvas){};

export {Stencil};