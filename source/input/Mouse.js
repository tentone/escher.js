"use strict";

import {EventManager} from "../EventManager.js";
import {Vector2} from "../math/Vector2.js";
import {Key} from "./Key.js";

/**
 * Mouse instance for input in sync with the running 3D application.
 *
 * The mouse object provided by scripts is automatically updated by the runtime handler.
 * 
 * @class
 * @param {DOM} domElement DOM element to craete the mouse events.
 * @param {Boolean} dontInitialize If true the mouse events are not created.
 */
function Mouse(domElement, dontInitialize)
{
	//Raw data
	this._keys = new Array(5);
	this._position = new Vector2(0, 0);
	this._positionUpdated = false;
	this._delta = new Vector2(0, 0);
	this._wheel = 0;
	this._wheelUpdated = false;
	this._doubleClicked = new Array(5);

	/**
	 * Array with mouse buttons status.
	 */
	this.keys = new Array(5);

	/**
	 * Mouse position inside of the window (coordinates in window space).
	 */
	this.position = new Vector2(0, 0);

	/**
	 * Mouse movement (coordinates in window space).
	 */
	this.delta = new Vector2(0, 0);

	/**
	 * Mouse scroll wheel movement.
	 */
	this.wheel = 0;
	
	/**
	 * Indicates a button of the mouse was double clicked.
	 */
	this.doubleClicked = new Array(5);

	/**
	 * DOM element where to attach the mouse events.
	 */
	this.domElement = (domElement !== undefined) ? domElement : window;

	/**
	 * Canvas attached to this mouse instance used to calculate position and delta in element space coordinates.
	 */
	this.canvas = null;
	
	/**
	 * Event manager responsible for updating the raw data variables.
	 *
	 * Diferent events are used depending on the host platform.
	 *
	 * When the update method is called the raw data is reset.
	 */
	this.events = new EventManager();

	//Initialize key instances
	for(var i = 0; i < 5; i++)
	{
		this._doubleClicked[i] = false;
		this.doubleClicked[i] = false;
		this._keys[i] = new Key();
		this.keys[i] = new Key();
	}

	//Self pointer
	var self = this;

	//Scroll wheel
	if(window.onmousewheel !== undefined)
	{
		//Chrome, edge
		this.events.add(this.domElement, "mousewheel", function(event)
		{
			self._wheel = event.deltaY;
			self._wheelUpdated = true;
		});
	}
	else if(window.addEventListener !== undefined)
	{
		//Firefox
		this.events.add(this.domElement, "DOMMouseScroll", function(event)
		{
			self._wheel = event.detail * 30;
			self._wheelUpdated = true;
		});
	}
	else
	{
		this.events.add(this.domElement, "wheel", function(event)
		{
			self._wheel = event.deltaY;
			self._wheelUpdated = true;
		});
	}

	//Touchscreen input events
	if(window.ontouchstart !== undefined || navigator.msMaxTouchPoints > 0)
	{
		//Auxiliar variables to calculate touch delta
		var lastTouch = new Vector2(0, 0);

		//Touch start event
		this.events.add(this.domElement, "touchstart", function(event)
		{
			var touch = event.touches[0];

			self.updatePosition(touch.clientX, touch.clientY, 0, 0);
			self.updateKey(Mouse.LEFT, Key.DOWN);

			lastTouch.set(touch.clientX, touch.clientY);
		});

		//Touch end event
		this.events.add(this.domElement, "touchend", function(event)
		{
			self.updateKey(Mouse.LEFT, Key.UP);
		});

		//Touch cancel event
		this.events.add(this.domElement, "touchcancel", function(event)
		{
			self.updateKey(Mouse.LEFT, Key.UP);
		});

		//Touch move event
		this.events.add(document.body, "touchmove", function(event)
		{
			var touch = event.touches[0];
			self.updatePosition(touch.clientX, touch.clientY, touch.clientX - lastTouch.x, touch.clientY - lastTouch.y);
			lastTouch.set(touch.clientX, touch.clientY);
		});
	}

	//Move
	this.events.add(this.domElement, "mousemove", function(event)
	{
		self.updatePosition(event.clientX, event.clientY, event.movementX, event.movementY);
	});

	//Button pressed
	this.events.add(this.domElement, "mousedown", function(event)
	{
		self.updateKey(event.which - 1, Key.DOWN);
	});

	//Button released
	this.events.add(this.domElement, "mouseup", function(event)
	{
		self.updateKey(event.which - 1, Key.UP);
	});

	//Drag start
	this.events.add(this.domElement, "dragstart", function(event)
	{
		self.updateKey(event.which - 1, Key.UP);
	});

	//Mouse double click
	this.events.add(this.domElement, "dblclick", function(event)
	{	
		self._doubleClicked[event.which - 1] = true;
	});

	if(dontInitialize !== true)
	{
		this.create();
	}
}

