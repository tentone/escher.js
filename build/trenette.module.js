/**
 * EventManager is used to manager DOM events creationg and destruction in a single function call.
 *
 * It is used by objects to make it easier to add and remove events from global DOM objects.
 *
 * @class
 */
function EventManager()
{
	/**
	 * Stores all events in the manager, their target and callback.
	 * 
	 * Format [target, event, callback, active]
	 * 
	 * @type {Array}
	 */
	this.events = [];
}

/**
 * Add new event to the manager.
 *
 * @param {DOM} target Event target element.
 * @param {String} event Event name.
 * @param {Function} callback Callback function.
 */
EventManager.prototype.add = function(target, event, callback)
{
	this.events.push([target, event, callback, false]);
};

/**
 * Destroys this manager and remove all events.
 */
EventManager.prototype.clear = function()
{
	this.destroy();
	this.events = [];
};

/**
 * Creates all events in this manager.
 */
EventManager.prototype.create = function()
{
	for(var i = 0; i < this.events.length; i++)
	{
		var event = this.events[i];
		event[0].addEventListener(event[1], event[2]);
		event[3] = true;
	}
};

/**
 * Removes all events in this manager.
 */
EventManager.prototype.destroy = function()
{
	for(var i = 0; i < this.events.length; i++)
	{
		var event = this.events[i];
		event[0].removeEventListener(event[1], event[2]);
		event[3] = false;
	}
};

/** 
 * Class representing a 2D vector. A 2D vector is an ordered pair of numbers (labeled x and y), which can be used to represent points in space, directions, etc.
 *
 * @class
 */
function Vector2(x, y)
{
	this.x = x || 0;
	this.y = y || 0;
}

Vector2.prototype.set = function(x, y)
{
	this.x = x;
	this.y = y;
};

Vector2.prototype.setScalar = function(scalar)
{
	this.x = scalar;
	this.y = scalar;
};

Vector2.prototype.clone = function()
{
	return new Vector2(this.x, this.y);
};

Vector2.prototype.copy = function(v)
{
	this.x = v.x;
	this.y = v.y;
};

Vector2.prototype.add = function(v)
{
	this.x += v.x;
	this.y += v.y;
};

Vector2.prototype.addScalar = function(s)
{
	this.x += s;
	this.y += s;
};

Vector2.prototype.addVectors = function(a, b)
{
	this.x = a.x + b.x;
	this.y = a.y + b.y;
};

Vector2.prototype.addScaledVector = function(v, s)
{
	this.x += v.x * s;
	this.y += v.y * s;
};

Vector2.prototype.sub = function(v)
{
	this.x -= v.x;
	this.y -= v.y;
};

Vector2.prototype.subScalar = function(s)
{
	this.x -= s;
	this.y -= s;
};

Vector2.prototype.subVectors = function(a, b)
{
	this.x = a.x - b.x;
	this.y = a.y - b.y;
};

Vector2.prototype.multiply = function(v)
{
	this.x *= v.x;
	this.y *= v.y;
};

Vector2.prototype.multiplyScalar = function(scalar)
{
	this.x *= scalar;
	this.y *= scalar;
};

Vector2.prototype.divide = function(v)
{
	this.x /= v.x;
	this.y /= v.y;
};

Vector2.prototype.divideScalar = function(scalar)
{
	return this.multiplyScalar(1 / scalar);
};

Vector2.prototype.min = function(v)
{
	this.x = Math.min(this.x, v.x);
	this.y = Math.min(this.y, v.y);
};

Vector2.prototype.max = function(v)
{
	this.x = Math.max(this.x, v.x);
	this.y = Math.max(this.y, v.y);
};

Vector2.prototype.clamp = function(min, max)
{
	// assumes min < max, componentwise
	this.x = Math.max(min.x, Math.min(max.x, this.x));
	this.y = Math.max(min.y, Math.min(max.y, this.y));
};

Vector2.prototype.clampScalar = function(minVal, maxVal)
{
	this.x = Math.max(minVal, Math.min(maxVal, this.x));
	this.y = Math.max(minVal, Math.min(maxVal, this.y));
};

Vector2.prototype.clampLength = function(min, max)
{
	var length = this.length();

	return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
};

Vector2.prototype.floor = function()
{
	this.x = Math.floor(this.x);
	this.y = Math.floor(this.y);
};

Vector2.prototype.ceil = function()
{
	this.x = Math.ceil(this.x);
	this.y = Math.ceil(this.y);
};

Vector2.prototype.round = function()
{
	this.x = Math.round(this.x);
	this.y = Math.round(this.y);
};

Vector2.prototype.roundToZero = function()
{
	this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
	this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
};

Vector2.prototype.negate = function()
{
	this.x = -this.x;
	this.y = -this.y;

	return this;
};

Vector2.prototype.dot = function(v)
{
	return this.x * v.x + this.y * v.y;
};

Vector2.prototype.cross = function(v)
{
	return this.x * v.y - this.y * v.x;
};

Vector2.prototype.lengthSq = function()
{
	return this.x * this.x + this.y * this.y;
};

