"use strict";

import {Circle} from "../objects/Circle.js";
import {Object2D} from "../Object2D.js";

/**
 * Class contains helper functions to create editing object tools.
 *
 * @class
 */
function Helpers(){}

/**
 * Create a rotation tool helper.
 *
 * When the object is dragged is changes the parent object rotation.
 *
 * @static
 */
Helpers.rotateTool = function(object)
{
	var tool = new Circle();
	tool.radius = 4;
	tool.layer = object.layer + 1;
	tool.onPointerDrag = function(pointer, viewport, delta)
	{
		object.rotation += delta.x * 1e-3;
	};
	object.add(tool);
};

/**
 * Create a box resize helper and attach it to an object to change the size of the object box.
 *
 * Each helper is positioned on one corner of the box, and the value of the corner is copied to the boxes as they are dragged.
 *
 * This method required to object to have a box property.
 *
 * @static
 */
Helpers.boxResizeTool = function(object)
{
	if(object.box === undefined)
	{
		console.warn("trenette.js: Helpers.boxResizeTool(), object box property missing.");
		return;
	}

	function updateHelpers()
	{
		topRight.position.copy(object.box.min);
		bottomLeft.position.copy(object.box.max);
		topLeft.position.set(object.box.max.x, object.box.min.y);
		bottomRight.position.set(object.box.min.x, object.box.max.y);
	}

	var topRight = new Circle();
	topRight.radius = 4;
	topRight.layer = object.layer + 1;
	topRight.draggable = true;
	topRight.onPointerDrag = function(pointer, viewport, delta)
	{
		Object2D.prototype.onPointerDrag.call(this, pointer, viewport, delta);

		object.box.min.copy(topRight.position);
		updateHelpers();
	};
	object.add(topRight);

	var topLeft = new Circle();
	topLeft.radius = 4;
	topLeft.layer = object.layer + 1;
	topLeft.draggable = true;
	topLeft.onPointerDrag = function(pointer, viewport, delta)
	{
		Object2D.prototype.onPointerDrag.call(this, pointer, viewport, delta);

		object.box.max.x = topLeft.position.x;
		object.box.min.y = topLeft.position.y;
		updateHelpers();
	};
	object.add(topLeft);

	var bottomLeft = new Circle();
	bottomLeft.radius = 4;
	bottomLeft.layer = object.layer + 1;
	bottomLeft.draggable = true;
	bottomLeft.onPointerDrag = function(pointer, viewport, delta)
	{
		Object2D.prototype.onPointerDrag.call(this, pointer, viewport, delta);

		object.box.max.copy(bottomLeft.position);
		updateHelpers();
	};
	object.add(bottomLeft);

	var bottomRight = new Circle();
	bottomRight.radius = 4;
	bottomRight.layer = object.layer + 1;
	bottomRight.draggable = true;
	bottomRight.onPointerDrag = function(pointer, viewport, delta)
	{
		Object2D.prototype.onPointerDrag.call(this, pointer, viewport, delta);

		object.box.min.x = bottomRight.position.x;
		object.box.max.y = bottomRight.position.y;
		updateHelpers();
	};
	object.add(bottomRight);

	updateHelpers();
};

export {Helpers};