Mouse.prototype = Mouse;
Mouse.prototype.constructor = Mouse;

/**
 * Left mouse button.
 */
Mouse.LEFT = 0;

/**
 * Middle mouse button.
 */
Mouse.MIDDLE = 1;

/**
 * Right mouse button.
 */
Mouse.RIGHT = 2;

/**
 * Back mouse navigation button.
 */
Mouse.BACK = 3;

/**
 * Forward mouse navigation button.
 */
Mouse.FORWARD = 4;

/**
 * Element to be used for coordinates calculation relative to that canvas.
 * 
 * @param {DOM} canvas Canvas to be attached to the Mouse instance
 */
Mouse.setCanvas = function(element)
{
	this.canvas = element;

	element.mouseInside = false;

	element.addEventListener("mouseenter", function()
	{
		this.mouseInside = true;
	});

	element.addEventListener("mouseleave", function()
	{
		this.mouseInside = false;
	});
};

/**
 * Check if mouse is inside attached canvas (updated async).
 * 
 * @return {boolean} True if mouse is currently inside the canvas
 */
Mouse.insideCanvas = function()
{
	return this.canvas !== null && this.canvas.mouseInside;
};

/**
 * Check if mouse button is currently pressed.
 * 
 * @param {Number} button Button to check status of
 * @return {boolean} True if button is currently pressed
 */
Mouse.buttonPressed = function(button)
{
	return this.keys[button].pressed;
};

/**
 * Check if mouse button was double clicked.
 * 
 * @param {Number} button Button to check status of
 * @return {boolean} True if some mouse button was just double clicked
 */
Mouse.buttonDoubleClicked = function(button)
{
	return this.doubleClicked[button];
};

/**
 * Check if a mouse button was just pressed.
 * 
 * @param {Number} button Button to check status of
 * @return {boolean} True if button was just pressed
 */
Mouse.buttonJustPressed = function(button)
{
	return this.keys[button].justPressed;
};

/**
 * Check if a mouse button was just released.
 * 
 * @param {Number} button Button to check status of
 * @return {boolean} True if button was just released
 */
Mouse.buttonJustReleased = function(button)
{
	return this.keys[button].justReleased;
};

/**
 * Update mouse position.
 *
 * Automatically called by the runtime.
 * 
 * @param {Number} x
 * @param {Number} y
 * @param {Number} xDiff
 * @param {Number} yDiff
 */
Mouse.updatePosition = function(x, y, xDiff, yDiff)
{
	if(this.canvas !== null)
	{
		var rect = this.canvas.getBoundingClientRect();
		x -= rect.left;
		y -= rect.top;
	}

	this._position.set(x, y);
	this._delta.x += xDiff;
	this._delta.y += yDiff;
	this._positionUpdated = true;
};

/**
 * Update a mouse button.
 * 
 * Automatically called by the runtime.
 *
 * @param {Number} button
 * @param {Number} action
 */
Mouse.updateKey = function(button, action)
{
	if(button > -1)
	{
		this._keys[button].update(action);
	}
};

/**
 * Update mouse buttons state, position, wheel and delta synchronously.
 */
Mouse.update = function()
{
	//Update mouse keys state
	for(var i = 0; i < 5; i++)
	{
		if(this._keys[i].justPressed && this.keys[i].justPressed)
		{
			this._keys[i].justPressed = false;
		}
		if(this._keys[i].justReleased && this.keys[i].justReleased)
		{
			this._keys[i].justReleased = false;
		}

		this.keys[i].set(this._keys[i].justPressed, this._keys[i].pressed, this._keys[i].justReleased);

		//Update mouse double click
		if(this._doubleClicked[i] === true)
		{
			this.doubleClicked[i] = true;
			this._doubleClicked[i] = false;
		}
		else
		{
			this.doubleClicked[i] = false;
		}
	}

	//Update mouse wheel
	if(this._wheelUpdated)
	{
		this.wheel = this._wheel;
		this._wheelUpdated = false;
	}
	else
	{
		this.wheel = 0;
	}

	//Update mouse Position if needed
	if(this._positionUpdated)
	{
		this.delta.copy(this._delta);
		this.position.copy(this._position);

		this._delta.set(0,0);
		this._positionUpdated = false;
	}
	else
	{
		this.delta.x = 0;
		this.delta.y = 0;
	}
};

/**
 * Create mouse events.
 */
Mouse.create = function()
{
	this.events.create();
};

/**
 * Dispose mouse events.
 */
Mouse.dispose = function()
{
	this.events.destroy();
};


export {Mouse};