Vector2.prototype.length = function()
{
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2.prototype.manhattanLength = function()
{
	return Math.abs(this.x) + Math.abs(this.y);
};

Vector2.prototype.normalize = function()
{
	return this.divideScalar(this.length() || 1);
};

/**
 * Computes the angle in radians with respect to the positive x-axis
 */
Vector2.prototype.angle = function()
{
	var angle = Math.atan2(this.y, this.x);

	if(angle < 0)
	{
		angle += 2 * Math.PI;
	}
	
	return angle;
};

Vector2.prototype.distanceTo = function(v)
{
	return Math.sqrt(this.distanceToSquared(v));
};

Vector2.prototype.distanceToSquared = function(v)
{
	var dx = this.x - v.x;
	var dy = this.y - v.y;

	return dx * dx + dy * dy;
};

Vector2.prototype.manhattanDistanceTo = function(v)
{
	return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
};

Vector2.prototype.setLength = function(length)
{
	return this.normalize().multiplyScalar(length);
};

Vector2.prototype.lerp = function(v, alpha)
{
	this.x += (v.x - this.x) * alpha;
	this.y += (v.y - this.y) * alpha;
};

Vector2.prototype.lerpVectors = function(v1, v2, alpha)
{
	return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
};

Vector2.prototype.equals = function(v)
{
	return ((v.x === this.x) && (v.y === this.y));
};

Vector2.prototype.fromArray = function(array, offset)
{
	if(offset === undefined) offset = 0;

	this.x = array[offset];
	this.y = array[offset + 1];
};

Vector2.prototype.toArray = function(array, offset)
{
	if(array === undefined) array = [];
	if(offset === undefined) offset = 0;

	array[offset] = this.x;
	array[offset + 1] = this.y;

	return array;
};

Vector2.prototype.rotateAround = function(center, angle)
{
	var c = Math.cos(angle);
	var s = Math.sin(angle);

	var x = this.x - center.x;
	var y = this.y - center.y;

	this.x = x * c - y * s + center.x;
	this.y = x * s + y * c + center.y;
};

/**
 * 2D 3x2 transformation matrix, applied to the canvas elements.
 *
 * @class
 */
function Matrix(values)
{
	if(values !== undefined)
	{
		this.m = values;
	}
	else
	{
		this.identity();
	}
}

/**
 * Copy the content of another matrix and store in this one.
 */
Matrix.prototype.copy = function(mat)
{
	this.m = mat.m.slice(0);
};

/**
 * Create a new matrix object with a copy of the content of this one.
 */
Matrix.prototype.clone = function()
{
	return new Matrix(this.m.slice(0))
};

/**
 * Reset this matrix to indentity.
 */
Matrix.prototype.identity = function()
{
	this.m = [1, 0, 0, 1, 0, 0];
};

/**
 * Multiply another matrix by this one and store the result.
 *
 * @param mat Matrix array.
 */
Matrix.prototype.multiply = function(mat)
{
	var m0 = this.m[0] * mat.m[0] + this.m[2] * mat.m[1];
	var m1 = this.m[1] * mat.m[0] + this.m[3] * mat.m[1];
	var m2 = this.m[0] * mat.m[2] + this.m[2] * mat.m[3];
	var m3 = this.m[1] * mat.m[2] + this.m[3] * mat.m[3];
	var m4 = this.m[0] * mat.m[4] + this.m[2] * mat.m[5] + this.m[4];
	var m5 = this.m[1] * mat.m[4] + this.m[3] * mat.m[5] + this.m[5];
	
	this.m = [m0, m1, m2, m3, m4, m5];
};

/**
 * Premultiply another matrix by this one and store the result.
 *
 * @param mat Matrix array to multiply.
 */
Matrix.prototype.premultiply = function(mat)
{
	var m0 = mat.m[0] * this.m[0] + mat.m[2] * this.m[1];
	var m1 = mat.m[1] * this.m[0] + mat.m[3] * this.m[1];
	var m2 = mat.m[0] * this.m[2] + mat.m[2] * this.m[3];
	var m3 = mat.m[1] * this.m[2] + mat.m[3] * this.m[3];
	var m4 = mat.m[0] * this.m[4] + mat.m[2] * this.m[5] + mat.m[4];
	var m5 = mat.m[1] * this.m[4] + mat.m[3] * this.m[5] + mat.m[5];
	
	this.m = [m0, m1, m2, m3, m4, m5];
};

/**
 * Compose this transformation matrix with position scale and rotation and origin point.
 */
Matrix.prototype.compose = function(px, py, sx, sy, ox, oy, a)
{
	this.m = [1, 0, 0, 1, px, py];

	if(a !== 0)
	{		
		var c = Math.cos(a);
		var s = Math.sin(a);
		this.multiply(new Matrix([c, s, -s, c, 0, 0]));
	}

	if(ox !== 0 || oy !== 0)
	{	
		this.multiply(new Matrix([1, 0, 0, 1, -ox, -oy]));
	}

	if(sx !== 1 || sy !== 1)
	{
		this.scale(sx, sy);
	}
};

/**
 * Apply translation to this matrix.
 */
Matrix.prototype.translate = function(x, y)
{
	this.m[4] += this.m[0] * x + this.m[2] * y;
	this.m[5] += this.m[1] * x + this.m[3] * y;
};

/**
 * Apply rotation to this matrix.
 *
 * @param angle Angle in radians.
 */
Matrix.prototype.rotate = function(rad)
{
	var c = Math.cos(rad);
	var s = Math.sin(rad);

	var m11 = this.m[0] * c + this.m[2] * s;
	var m12 = this.m[1] * c + this.m[3] * s;
	var m21 = this.m[0] * -s + this.m[2] * c;
	var m22 = this.m[1] * -s + this.m[3] * c;

	this.m[0] = m11;
	this.m[1] = m12;
	this.m[2] = m21;
	this.m[3] = m22;
};

/**
 * Apply scale to this matrix.
 */
Matrix.prototype.scale = function(sx, sy)
{
	this.m[0] *= sx;
	this.m[1] *= sx;
	this.m[2] *= sy;
	this.m[3] *= sy;
};

/**
 * Set the position of the transformation matrix.
 */
Matrix.prototype.setPosition = function(x, y)
{
	this.m[4] = x;
	this.m[5] = y;
};

/**
 * Get the scale from the transformation matrix.
 */
Matrix.prototype.getScale = function()
{
	return new Vector2(this.m[0], this.m[3]);
};

/**
 * Get the position from the transformation matrix.
 */
Matrix.prototype.getPosition = function()
{
	return new Vector2(this.m[4], this.m[5]);
};

/**
 * Apply skew to this matrix.
 */
Matrix.prototype.skew = function(radianX, radianY)
{
	this.multiply(new Matrix([1, Math.tan(radianY), Math.tan(radianX), 1, 0, 0]));
};

/**
 * Get the matrix determinant.
 */
Matrix.prototype.determinant = function()
{
	return 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
};

/**
 * Get the inverse matrix.
 */
Matrix.prototype.getInverse = function()
{
	var d = this.determinant();

	return new Matrix([this.m[3] * d, -this.m[1] * d, -this.m[2] * d, this.m[0] * d, d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]), d * (this.m[1] * this.m[4] - this.m[0] * this.m[5])]);
};

