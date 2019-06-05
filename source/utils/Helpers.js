"use strict";

import {Circle} from "../objects/Circle.js";

function Helpers(){}

/**
 * Create a box resize helper and attach it to an object to change the size of the object box.
 *
 * Each helper is positioned on one corner of the box, and the value of the corner is copied to the boxes as they are dragged.
 *
 * This method required to object to have a box property.
 */
Helpers.createBoxResize = function(object)
{
	if(object.box === undefined)
	{
		console.warn("trenette.js: Helpers.createBoxResize(), object box property missing.");
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
	topRight.onPointerDrag = function(pointer, viewport, delta)
	{
		object.box.min.copy(topRight.position);
		updateHelpers();
	};
	object.add(topRight);

	var topLeft = new Circle();
	topLeft.radius = 4;
	topLeft.onPointerDrag = function(pointer, viewport, delta)
	{
		object.box.max.x = topLeft.position.x;
		object.box.min.y = topLeft.position.y;
		updateHelpers();
	};
	object.add(topLeft);

	var bottomLeft = new Circle();
	bottomLeft.radius = 4;
	bottomLeft.onPointerDrag = function(pointer, viewport, delta)
	{
		object.box.max.copy(bottomLeft.position);
		updateHelpers();
	};
	object.add(bottomLeft);

	var bottomRight = new Circle();
	bottomRight.radius = 4;
	bottomRight.onPointerDrag = function(pointer, viewport, delta)
	{
		object.box.min.x = bottomRight.position.x;
		object.box.max.y = bottomRight.position.y;
		updateHelpers();
	};
	object.add(bottomRight);

	updateHelpers();
};

export {Helpers};