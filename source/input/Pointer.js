import {EventManager} from "../utils/EventManager.js";
import {Vector2} from "../math/Vector2.js";
import {Key} from "./Key.js";

/**
 * Pointer object is used to called input from the user, works for booth mouse or touch screens.
 *
 * It is responsible for synchronizing user input with the render of the graphics.
 * 
 * @class
 * @param {Element} domElement DOM element to create the pointer events.
 * @param {Element} canvas Canvas DOM element where the content is being drawn.
 */
function Pointer(domElement, canvas)
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
	 * Array with pointer buttons status.
	 *
	 * @type {number[]}
	 */
	this.keys = new Array(5);

	/**
	 * Pointer position inside of the window (coordinates in window space).
	 *
	 * This value is accumulated from multiple mouse triggered events between updated.
	 *
	 * @type {Vector2}
	 */
	this.position = new Vector2(0, 0);

	/**
	 * Pointer movement (coordinates in window space). Since the last update.
	 *
	 * This value is accumulated from multiple mouse triggered events between updated.
	 *
	 * @type {Vector2}
	 */
	this.delta = new Vector2(0, 0);

	/**
	 * Pointer scroll wheel movement, since the last update.
	 *
	 * @type {number}
	 */
	this.wheel = 0;
	
	/**
	 * Indicates a button of the pointer was double clicked.
	 *
	 * @type {boolean}
	 */
	this.doubleClicked = new Array(5);

	/**
	 * DOM element where to attach the pointer events.
	 *
	 * @type {Element}
	 */
	this.domElement = (domElement !== undefined) ? domElement : window;

	/**
	 * Canvas attached to this pointer instance used to calculate position and delta in element space coordinates.
	 *
	 * @type {Element}
	 */
	this.canvas = null;
	if(canvas !== undefined)
	{
		this.setCanvas(canvas);
	}

	/**
	 * Event manager responsible for updating the raw data variables.
	 *
	 * Different events are used depending on the host platform.
	 *
	 * When the update method is called the raw data is reset.
	 *
	 * @type {EventManager}
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
			self.updateKey(Pointer.LEFT, Key.DOWN);

			lastTouch.set(touch.clientX, touch.clientY);
		});

		//Touch end event
		this.events.add(this.domElement, "touchend", function(event)
		{
			self.updateKey(Pointer.LEFT, Key.UP);
		});

		//Touch cancel event
		this.events.add(this.domElement, "touchcancel", function(event)
		{
			self.updateKey(Pointer.LEFT, Key.UP);
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

	//Pointer double click
	this.events.add(this.domElement, "dblclick", function(event)
	{	
		self._doubleClicked[event.which - 1] = true;
	});

	this.create();
}

Pointer.prototype = Pointer;
Pointer.prototype.constructor = Pointer;

/**
 * Left pointer button.
 *
 * @static
 * @type {number}
 */
Pointer.LEFT = 0;

/**
 * Middle pointer button.
 *
 * @static
 * @type {number}
 */
Pointer.MIDDLE = 1;

/**
 * Right pointer button.
 *
 * @static
 * @type {number}
 */
Pointer.RIGHT = 2;

/**
 * Back pointer navigation button.
 *
 * @static
 * @type {number}
 */
Pointer.BACK = 3;

/**
 * Forward pointer navigation button.
 *
 * @static
 * @type {number}
 */
Pointer.FORWARD = 4;

/**
 * Element to be used for coordinates calculation relative to that canvas.
 * 
 * @param {DOM} element Canvas to be attached to the Pointer instance
 */
Pointer.setCanvas = function(element)
{
	this.canvas = element;

	element.pointerInside = false;

	element.addEventListener("mouseenter", function()
	{
		this.pointerInside = true;
	});

	element.addEventListener("mouseleave", function()
	{
		this.pointerInside = false;
	});
};

/**
 * Check if pointer is inside attached canvas (updated async).
 * 
 * @return {boolean} True if pointer is currently inside the canvas
 */
Pointer.insideCanvas = function()
{
	return this.canvas !== null && this.canvas.pointerInside;
};

/**
 * Check if pointer button is currently pressed.
 * 
 * @param {Number} button Button to check status of
 * @return {boolean} True if button is currently pressed
 */
Pointer.buttonPressed = function(button)
{
	return this.keys[button].pressed;
};

/**
 * Check if pointer button was double clicked.
 * 
 * @param {Number} button Button to check status of
 * @return {boolean} True if some pointer button was just double clicked
 */
Pointer.buttonDoubleClicked = function(button)
{
	return this.doubleClicked[button];
};

/**
 * Check if a pointer button was just pressed.
 * 
 * @param {Number} button Button to check status of
 * @return {boolean} True if button was just pressed
 */
Pointer.buttonJustPressed = function(button)
{
	return this.keys[button].justPressed;
};

/**
 * Check if a pointer button was just released.
 * 
 * @param {Number} button Button to check status of
 * @return {boolean} True if button was just released
 */
Pointer.buttonJustReleased = function(button)
{
	return this.keys[button].justReleased;
};

/**
 * Update pointer position.
 * 
 * @param {Number} x
 * @param {Number} y
 * @param {Number} xDiff
 * @param {Number} yDiff
 */
Pointer.updatePosition = function(x, y, xDiff, yDiff)
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
 * Update a pointer button.
 *
 * @param {Number} button
 * @param {Number} action
 */
Pointer.updateKey = function(button, action)
{
	if(button > -1)
	{
		this._keys[button].update(action);
	}
};

/**
 * Update pointer buttons state, position, wheel and delta synchronously.
 *
 * Should be called every frame on the update loop before reading any values from the pointer.
 */
Pointer.update = function()
{
	//Update pointer keys state
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

		//Update pointer double click
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

	//Update pointer wheel
	if(this._wheelUpdated)
	{
		this.wheel = this._wheel;
		this._wheelUpdated = false;
	}
	else
	{
		this.wheel = 0;
	}

	//Update pointer Position if needed
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
 * Create pointer events to collect input data.
 *
 * Should be called before using the pointer object.
 */
Pointer.create = function()
{
	this.events.create();
};

/**
 * Dispose pointer events, should be called after the objects is no longer required.
 *
 * If not called leaves the window events created leaving a memory/code leak.
 */
Pointer.dispose = function()
{
	this.events.destroy();
};

export {Pointer};