/**
 * Transform a point using this matrix.
 */
Matrix.prototype.transformPoint = function(p)
{
	var px = p.x * this.m[0] + p.y * this.m[2] + this.m[4];
	var py = p.x * this.m[1] + p.y * this.m[3] + this.m[5];

	return new Vector2(px, py);
};

/**
 * Set a canvas context to use this transformation.
 */
Matrix.prototype.setContextTransform = function(context)
{
	context.setTransform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
};

/**
 * Transform on top of the current context transformation.
 */
Matrix.prototype.tranformContext = function(context)
{
	context.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
};

Matrix.prototype.cssTransform = function()
{
	return "matrix(" + this.m[0] + "," + this.m[1] + "," + this.m[2] + "," + this.m[3] + "," + this.m[4] + "," + this.m[5] + ")";
};

/**
 * Class to implement UUID generation methods.
 *
 * @class
 */
function UUID(){}

/**
 * Generate new random UUID v4 as string.
 *
 * http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 *
 * @static
 */
UUID.generate = (function ()
{
	var lut = [];

	for(var i = 0; i < 256; i++)
	{
		lut[i] = (i < 16 ? "0" : "") + (i).toString(16);
	}

	return function generateUUID()
	{
		var d0 = Math.random() * 0XFFFFFFFF | 0;
		var d1 = Math.random() * 0XFFFFFFFF | 0;
		var d2 = Math.random() * 0XFFFFFFFF | 0;
		var d3 = Math.random() * 0XFFFFFFFF | 0;

		var uuid = lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + "-" +
			lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + "-" + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + "-" +
			lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + "-" + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
			lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];

		return uuid.toUpperCase();
	};
})();

/**
 * Base 2D object class, implements all the object positioning and scalling features.
 *
 * @class
 */
function Object2D()
{	
	/**
	 * UUID of the object.
	 */
	this.uuid = UUID.generate(); 

	/**
	 * List of children objects attached to the object.
	 */
	this.children = [];

	/**
	 * Parent object, the object position is affected by its parent position.
	 */
	this.parent = null;

	/**
	 * Position of the object.
	 */
	this.position = new Vector2(0, 0);

	/**
	 * Origin of the object used as point of rotation.
	 */
	this.origin = new Vector2(0, 0);

	/**
	 * Scale of the object.
	 */
	this.scale = new Vector2(1, 1);

	/**
	 * Rotation of the object relative to its center.
	 */
	this.rotation = 0.0;

	/**
	 * Indicates if the object is visible.
	 */
	this.visible = true;

	/**
	 * Layer of this object, objects are sorted by layer value.
	 *
	 * Lower layer value is draw first.
	 */
	this.layer = 0;

	/**
	 * Local transformation matrix applied to the object. 
	 */
	this.matrix = new Matrix();

	/**
	 * Global transformation matrix multiplied by the parent matrix.
	 *
	 * Used to transform the object before projecting into screen coordinates.
	 */
	this.globalMatrix = new Matrix();

	/**
	 * Inverse of the global matrix.
	 *
	 * Used to convert pointer input points into object coordinates.
	 */
	this.inverseGlobalMatrix = new Matrix();

	/**
	 * Masks being applied to this object.
	 *
	 * Multiple masks can be used simultaneously.
	 */
	this.masks = [];

	/**
	 * If true the matrix is updated before rendering the object.
	 */
	this.matrixNeedsUpdate = true;

	/**
	 * Indicates if its possible to drag the object around.
	 *
	 * If true the onPointerDrag callback is used to update the state of the object.
	 */
	this.draggable = false;

	/**
	 * Indicates if this object uses pointer events.
	 *
	 * Can be set false to skip the pointer interaction events.
	 */
	this.pointerEvents = true;

	/**
	 * Flag to indicate wheter this objet ignores the viewport transformation.
	 */
	this.ignoreViewport = false;

	/**
	 * Flag to indicate if the context of canvas should be saved before render.
	 */
	this.saveContextState = true;

	/**
	 * Flag to indicate if the context of canvas should be restored after render.
	 */
	this.restoreContextState = true;

	/**
	 * Flag indicating if the pointer is inside of the element.
	 *
	 * Used to control object event.
	 */
	this.pointerInside = false;

	/**
	 * Flag to indicate if the object is currently being dragged.
	 */
	this.beingDragged = false;
}

/**
 * Traverse the object tree and run a function for all objects.
 *
 * @param callback Callback function that receives the object as parameter.
 */
Object2D.prototype.traverse = function(callback)
{
	callback(this);

	var children = this.children;

	for(var i = 0; i < children.length; i++)
	{
		children[i].traverse(callback);
	}
};

/**
 * Attach a children to the object.
 *
 * @param object Object to attach to this object.
 */ 
Object2D.prototype.add = function(object)
{
	object.parent = this;
	this.children.push(object);
};

/**
 * Remove object from the children list.
 *
 * @param object Object to be removed.
 */
Object2D.prototype.remove = function(object)
{
	var index = this.children.indexOf(object);
	if(index !== -1)
	{
		this.children[index].parent = null;
		this.children.splice(index, 1);
	}
};

/**
 * Check if a point is inside of the object.
 */
