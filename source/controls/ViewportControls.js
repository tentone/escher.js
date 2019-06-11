"use strict";

import {Viewport} from "../Viewport.js";
import {Pointer} from "../input/Pointer.js";

/**
 * Viewport controls are used to allow the user to control the viewport.
 *
 * @class
 * @param {Viewport} viewport
 */
function ViewportControls(viewport)
{
	/**
	 * Viewport being controlled by this object.
	 */
	this.viewport = viewport;

	/**
	 * Button used to drag and viewport around.
	 */
	this.dragButton = Pointer.LEFT;

	/**
	 * If true allows the viewport to be rotated.
	 */
	this.allowRotation = false;

	/**
	 * Flag to indicate if the viewport should move when scalling.
	 *
	 * For some application its easier to focus the target if the viewport moves to the pointer location while scalling.
	 */
	this.moveOnScale = true;

	/**
	 * Value of the initial point of rotation if the viewport is being rotated.
	 *
	 * Is set to null when the viewport is not being rotated.
	 */
	this.rotationPoint = null;
}

/**
 * Update the viewport controls using the pointer object.
 */
ViewportControls.prototype.update = function(pointer)
{	
	if(pointer.wheel !== 0)
	{
		this.viewport.scale -= pointer.wheel * 1e-3 * this.viewport.scale;

		if(this.moveOnScale)
		{	
			var speed = pointer.wheel;
			var halfWidth = pointer.canvas.width / 2;
			var halfWeight = pointer.canvas.height / 2;

			this.viewport.position.x += ((pointer.position.x - halfWidth) / halfWidth) * speed;
			this.viewport.position.y += ((pointer.position.y - halfWeight) / halfWeight) * speed;
		}
	}

	if(this.allowRotation && pointer.buttonPressed(Pointer.RIGHT) && pointer.buttonPressed(Pointer.LEFT))
	{
		if(this.rotationPoint === null)
		{
			this.rotationPoint = pointer.position.clone();
		}
		else
		{
			//TODO <USE ROTATION POINT>
			this.viewport.rotation += pointer.delta.angle() * 1e-3;
		}
	}
	else
	{
		this.rotationPoint = null;

		if(pointer.buttonPressed(this.dragButton))
		{
			this.viewport.position.x += pointer.delta.x;
			this.viewport.position.y += pointer.delta.y;
		}
	}
};