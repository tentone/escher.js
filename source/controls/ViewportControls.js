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
	this.dragButton = Pointer.RIGHT;

	/**
	 * Is set to true allow the viewport to be scalled.
	 */
	this.allowScale = true;

	/**
	 * Flag to indicate if the viewport should move when scalling.
	 *
	 * For some application its easier to focus the target if the viewport moves to the pointer location while scalling.
	 */
	this.moveOnScale = true;

	/**
	 * If true allows the viewport to be rotated.
	 */
	this.allowRotation = false;

	/**
	 * Value of the initial point of rotation if the viewport is being rotated.
	 *
	 * Is set to null when the viewport is not being rotated.
	 */
	this.rotationPoint = null;

	/**
	 * Initial rotation of the viewport.
	 */
	this.rotationInitial = 0;
}

/**
 * Update the viewport controls using the pointer object.
 *
 * @param {Pointer} pointer
 */
ViewportControls.prototype.update = function(pointer)
{	
	if(this.allowScale && pointer.wheel !== 0)
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
			this.rotationInitial = this.viewport.rotation;
		}
		else
		{
			var pointer = pointer.position.clone();
			pointer.sub(this.rotationPoint);
			this.viewport.rotation = this.rotationInitial + pointer.angle();
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

export {ViewportControls};