Object2D.prototype.isInside = function(point)
{
	return false;
};

/**
 * Update the transformation matrix of the object.
 */
Object2D.prototype.updateMatrix = function(context)
{
	if(this.matrixNeedsUpdate)
	{
		this.matrix.compose(this.position.x, this.position.y, this.scale.x, this.scale.y, this.origin.x, this.origin.y, this.rotation);
		this.globalMatrix.copy(this.matrix);

		if(this.parent !== null)
		{	
			this.globalMatrix.premultiply(this.parent.globalMatrix);
		}

		this.inverseGlobalMatrix = this.globalMatrix.getInverse();
		//this.matrixNeedsUpdate = false;
	}
};

/**
 * Apply the transform to the rendering context.
 *
 * It is assumed that the viewport transform is pre-applied to the context.
 *
 * Can also be used for pre rendering logic.
 *
 * @param {CanvasContext} context Canvas 2d drawing context.
 * @param {Viewport} viewport Viewport applied to the canvas.
 */
Object2D.prototype.transform = function(context, viewport)
{
	this.globalMatrix.tranformContext(context);
};

/**
 * Draw the object into the canvas.
 *
 * Has to be implemented by underlying classes.
 *
 * @param {CanvasContext} context Canvas 2d drawing context.
 * @param {Viewport} viewport Viewport applied to the canvas.
 * @param {DOM} canvas DOM canvas element where the content is being drawn.
 */
Object2D.prototype.draw = function(context, viewport, canvas){};

/**
 * Callback method called every time before the object is draw into the canvas.
 *
 * Can be used to run preparation code, move the object, etc.
 */
Object2D.prototype.onUpdate = null;

/**
 * Callback method called when the pointer enters the object.
 *
 * Receives (pointer, viewport) as arguments.
 */
Object2D.prototype.onPointerEnter = null;

/**
 * Callback method called when the was inside of the object and leaves the object.
 *
 * Receives (pointer, viewport) as arguments.
 */
Object2D.prototype.onPointerLeave = null;

/**
 * Callback method while the pointer is over (inside) of the object.
 *
 * Receives (pointer, viewport) as arguments.
 */
Object2D.prototype.onPointerOver = null;

/**
 * Callback method while the object is being dragged across the screen.
 *
 * Receives (pointer, viewport, delta) as arguments. Delta is the movement of the pointer already translated into local object coordinates.
 */
Object2D.prototype.onPointerDrag = function(pointer, viewport, delta)
{
	this.position.add(delta);
};

/**
 * Callback method called while the pointer button is pressed.
 *
 * Receives (pointer, viewport) as arguments.
 */
Object2D.prototype.onButtonPressed = null;

/**
 * Callback method called when the pointer button is pressed down (single time).
 */
Object2D.prototype.onButtonDown = null;

/**
 * Callback method called when the pointer button is released (single time).
 */
Object2D.prototype.onButtonUp = null;

/**
 * Key is used by Keyboard, Pointer, etc, to represent a key state.
 *
 * @class
*/
function Key()
{
	/**
	 * Indicates if this key is currently pressed.
	 */
	this.pressed = false;

	/**
	 * Indicates if this key was just pressed.
	 */
	this.justPressed = false;
	
	/**
	 * Indicates if this key was just released.
	 */
	this.justReleased = false;
}


Key.DOWN = -1;
Key.UP = 1;
Key.RESET = 0;

Key.prototype.constructor = Key;

/**
 * Update Key status based on new key state.
 */
Key.prototype.update = function(action)
{
	this.justPressed = false;
	this.justReleased = false;

	if(action === Key.DOWN)
	{
		if(this.pressed === false)
		{
			this.justPressed = true;
		}
		this.pressed = true;
	}
	else if(action === Key.UP)
	{
		if(this.pressed)
		{
			this.justReleased = true;
		}
		this.pressed = false;
	}
	else if(action === Key.RESET)
	{
		this.justReleased = false;
		this.justPressed = false;
	}
};

/**
 * Set this key attributes manually.
 */
Key.prototype.set = function(justPressed, pressed, justReleased)
{
	this.justPressed = justPressed;
	this.pressed = pressed;
	this.justReleased = justReleased;
};

/**
 * Reset key to default values.
*/
Key.prototype.reset = function()
{
	this.justPressed = false;
	this.pressed = false;
	this.justReleased = false;
};

/**
 * Pointer instance for input in sync with the running 3D application.
 *
 * The pointer object provided by scripts is automatically updated by the runtime handler.
 * 
 * @class
 * @param {DOM} domElement DOM element to craete the pointer events.
 * @param {Boolean} dontInitialize If true the pointer events are not created.
 */
function Pointer(domElement)
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
	 */
	this.keys = new Array(5);

	/**
	 * Pointer position inside of the window (coordinates in window space).
	 */
	this.position = new Vector2(0, 0);

	/**
	 * Pointer movement (coordinates in window space).
	 */
	this.delta = new Vector2(0, 0);

	/**
	 * Pointer scroll wheel movement.
	 */
	this.wheel = 0;
	
	/**
	 * Indicates a button of the pointer was double clicked.
	 */
	this.doubleClicked = new Array(5);

	/**
	 * DOM element where to attach the pointer events.
	 */
	this.domElement = (domElement !== undefined) ? domElement : window;

	/**
	 * Canvas attached to this pointer instance used to calculate position and delta in element space coordinates.
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
 */
Pointer.LEFT = 0;

/**
 * Middle pointer button.
 */
Pointer.MIDDLE = 1;

/**
 * Right pointer button.
 */
Pointer.RIGHT = 2;

/**
 * Back pointer navigation button.
 */
Pointer.BACK = 3;

/**
 * Forward pointer navigation button.
 */
Pointer.FORWARD = 4;

/**
 * Element to be used for coordinates calculation relative to that canvas.
 * 
 * @param {DOM} canvas Canvas to be attached to the Pointer instance
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
 * Automatically called by the runtime.
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
 * Automatically called by the runtime.
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
 * Create pointer events.
 */
Pointer.create = function()
{
	this.events.create();
};

/**
 * Dispose pointer events.
 */
Pointer.dispose = function()
{
	this.events.destroy();
};

/**
 * The renderer is resposible for drawing the structure into the canvas element.
 *
 * Its also resposible for managing the canvas state.
 *
 * @class
 */
function Renderer(canvas)
{
	/**
	 * Canvas DOM element, has to be managed by the user.
	 */
	this.canvas = canvas;

	/**
	 * Canvas 2D rendering context used to draw content.
	 */
	this.context = canvas.getContext("2d");
	this.context.imageSmoothingEnabled = true;
	this.context.globalCompositeOperation = "source-over";

	/**
	 * Pointer input handler object.
	 */
	this.pointer = new Pointer();
	this.pointer.setCanvas(canvas);

	/**
	 * Indicates if the canvas should be automatically cleared on each new frame.
	 */
	this.autoClear = true;
}

/**
 * Creates a infinite render loop to render the group into a viewport each frame.
 *
 * The render loop cannot be destroyed.
 *
 * @param {Object2D} group Group to be rendererd.
 * @param {Viewport} viewport Viewport into the objects.
 * @param {Function} onUpdate Function called before rendering the frame.
 */
Renderer.prototype.createRenderLoop = function(group, viewport, onUpdate)
{
	var self = this;
	
	function loop()
	{
		if(onUpdate !== undefined)
		{
			onUpdate();
		}

		self.update(group, viewport);
		requestAnimationFrame(loop);
	}

	loop();
};

/**
 * Update the renderer state, update the input handlers, calculate the object and viewport transformation matrices.
 *
 * Render the object using the viewport into a canvas element.
 *
 * The canvas state is saved and restored for each individual object, ensuring that the code of one object does not affect another one.
 *
 * Should be called at a fixed rate preferably using the requestAnimationFrame() method, its also possible to use the createRenderLoop() method, that automatically creates a infinite render loop.
 *
 * @param object Object to be updated.
 * @param viewport Viewport to be updated (should be the one where the objects will be rendered after).
 */
Renderer.prototype.update = function(object, viewport)
{
	// Get objects to be rendered
	var objects = [];
	object.traverse(function(child)
	{
		if(child.visible)
		{
			objects.push(child);
		}
	});

	// Sort objects by layer
	objects.sort(function(a, b)
	{
		return b.layer - a.layer;
	});

	// Pointer object update
	var pointer = this.pointer;
	pointer.update();

	// Viewport transform matrix
	viewport.updateControls(pointer);
	viewport.updateMatrix();

	// Project pointer coordinates
	var point = pointer.position.clone();
	var viewportPoint = viewport.inverseMatrix.transformPoint(point);

	// Object pointer events
	for(var i = 0; i < objects.length; i++)
	{
		var child = objects[i];
		
		//Process the
		if(child.pointerEvents)
		{
			var childPoint = child.inverseGlobalMatrix.transformPoint(child.ignoreViewport ? point : viewportPoint);

			// Check if the pointer pointer is inside
			if(child.isInside(childPoint))
			{
				// Pointer enter
				if(!child.pointerInside && child.onPointerEnter !== null)
				{			
					child.onPointerEnter(pointer, viewport);
				}

				// Pointer over
				if(child.onPointerOver !== null)
				{
					child.onPointerOver(pointer, viewport);
				}

				// Pointer pressed
				if(pointer.buttonPressed(Pointer.LEFT) && child.onButtonPressed !== null)
				{	
					child.onButtonPressed(pointer, viewport);
				}

				// Just released
				if(pointer.buttonJustReleased(Pointer.LEFT) && child.onButtonUp !== null)
				{	
					child.onButtonUp(pointer, viewport);
				}

				// Pointer just pressed
				if(pointer.buttonJustPressed(Pointer.LEFT))
				{
					if(child.onButtonDown !== null)
					{
						child.onButtonDown(pointer, viewport);
					}

					// Drag object and break to only start a drag operation on the top element.
					if(child.draggable)
					{
						child.beingDragged = true;
						break;
					}
				}

				child.pointerInside = true;
			}
			else if(child.pointerInside)
			{
				// Pointer leave
				if(child.onPointerLeave !== null)
				{
					child.onPointerLeave(pointer, viewport);
				}

				child.pointerInside = false;
			}

			// Stop object drag
			if(pointer.buttonJustReleased(Pointer.LEFT))
			{	
				if(child.draggable)
				{
					child.beingDragged = false;
				}
			}
		}
	}

	// Object drag events and update logic
	for(var i = 0; i < objects.length; i++)
	{
		var child = objects[i];

		// Pointer drag event
		if(child.beingDragged)
		{	
			var lastPosition = pointer.position.clone();
			lastPosition.sub(pointer.delta);

			var positionWorld =  viewport.inverseMatrix.transformPoint(pointer.position);
			var lastWorld =  viewport.inverseMatrix.transformPoint(lastPosition);

			// Mouse delta in world coordinates
			positionWorld.sub(lastWorld);

			if(child.onPointerDrag !== null)
			{
				child.onPointerDrag(pointer, viewport, positionWorld);
			}
		}

		// On update
		if(child.onUpdate !== null)
		{
			child.onUpdate();
		}
	}

	// Update transformation matrices
	object.traverse(function(child)
	{
		child.updateMatrix();
	});
	
	// Sort objects by layer
	objects.sort(function(a, b)
	{
		return a.layer - b.layer;
	});
	
	this.context.setTransform(1, 0, 0, 1, 0, 0);
	
	// Clear canvas content
	if(this.autoClear)
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	// Render into the canvas
	for(var i = 0; i < objects.length; i++)
	{	
		if(objects[i].isMask)
		{
			continue;
		}

		if(objects[i].saveContextState)
		{
			this.context.save();
		}

		// Apply all masks
		var masks = objects[i].masks;
		for(var j = 0; j < masks.length; j++)
		{
			if(!masks[j].ignoreViewport)
			{
				viewport.matrix.setContextTransform(this.context);
			}

			masks[j].clip(this.context, viewport, this.canvas);
		}

		// Set the viewport transform
		if(!objects[i].ignoreViewport)
		{
			viewport.matrix.setContextTransform(this.context);
		}

		// Apply the object transform to the canvas context
		objects[i].transform(this.context, viewport, this.canvas);
		objects[i].draw(this.context, viewport, this.canvas);

		if(objects[i].restoreContextState)
		{
			this.context.restore();
		}
	}
};

/**
 * Used to indicate how the user views the content inside of the canvas.
 *
 * @class
 */
function Viewport()
{
	/**
	 * UUID of the object.
	 */
	this.uuid = UUID.generate(); 

	/**
	 * Position of the object.
	 */
	this.position = new Vector2(0, 0);

	/**
	 * Scale of the object.
	 */
	this.scale = 1.0;

	/**
	 * Rotation of the object relative to its center.
	 */
	this.rotation = 0.0;

	/**
	 * Local transformation matrix applied to the object. 
	 */
	this.matrix = new Matrix();

	/**
	 * Inverse of the local transformation matrix.
	 */
	this.inverseMatrix = new Matrix();

	/**
	 * If true the matrix is updated before rendering the object.
	 */
	this.matrixNeedsUpdate = true;

	/**
	 * Flag to indicate if the viewport should move when scalling.
	 *
	 * For some application its easier to focus the target if the viewport moves to the pointer location while scalling.
	 */
	this.moveOnScale = true;
}

/**
 * Update the viewport controls using the pointer object.
 */
Viewport.prototype.updateControls = function(pointer)
{	
	if(pointer.wheel !== 0)
	{
		this.scale -= pointer.wheel * 1e-3 * this.scale;

		if(this.moveOnScale)
		{	
			var speed = pointer.wheel / this.scale;
			var halfWidth = pointer.canvas.width / 2;
			var halfWeight = pointer.canvas.height / 2;

			this.position.x += ((pointer.position.x - halfWidth) / halfWidth) * speed;
			this.position.y += ((pointer.position.y - halfWeight) / halfWeight) * speed;
		}
	}

	if(pointer.buttonPressed(Pointer.RIGHT))
	{
		this.position.x += pointer.delta.x;
		this.position.y += pointer.delta.y;
	}
};

/**
 * Calculate and update the viewport transformation matrix.
 */
Viewport.prototype.updateMatrix = function()
{
	if(this.matrixNeedsUpdate)
	{
		this.matrix.compose(this.position.x, this.position.y, this.scale, this.scale, 0, 0, this.rotation);
		this.inverseMatrix = this.matrix.getInverse();
		//this.matrixNeedsUpdate = false;
	}
};

/**
 * Box is described by a minimum and maximum points.
 *
 * Can be used for collision detection with points and other boxes.
 *
 * @class
 */
function Box2(min, max)
{
	this.min = (min !== undefined) ? min : new Vector2();
	this.max = (max !== undefined) ? max : new Vector2();
}

/**
 * Set the box values.
 */
Box2.prototype.set = function(min, max)
{
	this.min.copy(min);
	this.max.copy(max);

	return this;
};

/**
 * Set the box from a list of Vector2 points.
 */
Box2.prototype.setFromPoints = function(points)
{
	this.min = new Vector2(+Infinity, +Infinity);
	this.max = new Vector2(-Infinity, -Infinity);

	for(var i = 0, il = points.length; i < il; i++)
	{
		this.expandByPoint(points[i]);
	}

	return this;
};

/** 
 * Set the box minimum and maximum from center point and size.
 */
Box2.prototype.setFromCenterAndSize = function(center, size)
{
	var v1 = new Vector2();
	var halfSize = v1.copy(size).multiplyScalar(0.5);
	this.min.copy(center).sub(halfSize);
	this.max.copy(center).add(halfSize);

	return this;
};

/**
 * Clone the box into a new object.
 */
Box2.prototype.clone = function()
{
	var box = new Box2();
	box.copy(this);
	return box;
};

/**
 * Copy the box value from another box.
 */
Box2.prototype.copy = function(box)
{
	this.min.copy(box.min);
	this.max.copy(box.max);
};

/**
 * Check if the box is empty (size equals zero or is negative).
 *
 * The box size is condireded valid on two negative axis.
 */
Box2.prototype.isEmpty = function()
{

	return (this.max.x < this.min.x) || (this.max.y < this.min.y);
};

/**
 * Calculate the center point of the box.
 */
Box2.prototype.getCenter = function(target)
{
	return this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
};

/**
 * Get the size of the box.
 */
Box2.prototype.getSize = function(target)
{
	return this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min);
};

/**
 * Expand the box to contain a new point.
 */
Box2.prototype.expandByPoint = function(point)
{
	this.min.min(point);
	this.max.max(point);

	return this;
};

/**
 * Expand the box by adding a border with the vector size.
 *
 * Vector is subtracted from min and added to the max points.
 */
Box2.prototype.expandByVector = function(vector)
{
	this.min.sub(vector);
	this.max.add(vector);
};

/**
 * Expand the box by adding a border with the scalar value.
 */
Box2.prototype.expandByScalar = function(scalar)
{
	this.min.addScalar(-scalar);
	this.max.addScalar(scalar);
};

/**
 * Check if the box contains a point inside.
 *
 * @param {Vector2} point
 * @return {boolean} True if the box contains point.
 */
Box2.prototype.containsPoint = function(point)
{
	return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y ? false : true;
};

/**
 * Check if the box fully contains another box inside (different from intersects box).
 *
 * Only returns true if the box is fully contained.
 *
 * @param {Box2} box
 * @return {boolean} True if the box contains box.
 */
Box2.prototype.containsBox = function(box)
{
	return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y;
};

/**
 * Check if two boxes intersect each other, using 4 splitting planes to rule out intersections.
 * 
 * @param {Box2} box
 * @return {boolean} True if the boxes intersect each other.
 */
Box2.prototype.intersectsBox = function(box)
{
	return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y ? false : true;
};

Box2.prototype.clampPoint = function(point, target)
{
	return target.copy(point).clamp(this.min, this.max);
};

/**
 * Calculate the distance to a point.
 *
 * @param {Vector2} point
 */
Box2.prototype.distanceToPoint = function(point)
{
	var v = new Vector2();
	var clampedPoint = v.copy(point).clamp(this.min, this.max);
	return clampedPoint.sub(point).length();
};

/**
 * Make a intersection between this box and another box.
 *
 * Store the result in this object.
 *
 * @param {Box2} box
 */
Box2.prototype.intersect = function(box)
{
	this.min.max(box.min);
	this.max.min(box.max);
};

/**
 * Make a union between this box and another box.
 *
 * Store the result in this object.
 *
 * @param {Box2} box
 */
Box2.prototype.union = function(box)
{
	this.min.min(box.min);
	this.max.max(box.max);
};

/**
 * Translate the box by a offset value, adds the offset to booth min and max.
 *
 * @param {Vector2} offset
 */
Box2.prototype.translate = function(offset)
{
	this.min.add(offset);
	this.max.add(offset);
};

/**
 * Checks if two boxes are equal.
 *
 * @param {Box2} box
 * @return {boolean} True if the two boxes are equal.
 */
Box2.prototype.equals = function(box)
{
	return box.min.equals(this.min) && box.max.equals(this.max);
};

/**
 * A mask can be used to set the drawing region.
 *
 * Masks are treated as objects their shape is used to filter other objects shape.
 *
 * Multiple mask objects can be active simulatenously, they have to be attached to the object mask list to filter the render region.
 *
 * @class
 */
function Mask()
{
	Object2D.call(this);
}

Mask.prototype = Object.create(Object2D.prototype);

Mask.prototype.isMask = true;

/**
 * Clip the canvas context, to ensure that next objects being drawn are cliped to the path stored here.
 *
 * @param {CanvasContext} context Canvas 2d drawing context.
 * @param {Viewport} viewport Viewport applied to the canvas.
 * @param {DOM} canvas DOM canvas element where the content is being drawn.
 */
Mask.prototype.clip = function(context, viewport, canvas){};

/**
 * Box mask can be used to clear a box mask region.
 *
 * It will limit the drwaing region to this box.
 *
 * @class
 * @extends {Mask}
 */
function BoxMask()
{
	Mask.call(this);

	/**
	 * Box object containing the size of the object.
	 */
	this.box = new Box2(new Vector2(-50, -35), new Vector2(50, 35));

	/**
	 * If inverted the mask considers the outside of the box instead of the inside.
	 */
	this.invert = false;
}

BoxMask.prototype = Object.create(Mask.prototype);

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

/**
 * Circle object draw a circular object, into the canvas.
 *
 * @class
 */
function Circle()
{
	Object2D.call(this);

	/**
	 * Radius of the circle.
	 */
	this.radius = 10.0;

	/**
	 * Color of the circle border line.
	 */
	this.strokeStyle = "#000000";

	/**
	 * Background color of the circle.
	 */
	this.fillStyle = "#FFFFFF";
}

Circle.prototype = Object.create(Object2D.prototype);

Circle.prototype.isInside = function(point)
{
	return point.length() <= this.radius;
};

Circle.prototype.onPointerEnter = function(pointer, viewport)
{
	this.fillStyle = "#CCCCCC";
};

Circle.prototype.onPointerLeave = function(pointer, viewport)
{
	this.fillStyle = "#FFFFFF";
};

Circle.prototype.draw = function(context, viewport, canvas)
{
	context.fillStyle = this.fillStyle;

	context.beginPath();
	context.arc(0, 0, this.radius, 0, 2 * Math.PI);
	context.fill();

	context.lineWidth = 1;
	context.strokeStyle = this.strokeStyle;

	context.beginPath();
	context.arc(0, 0, this.radius, 0, 2 * Math.PI);
	context.stroke();
};

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

/**
 * Box object draw a box.
 *
 * @class
 */
function Box()
{
	Object2D.call(this);

	/**
	 * Box object containing the size of the object.
	 */
	this.box = new Box2(new Vector2(-50, -35), new Vector2(50, 35));

	/**
	 * Color of the box border line.
	 */
	this.strokeStyle = "#000000";

	/**
	 * Background color of the box.
	 */
	this.fillStyle = "#FFFFFF";
}

Box.prototype = Object.create(Object2D.prototype);

Box.prototype.onPointerEnter = function(pointer, viewport)
{
	this.fillStyle = "#CCCCCC";
};

Box.prototype.onPointerLeave = function(pointer, viewport)
{
	this.fillStyle = "#FFFFFF";
};

Box.prototype.isInside = function(point)
{
	return this.box.containsPoint(point);
};

Box.prototype.draw = function(context, viewport, canvas)
{
	var width = this.box.max.x - this.box.min.x;
	var height = this.box.max.y - this.box.min.y;

	context.fillStyle = this.fillStyle;
	context.fillRect(this.box.min.x, this.box.min.y, width, height);

	context.lineWidth = 1;
	context.strokeStyle = this.strokeStyle;
	context.strokeRect(this.box.min.x, this.box.min.y, width, height);
};

/**
 * Line object draw a line from one point to another.
 *
 * @class
 */
function Line()
{
	Object2D.call(this);

	/**
	 * Initial point of the line.
	 *
	 * Can be equal to the position object of another object. (Making it automatically follow that object.)
	 */
	this.from = new Vector2();

	/**
	 * Final point of the line.
	 *
	 * Can be equal to the position object of another object. (Making it automatically follow that object.)
	 */
	this.to = new Vector2();

	/**
	 * Color of the line.
	 */
	this.strokeStyle = "#000000";

	/**
	 * Dash line pattern to be used, is empty draws a solid line.
	 */
	this.dashPattern = [5, 5];

	/**
	 * Line width.
	 */
	this.lineWidth = 1;
}

Line.prototype = Object.create(Object2D.prototype);

Line.prototype.draw = function(context, viewport, canvas)
{
	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.strokeStyle;
	context.setLineDash(this.dashPattern);
	
	context.beginPath();
	context.moveTo(this.from.x, this.from.y);
	context.lineTo(this.to.x, this.to.y);
	context.stroke();
};

/**
 * Text element, used to draw text into the canvas.
 *
 * @class
 */
function Text()
{
	Object2D.call(this);

	/**
	 * Text value.
	 */
	this.text = "";

	/**
	 * Font of the text.
	 */
	this.font = "16px Arial";

	/**
	 * Color (style) of the text.
	 */
	this.color = "#000000";

	/**
	 * Text align property.
	 */
	this.textAlign = "center";
}

Text.prototype = Object.create(Object2D.prototype);

Text.prototype.draw = function(context, viewport, canvas)
{
	context.font = this.font;
	context.textAlign = this.textAlign;
	context.fillStyle = this.color;

	context.fillText(this.text, 0, 0);
};

/**
 * Image object is used to draw an image from URL.
 *
 * @class
 * @param {string} [src] Source URL of the image.
 */
function Image(src)
{
	Object2D.call(this);
	
	/**
	 * Box object containing the size of the object.
	 */
	this.box = new Box2();

	/**
	 * Image source DOM element.
	 */
	this.image = document.createElement("img");

	if(src !== undefined)
	{
		this.setImage(src);
	}
}

Image.prototype = Object.create(Object2D.prototype);

/**
 * Set the image of the object.
 *
 * Automatically sets the box size to match the image.
 *
 * @param {string} src Source URL of the image.
 */
Image.prototype.setImage = function(src)
{
	var self = this;

	this.image.onload = function()
	{
		self.box.min.set(0, 0);
		self.box.max.set(this.naturalWidth, this.naturalHeight);
	};
	this.image.src = src;
};

Image.prototype.isInside = function(point)
{
	return this.box.containsPoint(point);
};

Image.prototype.draw = function(context, viewport, canvas)
{
	context.drawImage(this.image, 0, 0, this.image.naturalWidth, this.image.naturalHeight, this.box.min.x, this.box.min.y, this.box.max.x - this.box.min.x, this.box.max.y - this.box.min.y);
};

/**
 * A DOM object transformed using CSS3D to ver included in the graph.
 *
 * DOM objects always stay on top of everything else, mouse events are not supported for these.
 *
 * Use the normal DOM events for interaction.
 *
 * @class
 * @param parent Parent DOM element that contains the drawing canvas.
 * @param type Type of the DOM element (e.g. "div", "p", ...)
 */
function DOM(parent, type)
{
	Object2D.call(this);

	/**
	 * DOM element contained by this object.
	 */
	this.element = document.createElement("div");
	this.element.style.transformStyle = "preserve-3d";
	this.element.style.position = "absolute";
	this.element.style.top = "0px";
	this.element.style.bottom = "0px";
	this.element.style.transformOrigin = "0px 0px";
	this.element.style.overflow = "auto";
	parent.appendChild(this.element);
	
	/**
	 * Size of the DOM element (in world coordinates).
	 */
	this.size = new Vector2(100, 100);
}

DOM.prototype = Object.create(Object2D.prototype);

DOM.prototype.draw = function(context, viewport, canvas)
{
	// CSS trasnformation matrix
	var projection = viewport.matrix.clone();
	projection.multiply(this.globalMatrix);
	this.element.style.transform = projection.cssTransform();

	// Size of the element
	this.element.style.width = this.size.x + "px";
	this.element.style.height = this.size.y + "px";
};

/**
 * Pattern object draw a image repeated as a pattern.
 *
 * Its similar to the Image class but the image can be repeat infinitly.
 *
 * @class
 */
function Pattern(src)
{
	Object2D.call(this);

	/**
	 * Box object containing the size of the object.
	 */
	this.box = new Box2();

	/**
	 * Image source DOM element.
	 */
	this.image = document.createElement("img");

	/**
	 * A DOMString indicating how to repeat the pattern image.
	 */
	this.repetition = "repeat";

	if(src !== undefined)
	{
		this.setImage(src);
	}
}

Pattern.prototype = Object.create(Object2D.prototype);

/**
 * Set the image of the object.
 *
 * Automatically sets the box size to match the image.
 */
Pattern.prototype.setImage = function(src)
{
	var self = this;

	this.image.onload = function()
	{
		self.box.min.set(0, 0);
		self.box.max.set(this.naturalWidth, this.naturalHeight);
	};
	this.image.src = src;
};

Pattern.prototype.isInside = function(point)
{
	return this.box.containsPoint(point);
};

Pattern.prototype.draw = function(context, viewport, canvas)
{
	var width = this.box.max.x - this.box.min.x;
	var height = this.box.max.y - this.box.min.y;

	var pattern = context.createPattern(this.image, this.repetition);
	//pattern.setTransform();

	context.fillStyle = pattern;
	context.fillRect(this.box.min.x, this.box.min.y, width, height);
};

export { Box, Box2, BoxMask, Circle, DOM, EventManager, Helpers, Image, Key, Line, Mask, Matrix, Object2D, Pattern, Pointer, Renderer, Text, UUID, Vector2, Viewport };
