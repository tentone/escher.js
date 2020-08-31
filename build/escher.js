(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.Escher = {}));
}(this, (function (exports) { 'use strict';

	/**
	 * EventManager is used to manager DOM events creating and destruction in a single function call.
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
	 * @param {Element} target Event target element.
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
	 * @param {number} x
	 * @param {number} y
	 */
	function Vector2(x, y)
	{
		this.x = x || 0;
		this.y = y || 0;
	}

	/**
	 * Set vector x and y values.
	 *
	 * @param {number} x
	 * @param {number} y
	 */
	Vector2.prototype.set = function(x, y)
	{
		this.x = x;
		this.y = y;
	};

	/**
	 * Set a scalar value into the x and y values.
	 */
	Vector2.prototype.setScalar = function(scalar)
	{
		this.x = scalar;
		this.y = scalar;
	};

	/**
	 * Create a clone of this vector object.
	 */
	Vector2.prototype.clone = function()
	{
		return new Vector2(this.x, this.y);
	};

	/**
	 * Copy the content of another vector into this one.
	 *
	 * @param {Vector2} v
	 */
	Vector2.prototype.copy = function(v)
	{
		this.x = v.x;
		this.y = v.y;
	};

	/**
	 * Add the content of another vector to this one.
	 *
	 * @param {Vector2} v
	 */
	Vector2.prototype.add = function(v)
	{
		this.x += v.x;
		this.y += v.y;
	};

	/**
	 * Add a scalar value to booth vector components.
	 *
	 * @param {number} s
	 */
	Vector2.prototype.addScalar = function(s)
	{
		this.x += s;
		this.y += s;
	};

	/** 
	 * Add two vectors and store the result in this vector.
	 *
	 * @param {Vector2} a
	 * @param {Vector2} b
	 */
	Vector2.prototype.addVectors = function(a, b)
	{
		this.x = a.x + b.x;
		this.y = a.y + b.y;
	};

	/**
	 * Scale a vector components and add the result to this vector.
	 *
	 * @param {Vector2} v
	 * @param {number} s
	 */
	Vector2.prototype.addScaledVector = function(v, s)
	{
		this.x += v.x * s;
		this.y += v.y * s;
	};

	/**
	 * Subtract the content of another vector to this one.
	 *
	 * @param {Vector2} v
	 */
	Vector2.prototype.sub = function(v)
	{
		this.x -= v.x;
		this.y -= v.y;
	};

	/**
	 * Subtract a scalar value to booth vector components.
	 *
	 * @param {number} s
	 */
	Vector2.prototype.subScalar = function(s)
	{
		this.x -= s;
		this.y -= s;
	};

	/** 
	 * Subtract two vectors and store the result in this vector.
	 *
	 * @param {Vector2} a
	 * @param {Vector2} b
	 */
	Vector2.prototype.subVectors = function(a, b)
	{
		this.x = a.x - b.x;
		this.y = a.y - b.y;
	};

	/**
	 * Multiply the content of another vector to this one.
	 *
	 * @param {Vector2} v
	 */
	Vector2.prototype.multiply = function(v)
	{
		this.x *= v.x;
		this.y *= v.y;
	};

	/**
	 * Multiply a scalar value by booth vector components.
	 *
	 * @param {number} scalar
	 */
	Vector2.prototype.multiplyScalar = function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
	};


	/**
	 * Divide the content of another vector from this one.
	 *
	 * @param {Vector2} v
	 */
	Vector2.prototype.divide = function(v)
	{
		this.x /= v.x;
		this.y /= v.y;
	};

	/**
	 * Divide a scalar value by booth vector components.
	 *
	 * @param {number} s
	 */
	Vector2.prototype.divideScalar = function(scalar)
	{
		return this.multiplyScalar(1 / scalar);
	};

	/**
	 * Set the minimum of x and y coordinates between two vectors.
	 *
	 * X is set as the min between this vector and the other vector. 
	 *
	 * @param {Vector2} v
	 */
	Vector2.prototype.min = function(v)
	{
		this.x = Math.min(this.x, v.x);
		this.y = Math.min(this.y, v.y);
	};

	/**
	 * Set the maximum of x and y coordinates between two vectors.
	 *
	 * X is set as the max between this vector and the other vector. 
	 *
	 * @param {Vector2} v
	 */
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

	/**
	 * Round the vector coordinates to integer by flooring to the smaller integer.
	 */ 
	Vector2.prototype.floor = function()
	{
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
	};

	/**
	 * Round the vector coordinates to integer by ceiling to the bigger integer.
	 */ 
	Vector2.prototype.ceil = function()
	{
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
	};

	/**
	 * Round the vector coordinates to their closest integer.
	 */
	Vector2.prototype.round = function()
	{
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
	};

	/**
	 * Negate the coordinates of this vector.
	 */
	Vector2.prototype.negate = function()
	{
		this.x = -this.x;
		this.y = -this.y;

		return this;
	};

	/**
	 * Dot multiplication between this vector and another vector.
	 *
	 * @param {Vector2} vector
	 * @return {number} Result of the dot multiplication.
	 */
	Vector2.prototype.dot = function(v)
	{
		return this.x * v.x + this.y * v.y;
	};

	/**
	 * Cross multiplication between this vector and another vector.
	 *
	 * @param {Vector2} vector
	 * @return {number} Result of the cross multiplication.
	 */
	Vector2.prototype.cross = function(v)
	{
		return this.x * v.y - this.y * v.x;
	};

	/**
	 * Squared length of the vector.
	 *
	 * Faster for comparions.
	 */
	Vector2.prototype.lengthSq = function()
	{
		return this.x * this.x + this.y * this.y;
	};

	/**
	 * Length of the vector.
	 */
	Vector2.prototype.length = function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	/**
	 * Manhattan length of the vector.
	 */
	Vector2.prototype.manhattanLength = function()
	{
		return Math.abs(this.x) + Math.abs(this.y);
	};

	/**
	 * Normalize the vector (make it length one).
	 */
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

	/**
	 * Distance between two vector positions.
	 */
	Vector2.prototype.distanceTo = function(v)
	{
		return Math.sqrt(this.distanceToSquared(v));
	};

	/**
	 * Distance between two vector positions squared.
	 *
	 * Faster for comparisons.
	 */
	Vector2.prototype.distanceToSquared = function(v)
	{
		var dx = this.x - v.x;
		var dy = this.y - v.y;

		return dx * dx + dy * dy;
	};

	/**
	 * Manhattan distance between two vector positions.
	 */
	Vector2.prototype.manhattanDistanceTo = function(v)
	{
		return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
	};

	/**
	 * Scale the vector to have a defined length value.
	 */
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

	/**
	 * Check if two vectors are equal.
	 *
	 * @param {Vector2} v
	 */
	Vector2.prototype.equals = function(v)
	{
		return ((v.x === this.x) && (v.y === this.y));
	};

	/**
	 * Set vector value from array [x, y].
	 *
	 * The vector can be converted to array using the toArray() method.
	 *
	 * @param {number[]} array
	 */
	Vector2.prototype.fromArray = function(array)
	{
		this.set(array[0], array[1]);
	};

	/**
	 * Convert this vector to an array. Useful for serialization and storage.
	 *
	 * Values stored as [x, y].
	 *
	 * @return {number[]} Array containing the values of the vector.
	 */
	Vector2.prototype.toArray = function()
	{
		return [this.x, this.y];
	};

	/**
	 * Rotate the vector around a central point.
	 *
	 * @param {Vector2} center
	 * @param {number} angle
	 */
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
	 * 2D 3x2 transformation matrix, used to represent linear geometric transformations over objects.
	 *
	 * The values of the matrix are stored as numeric array. The matrix can be applied to the canvas or DOM elements using CSS transforms.
	 *
	 * @class
	 * @param {number[]} values Array of matrix values by row, needs to have exactly 6 values.
	 */
	function Matrix(values)
	{
		if(values !== undefined)
		{
			/**
			 * Array that contains the matrix data by row. This matrix should have 6 values.
			 *
			 * Matrix can be directly edited by accessing this attribute.
			 *
			 * @type {number[]}
			 */
			this.m = values;
		}
		else
		{
			this.identity();
		}
	}

	/**
	 * Copy the content of another matrix and store in this one.
	 *
	 * @param {Matrix} mat Matrix to copy values from.
	 */
	Matrix.prototype.copy = function(mat)
	{
		this.m = mat.m.slice(0);
	};

	/**
	 * Create a new matrix object with a copy of the content of this one.
	 *
	 * @return {Matrix} Copy of this matrix.
	 */
	Matrix.prototype.clone = function()
	{
		return new Matrix(this.m.slice(0))
	};

	/**
	 * Reset this matrix to identity.
	 */
	Matrix.prototype.identity = function()
	{
		this.m = [1, 0, 0, 1, 0, 0];
	};

	/**
	 * Multiply another matrix by this one and store the result.
	 *
	 * @param {Matrix} mat
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
	 * @param {Matrix} mat
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
	 *
	 * @param {number} px Position X
	 * @param {number} py Position Y
	 * @param {number} sx Scale X
	 * @param {number} sy Scale Y
	 * @param {number} ox Origin X (applied before scale and rotation)
	 * @param {number} oy Origin Y (applied before scale and rotation)
	 * @param {number} a Rotation angle (radians).
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

		if(sx !== 1 || sy !== 1)
		{
			this.scale(sx, sy);
		}

		if(ox !== 0 || oy !== 0)
		{	
			this.multiply(new Matrix([1, 0, 0, 1, -ox, -oy]));
		}
	};

	/**
	 * Apply translation to this matrix.
	 *
	 * Adds position over the transformation already stored in the matrix.
	 *
	 * @param {number} x
	 * @param {number} y
	 */
	Matrix.prototype.translate = function(x, y)
	{
		this.m[4] += this.m[0] * x + this.m[2] * y;
		this.m[5] += this.m[1] * x + this.m[3] * y;
	};

	/**
	 * Apply rotation to this matrix.
	 *
	 * @param {number} rad Angle to rotate the matrix in radians.
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
	 *
	 * @param {number} sx
	 * @param {number} sy
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
	 *
	 * @param {number} x
	 * @param {number} y
	 */
	Matrix.prototype.setPosition = function(x, y)
	{
		this.m[4] = x;
		this.m[5] = y;
	};

	/**
	 * Extract the scale from the transformation matrix.
	 *
	 * @return {Vector2} Scale of the matrix transformation.
	 */
	Matrix.prototype.getScale = function()
	{
		return new Vector2(this.m[0], this.m[3]);
	};

	/**
	 * Extract the position from the transformation matrix.
	 *
	 * @return {Vector2} Position of the matrix transformation.
	 */
	Matrix.prototype.getPosition = function()
	{
		return new Vector2(this.m[4], this.m[5]);
	};

	/**
	 * Apply skew to this matrix.
	 *
	 * @param {number} radianX
	 * @param {number} radianY
	 */
	Matrix.prototype.skew = function(radianX, radianY)
	{
		this.multiply(new Matrix([1, Math.tan(radianY), Math.tan(radianX), 1, 0, 0]));
	};

	/**
	 * Get the matrix determinant.
	 *
	 * @return {number} Determinant of this matrix.
	 */
	Matrix.prototype.determinant = function()
	{
		return 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
	};

	/**
	 * Get the inverse matrix.
	 *
	 * @return {Matrix} New matrix instance containing the inverse matrix.
	 */
	Matrix.prototype.getInverse = function()
	{
		var d = this.determinant();

		return new Matrix([this.m[3] * d, -this.m[1] * d, -this.m[2] * d, this.m[0] * d, d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]), d * (this.m[1] * this.m[4] - this.m[0] * this.m[5])]);
	};

	/**
	 * Transform a point using this matrix.
	 *
	 * @param {Vector2} p Point to be transformed.
	 * @return {Vector2} Transformed point.
	 */
	Matrix.prototype.transformPoint = function(p)
	{
		var px = p.x * this.m[0] + p.y * this.m[2] + this.m[4];
		var py = p.x * this.m[1] + p.y * this.m[3] + this.m[5];

		return new Vector2(px, py);
	};

	/**
	 * Set a canvas context to use this transformation.
	 *
	 * @param {CanvasRenderingContext2D} context Canvas context to apply this matrix transform.
	 */
	Matrix.prototype.setContextTransform = function(context)
	{
		context.setTransform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
	};

	/**
	 * Transform on top of the current context transformation.
	 *
	 * @param {CanvasRenderingContext2D} context Canvas context to apply this matrix transform.
	 */
	Matrix.prototype.tranformContext = function(context)
	{
		context.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
	};

	/**
	 * Generate a CSS transform string that can be applied to the transform style of any DOM element.
	 *
	 * @returns {string} CSS transform matrix.
	 */
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
	 * Generates a new random UUID v4 as string.
	 *
	 * @static
	 * @return {string} UUID generated as string.
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
	 * Base object class, implements all the object positioning and scaling features.
	 *
	 * Stores all the base properties shared between all objects as the position, transformation properties, children etc.
	 *
	 * Object2D object can be used as a group to the other objects drawn.
	 *
	 * @class
	 */
	function Object2D()
	{
		/**
		 * UUID of the object.
		 *
		 * @type {string}
		 */
		this.uuid = UUID.generate(); 

		/**
		 * List of children objects attached to the object.
		 *
		 * @type {Object2D[]}
		 */
		this.children = [];

		/**
		 * Parent object, the object position is affected by its parent position.
		 *
		 * @type {Object2D}
		 */
		this.parent = null;

		/**
		 * Depth level in the object tree, objects with higher depth are drawn on top.
		 *
		 * The layer value is considered first.
		 *
		 * @type {number}
		 */
		this.level = 0;

		/**
		 * Position of the object.
		 *
		 * The world position of the object is affected by its parent transform.
		 *
		 * @type {Vector2}
		 */
		this.position = new Vector2(0, 0);

		/**
		 * Origin of the object used as point of rotation.
		 *
		 * @type {Vector2}
		 */
		this.origin = new Vector2(0, 0);

		/**
		 * Scale of the object.
		 *
		 * The world scale of the object is affected by the parent transform.
		 *
		 * @type {Vector2}
		 */
		this.scale = new Vector2(1, 1);

		/**
		 * Rotation of the object relative to its center.
		 *
		 * The world rotation of the object is affected by the parent transform.
		 *
		 * @type {number}
		 */
		this.rotation = 0.0;

		/**
		 * Indicates if the object is visible.
		 *
		 * @type {boolean}
		 */
		this.visible = true;

		/**
		 * Layer of this object, objects are sorted by layer value.
		 *
		 * Lower layer value is draw first, higher layer value is drawn on top.
		 *
		 * @type {number}
		 */
		this.layer = 0;

		/**
		 * Local transformation matrix applied to the object.
		 *
		 * @type {Matrix}
		 */
		this.matrix = new Matrix();

		/**
		 * Global transformation matrix multiplied by the parent matrix.
		 *
		 * Used to transform the object before projecting into screen coordinates.
		 *
		 * @type {Matrix}
		 */
		this.globalMatrix = new Matrix();

		/**
		 * Inverse of the global (world) transform matrix.
		 *
		 * Used to convert pointer input points (viewport space) into object coordinates.
		 *
		 * @type {Matrix}
		 */
		this.inverseGlobalMatrix = new Matrix();

		/**
		 * Mask objects being applied to this object. Used to mask/subtract portions of this object when rendering.
		 *
		 * Multiple masks can be used simultaneously. Same mask might be reused for multiple objects.
		 *
		 * @type {Mask[]}
		 */
		this.masks = [];

		/**
		 * Indicates if the transform matrix should be automatically updated every frame.
		 *
		 * Set this false for better performance. But if you do so dont forget to set matrixNeedsUpdate every time that a transform attribute is changed.
		 *
		 * @type {boolean}
		 */
		this.matrixAutoUpdate = true;

		/**
		 * Indicates if the matrix needs to be updated, should be set true after changes to the object position, scale or rotation.
		 *
		 * The matrix is updated before rendering the object, after the matrix is updated this attribute is automatically reset to false.
		 *
		 * @type {boolean}
		 */
		this.matrixNeedsUpdate = true;

		/**
		 * Draggable controls if its possible to drag the object around. Set this true to enable dragging events on this object.
		 *
		 * The onPointerDrag callback is used to update the state of the object while being dragged, by default it just updates the object position.
		 *
		 * @type {boolean}
		 */
		this.draggable = false;

		/**
		 * Indicates if this object uses pointer events.
		 *
		 * Can be set false to skip the pointer interaction events, better performance if pointer events are not required.
		 *
		 * @type {boolean}
		 */
		this.pointerEvents = true;

		/**
		 * Flag to indicate whether this object ignores the viewport transformation.
		 *
		 * @type {boolean}
		 */
		this.ignoreViewport = false;

		/**
		 * Flag to indicate if the context of canvas should be saved before render.
		 *
		 * @type {boolean}
		 */
		this.saveContextState = true;

		/**
		 * Flag to indicate if the context of canvas should be restored after render.
		 *
		 * @type {boolean}
		 */
		this.restoreContextState = true;

		/**
		 * Flag indicating if the pointer is inside of the element.
		 *
		 * Used to control object event.
		 *
		 * @type {boolean}
		 */
		this.pointerInside = false;

		/**
		 * Flag to indicate if the object is currently being dragged.
		 *
		 * @type {boolean}
		 */
		this.beingDragged = false;

		/**
		 * Indicates if the object should be serialized or not as a child of another object.
		 *
		 * Used to prevent duplicate serialization data on custom objects. Should be set false for objects added on constructor.
		 *
		 * @type {boolean}
		 */
		this.serializable = true;
	}

	Object2D.prototype.constructor = Object2D;

	/**
	 * Type of the object, used for data serialization and/or checking the object type.
	 *
	 * The name used should match the object constructor name. But it is not required.
	 *
	 * If this type is from an external library you can add the library name to the object type name to prevent collisions.
	 *
	 * @type {string}
	 */
	Object2D.prototype.type = "Object2D";

	/**
	 * List of available object types known by the application. Stores the object constructor by object type.
	 *
	 * Newly created types should be introduced in this map for data serialization support.
	 *
	 * New object types should be added using the Object2D.register() method.
	 *
	 * @static
	 * @type {Map<string, Function>}
	 */
	Object2D.types = new Map([[Object2D.prototype.type, Object2D]]);

	/**
	 * Register a object type into the application. Associates the type string to the object constructor.
	 *
	 * Should be called for every new object class implemented if you want to be able to serialize and parse data.
	 *
	 * @param {Function} constructor Object constructor.
	 * @param {string} type Object type name.
	 */
	Object2D.register = function(constructor, type)
	{
		Object2D.types.set(type, constructor);
	};

	/**
	 * Check if a point in world coordinates intersects this object or its children and get a list of the objects intersected.
	 *
	 * @param {Vector2} point Point in world coordinates.
	 * @param {Object2D[]} list List of objects intersected passed to children objects recursively.
	 * @return {Object2D[]} List of object intersected by this point.
	 */
	Object2D.prototype.getWorldPointIntersections = function(point, list)
	{
		if(list === undefined)
		{
			list = [];
		}

		// Calculate the pointer position in the object coordinates
		var localPoint = this.inverseGlobalMatrix.transformPoint(point);
		if(this.isInside(localPoint))
		{
			list.push(this);
		}

		// Iterate trough the children
		for(var i = 0; i < this.children.length; i++)
		{
			this.children[i].getWorldPointIntersections(point, list);
		}

		return list;
	};

	/**
	 * Check if a point in world coordinates intersects this object or some of its children.
	 *
	 * @param {Vector2} point Point in world coordinates.
	 * @param {boolean} recursive If set to true it will also check intersections with the object children.
	 * @return {boolean} Returns true if the point in inside of the object.
	 */
	Object2D.prototype.isWorldPointInside = function(point, recursive)
	{
		// Calculate the pointer position in the object coordinates
		var localPoint = this.inverseGlobalMatrix.transformPoint(point);
		if(this.isInside(localPoint))
		{
			return true;
		}

		// Iterate trough the children
		if(recursive)
		{
			for(var i = 0; i < this.children.length; i++)
			{
				if(this.children[i].isWorldPointInside(point, true))
				{
					return true;
				}
			}
		}

		return false;
	};


	/**
	 * Destroy the object, removes it from the parent object.
	 */
	Object2D.prototype.destroy = function()
	{
		if(this.parent !== null)
		{
			this.parent.remove(this);
		}
	};

	/**
	 * Traverse the object tree and run a function for all objects.
	 *
	 * @param {Function} callback Callback function that receives the object as parameter.
	 */
	Object2D.prototype.traverse = function(callback)
	{
		callback(this);

		for(var i = 0; i < this.children.length; i++)
		{
			this.children[i].traverse(callback);
		}
	};

	/**
	 * Get a object from its children list by its UUID.
	 *
	 * @param {string} uuid UUID of the object to get.
	 * @return {Object2D} The object that has the UUID specified, null if the object was not found.
	 */
	Object2D.prototype.getChildByUUID = function(uuid)
	{
		var object = null;

		this.traverse(function(child)
		{
			if(child.uuid === uuid)
			{
				object = child;
			}
		});

		return object;
	};

	/**
	 * Attach a children to this object.
	 *
	 * The object is set as children of this object and the transformations applied to this object are traversed to its children.
	 *
	 * @param {Object2D} object Object to attach to this object.
	 */ 
	Object2D.prototype.add = function(object)
	{
		object.parent = this;
		object.level = this.level + 1;

		object.traverse(function(child)
		{
			if(child.onAdd !== null)
			{
				child.onAdd(this);
			}
		});

		this.children.push(object);
	};

	/**
	 * Remove object from the children list.
	 *
	 * @param {Object2D} children Object to be removed.
	 */
	Object2D.prototype.remove = function(children)
	{
		var index = this.children.indexOf(children);
		
		if(index !== -1)
		{
			var object = this.children[index];
			object.parent = null;
			object.level = 0;

			object.traverse(function(child)
			{
				if(child.onRemove !== null)
				{
					child.onRemove(this);
				}
			});

			this.children.splice(index, 1);
		}
	};

	/**
	 * Check if a point is inside of the object. Used by the renderer check for pointer collision (required for the object to properly process pointer events).
	 *
	 * Point should be in local object coordinates.
	 *
	 * To check if a point in world coordinates intersects the object the inverseGlobalMatrix should be applied to that point before calling this method.
	 *
	 * @param {Vector2} point Point in local object coordinates.
	 * @return {boolean} True if the point is inside of the object.
	 */
	Object2D.prototype.isInside = function(point)
	{
		return false;
	};

	/**
	 * Update the transformation matrix of the object.
	 *
	 * @param {CanvasRenderingContext2D} context Canvas 2d drawing context.
	 */
	Object2D.prototype.updateMatrix = function(context)
	{
		if(this.matrixAutoUpdate || this.matrixNeedsUpdate)
		{
			this.matrix.compose(this.position.x, this.position.y, this.scale.x, this.scale.y, this.origin.x, this.origin.y, this.rotation);
			this.globalMatrix.copy(this.matrix);

			if(this.parent !== null)
			{	
				this.globalMatrix.premultiply(this.parent.globalMatrix);
			}

			this.inverseGlobalMatrix = this.globalMatrix.getInverse();
			this.matrixNeedsUpdate = false;
		}
	};

	/**
	 * Apply the transform to the rendering context, it is assumed that the viewport transform is pre-applied to the context.
	 *
	 * This is called before style() and draw(). It can also be used for some pre-rendering logic.
	 *
	 * @param {CanvasRenderingContext2D} context Canvas 2d drawing context.
	 * @param {Viewport} viewport Viewport applied to the canvas.
	 * @param {Element} canvas DOM canvas element where the content is being drawn.
	 * @param {Renderer} renderer Renderer object being used to draw the object into the canvas.
	 */
	Object2D.prototype.transform = function(context, viewport, canvas, renderer)
	{
		this.globalMatrix.tranformContext(context);
	};

	/**
	 * Style is called right before draw() it should not draw any content into the canvas, all context styling should be applied here (colors, fonts, etc).
	 *
	 * The draw() and style() methods can be  useful for objects that share the same styling attributes but are drawing differently.
	 *
	 * Should be implemented by underlying classes.
	 *
	 * @param {CanvasRenderingContext2D} context Canvas 2d drawing context.
	 * @param {Viewport} viewport Viewport used to view the canvas content.
	 * @param {Element} canvas DOM canvas element where the content is being drawn.
	 */
	Object2D.prototype.style = null; // function(context, viewport, canvas){};

	/**
	 * Draw the object into the canvas, this is called transform() and style(), should be where the content is actually drawn into the canvas.
	 *
	 * Should be implemented by underlying classes.
	 *
	 * @param {CanvasRenderingContext2D} context Canvas 2d drawing context.
	 * @param {Viewport} viewport Viewport used to view the canvas content.
	 * @param {Element} canvas DOM canvas element where the content is being drawn.
	 */
	Object2D.prototype.draw = null; // function(context, viewport, canvas){};

	/**
	 * Callback method while the object is being dragged across the screen.
	 *
	 * By default is adds the delta value to the object position (making it follow the mouse movement).
	 *
	 * Delta is the movement of the pointer already translated into local object coordinates.
	 *
	 * To detect when the object drag stops the onPointerDragEnd() method can be used.
	 *
	 * @param {Pointer} pointer Pointer object that receives the user input.
	 * @param {Viewport} viewport Viewport where the object is drawn.
	 * @param {Vector2} delta Pointer movement diff in world space since the last frame.
	 * @param {Vector2} positionWorld Position of the dragging pointer in world coordinates.
	 */
	Object2D.prototype.onPointerDrag = function(pointer, viewport, delta, positionWorld)
	{
		this.position.add(delta);
	};

	/**
	 * Callback method called when the pointer drag start after the button was pressed
	 *
	 * @param {Pointer} pointer Pointer object that receives the user input.
	 * @param {Viewport} viewport Viewport where the object is drawn.
	 */
	Object2D.prototype.onPointerDragStart = null;

	/**
	 * Callback method called when the pointer drag ends after the button has been released.
	 *
	 * @param {Pointer} pointer Pointer object that receives the user input.
	 * @param {Viewport} viewport Viewport where the object is drawn.
	 */
	Object2D.prototype.onPointerDragEnd = null;

	/**
	 * Method called when the object its added to a parent.
	 *
	 * @param {Object2D} parent Parent object were it was added.
	 */
	Object2D.prototype.onAdd = null;

	/**
	 * Method called when the object gets removed from its parent
	 *
	 * @param {Object2D} parent Parent object from were the object is being removed.
	 */
	Object2D.prototype.onRemove = null;

	/**
	 * Callback method called every time before the object is draw into the canvas.
	 *
	 * Should be used to run object logic, any preparation code, move the object, etc.
	 *
	 * This method is called for every object before rendering.
	 */
	Object2D.prototype.onUpdate = null;

	/**
	 * Callback method called when the pointer enters the object.
	 *
	 * It is not called while the pointer is inside of the object, just on the first time that the pointer enters the object for that use onPointerOver()
	 *
	 * @param {Pointer} pointer Pointer object that receives the user input.
	 * @param {Viewport} viewport Viewport where the object is drawn.
	 */
	Object2D.prototype.onPointerEnter = null;

	/**
	 * Method called when the was inside of the object and leaves the object.
	 *
	 * @param {Pointer} pointer Pointer object that receives the user input.
	 * @param {Viewport} viewport Viewport where the object is drawn.
	 */
	Object2D.prototype.onPointerLeave = null;

	/**
	 * Method while the pointer is over (inside) of the object.
	 *
	 * @param {Pointer} pointer Pointer object that receives the user input.
	 * @param {Viewport} viewport Viewport where the object is drawn.
	 */
	Object2D.prototype.onPointerOver = null;

	/**
	 * Method called while the pointer button is pressed.
	 *
	 * @param {Pointer} pointer Pointer object that receives the user input.
	 * @param {Viewport} viewport Viewport where the object is drawn.
	 */
	Object2D.prototype.onButtonPressed = null;

	/**
	 * Method called while the pointer button is double clicked.
	 *
	 * @param {Pointer} pointer Pointer object that receives the user input.
	 * @param {Viewport} viewport Viewport where the object is drawn.
	 */
	Object2D.prototype.onDoubleClick = null;

	/**
	 * Callback method called when the pointer button is pressed down (single time).
	 *
	 * @param {Pointer} pointer Pointer object that receives the user input.
	 * @param {Viewport} viewport Viewport where the object is drawn.
	 */
	Object2D.prototype.onButtonDown = null;

	/**
	 * Method called when the pointer button is released (single time).
	 *
	 * @param {Pointer} pointer Pointer object that receives the user input.
	 * @param {Viewport} viewport Viewport where the object is drawn.
	 */
	Object2D.prototype.onButtonUp = null;

	/**
	 * Serialize the object data into a JSON object. That can be written into a file, sent using HTTP request etc.
	 *
	 * All required attributes to recreate the object in its current state should be stored. Relations between children should be stored by their UUID only.
	 *
	 * Data has to be parsed back into a usable object.
	 *
	 * @param {boolean} recursive If set false the children list is not serialized, otherwise all children are serialized.
	 * @return {Object} Serialized object data.
	 */
	Object2D.prototype.serialize = function(recursive)
	{
		var data = {
			uuid: this.uuid,
			type: this.type,
			position: this.position.toArray(),
			origin: this.origin.toArray(),
			scale: this.scale.toArray(),
			rotation: this.rotation,
			visible: this.visible,
			layer: this.layer,
			matrix: this.matrix.m,
			globalMatrix: this.globalMatrix.m,
			inverseGlobalMatrix: this.inverseGlobalMatrix.m,
			matrixAutoUpdate: this.matrixAutoUpdate,
			draggable: this.draggable,
			pointerEvents: this.pointerEvents,
			ignoreViewport: this.ignoreViewport,
			saveContextState: this.saveContextState,
			restoreContextState: this.restoreContextState,
			children: [],
			masks: []
		};

		if(recursive !== false)
		{
			for(var i = 0; i < this.children.length; i++)
			{
				if(this.children[i].serializable)
				{
					data.children.push(this.children[i].serialize());
				}
			}
		}

		for(var i = 0; i < this.masks.length; i++)
		{
			data.masks.push(this.masks[i].uuid);
		}

		return data;
	};

	/**
	 * Parse serialized object data and fill the object attributes.
	 *
	 * Implementations of this method should only load the attributes added to the structure, the based method already loads common attributes.
	 *
	 * Dont forget to register object types using the Object2D.register() method.
	 *
	 * @param {Object} data Object data loaded from JSON.
	 * @param {Object2D} root Root object being loaded can be used to get references to other objects.
	 */
	Object2D.prototype.parse = function(data, root)
	{
		this.uuid = data.uuid;
		this.position.fromArray(data.position);
		this.origin.fromArray(data.origin);
		this.scale.fromArray(data.scale);
		this.rotation = data.rotation;
		this.visible = data.visible;
		this.layer = data.layer;
		this.matrix = new Matrix(data.matrix);
		this.globalMatrix = new Matrix(data.globalMatrix);
		this.inverseGlobalMatrix = new Matrix(data.inverseGlobalMatrix);
		this.matrixAutoUpdate = data.matrixAutoUpdate;
		this.draggable = data.draggable;
		this.pointerEvents = data.pointerEvents;
		this.ignoreViewport = data.ignoreViewport;
		this.saveContextState = data.saveContextState;
		this.restoreContextState = data.restoreContextState;

		for(var i = 0; i < this.masks.length; i++)
		{
			data.masks.push(root.getChildByUUID(data.masks[i]));
		}
	};

	/**
	 * Create objects from serialized object data into the proper data structures.
	 *
	 * All objects should implement serialization methods to serialize and load data properly.
	 *
	 * First all objects instances are created to ensure that object trying to get references to other object can have the data accessible, only then the parse method is called.
	 *
	 * @static
	 * @param {Object} data Object data loaded from JSON.
	 * @return {Object2D} Parsed object data.
	 */
	Object2D.parse = function(data)
	{
		// List of objects created stored as pairs of object, data to be later parsed.
		var objects = [];

		// Parse all objects from the data object recursively and create the correct instances.
		function createObjectInstances(data)
		{
			if(!Object2D.types.has(data.type))
			{
				throw new Error("Object type " + data.type + " unknown. Cannot parse data.");
			}

			var Constructor = Object2D.types.get(data.type);
			var object = new Constructor();
			object.uuid = data.uuid;

			objects.push({object: object, data: data});

			for(var i = 0; i < data.children.length; i++)
			{
				object.add(createObjectInstances(data.children[i]));
			}

			return object;
		}

		var root = createObjectInstances(data);

		// Parse objects data
		for(var i = 0; i < objects.length; i++)
		{
			objects[i].object.parse(objects[i].data, root);
		}

		return root;
	};

	/**
	 * Key is used by Keyboard, Pointer, etc, to represent a key state.
	 *
	 * @class
	*/
	function Key()
	{
		/**
		 * Indicates if this key is currently pressed.
		 *
		 * @type {boolean}
		 */
		this.pressed = false;

		/**
		 * Indicates if this key was just pressed.
		 *
		 * @type {boolean}
		 */
		this.justPressed = false;
		
		/**
		 * Indicates if this key was just released.
		 *
		 * @type {boolean}
		 */
		this.justReleased = false;
	}

	/**
	 * Key down event.
	 *
	 * @type {number}
	 */
	Key.DOWN = -1;

	/**
	 * Key up event.
	 *
	 * @type {number}
	 */
	Key.UP = 1;

	/**
	 * Key reset event.
	 *
	 * @type {number}
	 */
	Key.RESET = 0;

	Key.prototype.constructor = Key;

	/**
	 * Update Key status based on new key state.
	 *
	 * @param {number} action Key action that was performed.
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
	 *
	 * @param {boolean} justPressed Indicates if the button was just pressed.
	 * @param {boolean} pressed Indicates if the button is currently being pressed.
	 * @param {boolean} justReleased Indicates if the button was just released.
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

	/**
	 * Viewport defines the user view into the content being rendered, similar to a camera it defines the size of the content, rotation and position of the content.
	 *
	 * The viewport can be moved, rotated and scaled to navigate the virtual canvas.
	 *
	 * @class
	 * @param {Element} canvas Canvas DOM element where the viewport is being rendered.
	 */
	function Viewport(canvas)
	{
		/**
		 * UUID of the object.
		 */
		this.uuid = UUID.generate(); 

		/**
		 * Canvas DOM element where the viewport is being rendered.
		 */
		this.canvas = canvas;

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
		 * Flag to indicate if the viewport should move when scaling.
		 *
		 * For some application its easier to focus the target if the viewport moves to the pointer location while scaling.
		 */
		this.moveOnScale = false;

		/**
		 * Value of the initial point of rotation if the viewport is being rotated.
		 *
		 * Is set to null when the viewport is not being rotated.
		 */
		this.rotationPoint = null;
	}

	/**
	 * Calculate and update the viewport transformation matrix.
	 *
	 * Also updates the inverse matrix of the viewport.
	 */
	Viewport.prototype.updateMatrix = function()
	{
		if(this.matrixNeedsUpdate)
		{
			this.matrix.m = [1, 0, 0, 1, this.position.x, this.position.y];

			if(this.rotation !== 0)
			{		
				var c = Math.cos(this.rotation);
				var s = Math.sin(this.rotation);
				this.matrix.multiply(new Matrix([c, s, -s, c, 0, 0]));
			}

			if(this.scale !== 1)
			{
				this.matrix.scale(this.scale, this.scale);
			}

			this.inverseMatrix = this.matrix.getInverse();
			this.matrixNeedsUpdate = false;
		}
	};

	/**
	 * Center the viewport relative to a object.
	 *
	 * The position of the object is used a central point, this method does not consider "box" attributes or other strucures in the object.
	 *
	 * @param {Object2D} object Object to be centered on the viewport.
	 * @param {Element} canvas Canvas element where the image is drawn.
	 */
	Viewport.prototype.centerObject = function(object, canvas)
	{
		var position = object.globalMatrix.transformPoint(new Vector2());
		position.multiplyScalar(-this.scale);
		position.x += canvas.width / 2;
		position.y += canvas.height / 2;

		this.position.copy(position);
		this.matrixNeedsUpdate = true;
	};

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
		 *
		 * @type {Viewport}
		 */
		this.viewport = viewport;

		/**
		 * Button used to drag and viewport around.
		 *
		 * On touch enabled devices the touch event is represented as a LEFT button.
		 *
		 * @type {number}
		 */
		this.dragButton = Pointer.RIGHT;

		/**
		 * Is set to true allow the viewport to be scalled.
		 *
		 * Scaling is performed using the pointer scroll.
		 *
		 * @type {boolean}
		 */
		this.allowScale = true;

		/**
		 * Flag to indicate if the viewport should move when scalling.
		 *
		 * For some application its easier to focus the target if the viewport moves to the pointer location while scalling.
		 *
		 * @type {boolean}
		 */
		this.moveOnScale = false;

		/**
		 * If true allows the viewport to be rotated.
		 *
		 * Rotation is performed by holding the RIGHT and LEFT pointer buttons and rotating around the initial point.
		 *
		 * @type {boolean}
		 */
		this.allowRotation = true;

		/**
		 * Value of the initial point of rotation if the viewport is being rotated.
		 *
		 * Is set to null when the viewport is not being rotated.
		 *
		 * @type {Vector2 | null}
		 */
		this.rotationPoint = null;

		/**
		 * Initial rotation of the viewport.
		 *
		 * @type {number}
		 */
		this.rotationInitial = 0;
	}

	/**
	 * Update the viewport controls using the pointer object.
	 *
	 * Should be called every frame before rendering.
	 *
	 * @param {Pointer} pointer Pointer used to control the viewport.
	 */
	ViewportControls.prototype.update = function(pointer)
	{	
		// Scale
		if(this.allowScale && pointer.wheel !== 0)
		{
			var scale = pointer.wheel * 1e-3 * this.viewport.scale;

			this.viewport.scale -= scale;
			this.viewport.matrixNeedsUpdate = true;

			// Move on scale
			if(this.moveOnScale && pointer.canvas !== null)
			{	
				this.viewport.updateMatrix();

				var pointerWorld = this.viewport.inverseMatrix.transformPoint(pointer.position);

				var centerWorld = new Vector2(pointer.canvas.width / 2.0, pointer.canvas.height / 2.0);
				centerWorld = this.viewport.inverseMatrix.transformPoint(centerWorld);

				var delta = pointerWorld.clone();
				delta.sub(centerWorld);
				delta.multiplyScalar(0.1);

				this.viewport.position.sub(delta);
				this.viewport.matrixNeedsUpdate = true;
			}
		}

		// Rotation
		if(this.allowRotation && pointer.buttonPressed(Pointer.RIGHT) && pointer.buttonPressed(Pointer.LEFT))
		{
			// Rotation pivot
			if(this.rotationPoint === null)
			{
				this.rotationPoint = pointer.position.clone();
				this.rotationInitial = this.viewport.rotation;
			}
			else
			{
				var point = pointer.position.clone();
				point.sub(this.rotationPoint);
				this.viewport.rotation = this.rotationInitial + point.angle();
				this.viewport.matrixNeedsUpdate = true;
			}
		}
		// Drag
		else
		{
			this.rotationPoint = null;

			if(pointer.buttonPressed(this.dragButton))
			{
				this.viewport.position.x += pointer.delta.x;
				this.viewport.position.y += pointer.delta.y;
				this.viewport.matrixNeedsUpdate = true;
			}
		}
	};

	/**
	 * Animation timer should be used to run the update and render loops of the application.
	 * 
	 * Underneat it uses the requestAnimationFrame() method that calls the function with the same rate as the screen refresh rate.
	 * 
	 * @class
	 * @param {Function} callback Timer callback function.
	 */
	function AnimationTimer(callback)
	{
		/**
		 * Task of the timer, executed at the timer defined rate.
		 * 
		 * @type {Function}
		 */
		this.callback = callback;

		/**
		 * Indicates if the timer is currently running, it is set to true on start and reset to false on stop.
		 * 
		 * @type {boolean}
		 */
		this.running = false;

		/**
		 * ID of the currently waiting timeout clock. Used to cancel the already request execution of the next clock tick.
		 * 
		 * @type {number}
		 */
		this.id = -1;
	}

	/**
	 * Start timer, is the timer is already running does not do anything.
	 */
	AnimationTimer.prototype.start = function()
	{
		if(this.running)
		{
			return;
		}

		this.running = true;

		var self = this;
		function loop()
		{
			self.callback();

			if(self.running)
			{
				self.id = requestAnimationFrame(loop);
			}
		}

		loop();
	};

	/**
	 * Stop animation timer, should be called when the render loop is no longer in use to prevent code/memory leaks.
	 *
	 * If the timer is not stopped the loop will keep running using processing power and consuming memory.
	 */
	AnimationTimer.prototype.stop = function()
	{
		this.running = false;
		cancelAnimationFrame(this.id);
	};

	/**
	 * The renderer is responsible for drawing the objects structure into the canvas element and manage its rendering state.
	 *
	 * Object are updated by the renderer before drawing, the renderer sorts the objects by layer, checks for pointer events and draw the objects into the screen.
	 *
	 * Input handling is also performed by the renderer (it is also used for the event handling).
	 *
	 * @class
	 * @param {Element} canvas Canvas to render the content to.
	 * @param {Object} options Renderer canvas options.
	 */
	function Renderer(canvas, options)
	{
		if(options === undefined)
		{
			options =
			{
				alpha: true,
				imageSmoothingEnabled: true,
				imageSmoothingQuality: "low",
				globalCompositeOperation: "source-over"
			};
		}

		/**
		 * Canvas DOM element, the user needs to manage the canvas state.
		 *
		 * The canvas size (width and height) should always match its actual display size (adjusted for the device pixel ratio).
		 *
		 * @type {Element}
		 */
		this.canvas = canvas;

		/**
		 * Division where DOM and SVG objects should be placed at. This division should be perfectly aligned whit the canvas element.
		 *
		 * If no division is defined the canvas parent element is used by default to place these objects.
		 *
		 * The DOM container to be used can be obtained using the getDomContainer() method.
		 *
		 * @type {Element}
		 */
		this.container = null;

		/**
		 * Canvas 2D rendering context used to draw content.
		 *
		 * The options passed thought the constructor are applied to the context created.
		 *
		 * @type {CanvasRenderingContext2D}
		 */
		this.context = this.canvas.getContext("2d", {alpha: options.alpha});
		this.context.imageSmoothingEnabled = options.imageSmoothingEnabled;
		this.context.imageSmoothingQuality = options.imageSmoothingQuality;
		this.context.globalCompositeOperation = options.globalCompositeOperation;

		/**
		 * Pointer input handler object, automatically updated by the renderer.
		 *
		 * The pointer is attached to the DOM window and to the canvas provided by the user.
		 *
		 * @type {Pointer}
		 */
		this.pointer = new Pointer(window, this.canvas);

		/**
		 * Indicates if the canvas should be automatically cleared before new frame is drawn.
		 *
		 * If set to false the user should clear the frame before drawing.
		 *
		 * @type {boolean}
		 */
		this.autoClear = true;
	}

	/**
	 * Get the DOM container to be used to store DOM and SVG objects.
	 *
	 * Can be set using the container attribute, by default the canvas parent element is used.
	 *
	 * @returns {Element} DOM element selected for objects.
	 */
	Renderer.prototype.getDomContainer = function()
	{
		return this.container !== null ? this.container : this.canvas.parentElement;
	};

	/**
	 * Creates a infinite render loop to render the group into a viewport each frame.
	 *
	 * Automatically creates a viewport controls object, used for the user to control the viewport.
	 *
	 * The render loop can be accessed trough the animation timer returned. Should be stopped when no longer necessary to prevent memory/code leaks.
	 *
	 * @param {Object2D} group Object to be rendered, alongside with all its children. Object2D can be used as a container to group objects.
	 * @param {Viewport} viewport Viewport into the scene.
	 * @param {Function} onUpdate Function called before rendering the frame, can be used for additional logic code. Object logic should be directly written in the update method of objects.
	 * @return {AnimationTimer} Animation timer created for this render loop. Should be stopped when no longer necessary.
	 */
	Renderer.prototype.createRenderLoop = function(group, viewport, onUpdate)
	{
		var self = this;

		var controls = new ViewportControls(viewport);
		var timer = new AnimationTimer(function()
		{
			if(onUpdate !== undefined)
			{
				onUpdate();
			}

			controls.update(self.pointer);
			self.update(group, viewport);
		});
		timer.start();

		return timer;
	};

	/**
	 * Dispose the renderer object, clears the pointer events attached to the window/canvas.
	 *
	 * Should be called if the renderer is no longer in use to prevent code/memory leaks.
	 */
	Renderer.prototype.dispose = function(group, viewport, onUpdate)
	{
		this.pointer.dispose();
	};

	/**
	 * Renders a object using a user defined viewport into a canvas element.
	 *
	 * Before rendering automatically updates the input handlers and calculates the objects/viewport transformation matrices.
	 *
	 * The canvas state is saved and restored for each individual object, ensuring that the code of one object does not affect another one.
	 *
	 * Should be called at a fixed rate preferably using the requestAnimationFrame() method, its also possible to use the createRenderLoop() method, that automatically creates a infinite render loop.
	 *
	 * @param object {Object2D} Object to be updated and drawn into the canvas, the Object2D should be used as a group to store all the other objects to be updated and drawn.
	 * @param viewport {Viewport} Viewport to be updated (should be the one where the objects will be rendered after).
	 */
	Renderer.prototype.update = function(object, viewport)
	{
		// Get objects to be rendered
		var objects = [];

		// Traverse object and get all objects into a list.
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
			if(b.layer === a.layer)
			{
				return b.level - a.level;
			}
			
			return b.layer - a.layer;
		});

		// Pointer object update
		var pointer = this.pointer;
		pointer.update();

		// Viewport transform matrix
		viewport.updateMatrix();

		// Project pointer coordinates
		var point = pointer.position.clone();
		var viewportPoint = viewport.inverseMatrix.transformPoint(point);

		// Object pointer events
		for(var i = 0; i < objects.length; i++)
		{
			var child = objects[i];
			
			//Process the object pointer events
			if(child.pointerEvents)
			{
				// Calculate the pointer position in the object coordinates
				var localPoint = child.inverseGlobalMatrix.transformPoint(child.ignoreViewport ? point : viewportPoint);

				// Check if the pointer pointer is inside
				if(child.isInside(localPoint))
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

					// Double click
					if(pointer.buttonDoubleClicked(Pointer.LEFT) && child.onDoubleClick !== null)
					{
						child.onDoubleClick(pointer, viewport);
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
							if(child.onPointerDragStart !== null)
							{
								child.onPointerDragStart(pointer, viewport);
							}
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
						// On drag end callback
						if(child.beingDragged === true && child.onPointerDragEnd !== null)
						{
							child.onPointerDragEnd(pointer, viewport);
						}
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
				if(child.onPointerDrag !== null)
				{
					var lastPosition = pointer.position.clone();
					lastPosition.sub(pointer.delta);

					// Get position and last position in world space to calculate world pointer movement
					var positionWorld = viewport.inverseMatrix.transformPoint(pointer.position);
					var lastWorld = viewport.inverseMatrix.transformPoint(lastPosition);

					// Pointer movement delta in world coordinates
					var delta = positionWorld.clone();
					delta.sub(lastWorld);

					child.onPointerDrag(pointer, viewport, delta, positionWorld);
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

		this.context.setTransform(1, 0, 0, 1, 0, 0);
		
		// Clear canvas content
		if(this.autoClear)
		{
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}

		// Render into the canvas
		for(var i = objects.length - 1; i >= 0; i--)
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

				masks[j].transform(this.context, viewport, this.canvas, this);
				masks[j].clip(this.context, viewport, this.canvas);
			}

			// Set the viewport transform
			if(!objects[i].ignoreViewport)
			{
				viewport.matrix.setContextTransform(this.context);
			}
			else if(masks.length > 0)
			{
				this.context.setTransform(1, 0, 0, 1, 0, 0);
			}

			// Apply the object transform to the canvas context
			objects[i].transform(this.context, viewport, this.canvas, this);

			// Style the canvas context
			if(objects[i].style !== null)
			{
				objects[i].style(this.context, viewport, this.canvas);
			}

			// Draw content into the canvas.
			if(objects[i].draw !== null)
			{
				objects[i].draw(this.context, viewport, this.canvas);
			}

			if(objects[i].restoreContextState)
			{
				this.context.restore();
			}
		}
	};

	/**
	 * Box is described by a minimum and maximum points.
	 *
	 * Can be used for collision detection with points and other boxes.
	 *
	 * @class
	 * @param {Vector2} min
	 * @param {Vector2} max
	 */
	function Box2(min, max)
	{
		this.min = (min !== undefined) ? min : new Vector2();
		this.max = (max !== undefined) ? max : new Vector2();
	}

	/**
	 * Set the box values.
	 *
	 * @param {Vector2} min
	 * @param {Vector2} max
	 */
	Box2.prototype.set = function(min, max)
	{
		this.min.copy(min);
		this.max.copy(max);

		return this;
	};

	/**
	 * Set the box from a list of Vector2 points.
	 *
	 * @param {Array} points
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
	 *
	 * @param {Vector2} center
	 * @param {Vector2} size
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
	 *
	 * Should be used when it it necessary to make operations to this box.
	 *
	 * @return {Box2} New box object with the copy of this object.
	 */
	Box2.prototype.clone = function()
	{
		var box = new Box2();
		box.copy(this);
		return box;
	};

	/**
	 * Copy the box value from another box.
	 *
	 * @param {Box2} point
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
	 *
	 * @return {boolean} True if the box is empty.
	 */
	Box2.prototype.isEmpty = function()
	{
		return (this.max.x < this.min.x) || (this.max.y < this.min.y);
	};

	/**
	 * Calculate the center point of the box.
	 *
	 * @param {Vector2} [target] Vector to store the result.
	 * @return {Vector2} Central point of the box.
	 */
	Box2.prototype.getCenter = function(target)
	{
		if(target === undefined)
		{
			target = new Vector2();
		}

		this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);

		return target;
	};

	/**
	 * Get the size of the box from its min and max points.
	 *
	 * @param {Vector2} [target] Vector to store the result.
	 * @return {Vector2} Vector with the calculated size.
	 */
	Box2.prototype.getSize = function(target)
	{
		if(target === undefined)
		{
			target = new Vector2();
		}

		this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min);

		return target;
	};

	/**
	 * Expand the box to contain a new point.
	 *
	 * @param {Vector2} point
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
	 *
	 * @param {Vector2} vector
	 */
	Box2.prototype.expandByVector = function(vector)
	{
		this.min.sub(vector);
		this.max.add(vector);
	};

	/**
	 * Expand the box by adding a border with the scalar value.
	 *
	 * @param {number} scalar
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
		return !(point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y);
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
		return !(box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y);
	};

	/**
	 * Calculate the distance to a point.
	 *
	 * @param {Vector2} point
	 * @return {number} Distance to point calculated.
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
	 * Store the box data into a numeric array.
	 *
	 * @return {number[]} Numeric array with box data min and max.
	 */
	Box2.prototype.toArray = function()
	{
		return [this.min.x, this.min.y, this.max.x, this.max.y];
	};

	/**
	 * Set box data min and max from numeric array.
	 *
	 * @param {number[]} array Numeric array with box data min and max.
	 */
	Box2.prototype.fromArray = function(array)
	{
		this.min.set(array[0], array[1]);
		this.max.set(array[2], array[3]);
	};

	/**
	 * A mask can be used to set the drawing region.
	 *
	 * Masks are treated as objects their shape is used to filter other objects shape.
	 *
	 * Multiple mask objects can be active simultaneously, they have to be attached to the object mask list to filter the render region.
	 *
	 * A mask objects is draw using the context.clip() method.
	 *
	 * @class
	 * @extends {Object2D}
	 */
	function Mask()
	{
		Object2D.call(this);
	}

	Mask.prototype = Object.create(Object2D.prototype);
	Mask.prototype.constructor = Mask;
	Mask.prototype.type = "Mask";
	Object2D.register(Mask, "Mask");
	Mask.prototype.isMask = true;

	/**
	 * Clip the canvas context. Define a clipping path and set the clip using the context.clip() method.
	 *
	 * Ensures that next objects being drawn are clipped to the path stored here.
	 *
	 * More information about canvas clipping https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip.
	 *
	 * @param {CanvasRenderingContext2D} context Canvas 2d drawing context.
	 * @param {Viewport} viewport Viewport applied to the canvas.
	 * @param {DOM} canvas DOM canvas element where the content is being drawn.
	 */
	Mask.prototype.clip = function(context, viewport, canvas){};

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

	/**
	 * Style represents in a generic way a style applied to canvas drawing.
	 *
	 * Some styles (e.g. gradients, patterns) required a context to be generated this provides a generic way to share styles between objects.
	 *
	 * @class
	 */
	function Style$1()
	{
	    /**
	     * Cached style object pre-generated from previous calls. To avoid regenerating the same style object every cycle.
	     *
	     * @type {string | CanvasGradient | CanvasPattern}
	     */
	    this.cache = null;
	    // TODO <USE THIS>

	    /**
	     * Indicates if the style object needs to be updated, should be used after applying changed to the style in order to generate a new object.
	     *
	     * @type {boolean}
	     */
	    this.needsUpdate = true;
	    // TODO <USE THIS>
	}

	/**
	 * Get generated style object from style data and the drawing context.
	 *
	 * @param {CanvasRenderingContext2D} context Context being used to draw the object.
	 * @return {string | CanvasGradient | CanvasPattern} Return the canvas style object generated.
	 */
	Style$1.prototype.get = function(context) {};

	/**
	 * Serialize the style to JSON object, called by the objects using these styles.
	 *
	 * @return {Object} Serialized style data.
	 */
	Style$1.prototype.serialize = function() {};

	/**
	 * Parse the style attributes from JSON object data created with the serialize() method.
	 *
	 * @param {Object} data Serialized style data.
	 */
	Style$1.prototype.parse = function(data) {};

	/**
	 * List of available style types known by the application. Stores the object constructor by object type.
	 *
	 * @static
	 * @type {Map<string, Function>}
	 */
	Style$1.types = new Map([]);

	/**
	 * Register a style type to be serializable. Associates the type string to the object constructor.
	 *
	 * @param {Function} constructor Style constructor.
	 * @param {string} type Style type name.
	 */
	Style$1.register = function(constructor, type)
	{
	    Style$1.types.set(type, constructor);
	};

	/**
	 * Parse style from JSON serialized data, created a style of the correct data type automatically and parses its data.
	 *
	 * @param data JSON serialized data.
	 * @returns {Style} Parsed style from the provided data.
	 */
	Style$1.parse = function (data)
	{
	    var style = new (Style$1.types.get(data.type))();
	    style.parse(data);
	    return style;
	};

	/**
	 * Simple solid color style represented and stored as a CSS color.
	 *
	 * @class
	 * @extends {Style}
	 * @param {string} color Color of the style, if undefined it is set to black.
	 */
	function ColorStyle(color)
	{
	    Style$1.call(this);

	    /**
	     * Color of this style object.
	     *
	     * @type {string}
	     */
	    this.color = color || "#000000";
	}

	ColorStyle.prototype = Object.create(Style$1.prototype);
	Style$1.register(ColorStyle, "Color");

	ColorStyle.prototype.get = function(context)
	{
	    return this.color;
	};

	ColorStyle.prototype.serialize = function()
	{
	    return {
	        type: "Color",
	        color: this.color
	    };
	};

	ColorStyle.prototype.parse = function(data)
	{
	    this.color = data.color;
	};

	/**
	 * Box object draw a rectangular object.
	 *
	 * Can be used as a base to implement other box objects, already implements collision for pointer events.
	 *
	 * @class
	 * @extends {Object2D}
	 */
	function Box()
	{
		Object2D.call(this);

		/**
		 * Box object containing the size of the object.
		 */
		this.box = new Box2(new Vector2(-50, -50), new Vector2(50, 50));

		/**
		 * Style of the object border line.
		 *
		 * If set null it is ignored.
		 */
		this.strokeStyle = new ColorStyle("#000000");

		/**
		 * Line width, only used if a valid strokeStyle is defined.
		 */
		this.lineWidth = 1;

		/**
		 * Background color of the box.
		 *
		 * If set null it is ignored.
		 *
		 * @param {Style}
		 */
		this.fillStyle = new ColorStyle("#FFFFFF");
	}

	Box.prototype = Object.create(Object2D.prototype);
	Box.prototype.constructor = Box;
	Box.prototype.type = "Box";
	Object2D.register(Box, "Box");

	Box.prototype.isInside = function(point)
	{
		return this.box.containsPoint(point);
	};

	Box.prototype.draw = function(context, viewport, canvas)
	{
		var width = this.box.max.x - this.box.min.x;
		var height = this.box.max.y - this.box.min.y;

		if(this.fillStyle !== null)
		{	
			context.fillStyle = this.fillStyle.get(context);
			context.fillRect(this.box.min.x, this.box.min.y, width, height);
		}

		if(this.strokeStyle !== null)
		{
			context.lineWidth = this.lineWidth;
			context.strokeStyle = this.strokeStyle.get(context);
			context.strokeRect(this.box.min.x, this.box.min.y, width, height);
		}
	};

	Box.prototype.serialize = function(recursive)
	{
		var data = Object2D.prototype.serialize.call(this, recursive);

		data.box = this.box.toArray();
		data.strokeStyle = this.strokeStyle !== null ? this.strokeStyle.serialize() : null;
		data.lineWidth = this.lineWidth;
		data.fillStyle = this.fillStyle !== null ? this.fillStyle.serialize() : null;

		return data;
	};

	Box.prototype.parse = function(data, root)
	{
		Object2D.prototype.parse.call(this, data, root);

		this.box.fromArray(data.box);
		this.strokeStyle = data.strokeStyle !== null ? Style$1.parse(data.strokeStyle) : null;
		this.lineWidth = data.lineWidth;
		this.fillStyle = data.fillStyle !== null ? Style$1.parse(data.fillStyle) : null;
	};

	/**
	 * Circle object draw a circular object, into the canvas.
	 *
	 * Can be used as a base to implement other circular objects, already implements the circle collision for pointer events.
	 *
	 * @class
	 * @extends {Object2D}
	 */
	function Circle()
	{
		Object2D.call(this);

		/**
		 * Radius of the circle.
		 */
		this.radius = 10.0;

		/**
		 * Style of the object border line.
		 *
		 * If set null it is ignored.
		 *
		 * @type {Style}
		 */
		this.strokeStyle = new ColorStyle("#000000");

		/**
		 * Line width, only used if a valid strokeStyle is defined.
		 *
		 * @type {number}
		 */
		this.lineWidth = 1;

		/**
		 * Background color of the circle.
		 *
		 * If set null it is ignored.
		 *
		 * @type {Style}
		 */
		this.fillStyle = new ColorStyle("#FFFFFF");
	}

	Circle.prototype = Object.create(Object2D.prototype);
	Circle.prototype.constructor = Circle;
	Circle.prototype.type = "Circle";
	Object2D.register(Circle, "Circle");

	Circle.prototype.isInside = function(point)
	{
		return point.length() <= this.radius;
	};

	Circle.prototype.draw = function(context, viewport, canvas)
	{
		context.beginPath();
		context.arc(0, 0, this.radius, 0, 2 * Math.PI);
		
		if(this.fillStyle !== null)
		{	
			context.fillStyle = this.fillStyle.get(context);
			context.fill();
		}

		if(this.strokeStyle !== null)
		{
			context.lineWidth = this.lineWidth;
			context.strokeStyle = this.strokeStyle.get(context);
			context.stroke();
		}
	};

	Circle.prototype.serialize = function(recursive)
	{
		var data = Object2D.prototype.serialize.call(this, recursive);

		data.radius = this.radius;
		data.strokeStyle = this.strokeStyle !== null ? this.strokeStyle.serialize() : null;
		data.lineWidth = this.lineWidth;
		data.fillStyle = this.fillStyle !== null ? this.fillStyle.serialize() : null;

		return data;
	};

	Circle.prototype.parse = function(data, root)
	{
		Object2D.prototype.parse.call(this, data, root);

		this.radius = data.radius;
		this.strokeStyle = data.strokeStyle !== null ? Style$1.parse(data.strokeStyle) : null;
		this.lineWidth = data.lineWidth;
		this.fillStyle = data.fillStyle !== null ? Style$1.parse(data.fillStyle) : null;
	};

	/**
	 * Line object draw a line from one point to another without any kind of interpolation.
	 *
	 * For drawing lines with interpolation check {BezierCurve}
	 *
	 * @class
	 * @extends {Object2D}
	 */
	function Line()
	{
		Object2D.call(this);

		/**
		 * Initial point of the line.
		 *
		 * Can be equal to the position object of another object. Making it automatically follow that object.
		 *
		 * @type {Vector2}
		 */
		this.from = new Vector2();

		/**
		 * Final point of the line.
		 *
		 * Can be equal to the position object of another object. Making it automatically follow that object.
		 *
		 * @type {Vector2}
		 */
		this.to = new Vector2();

		/**
		 * Dash line pattern to be used, if empty draws a solid line.
		 *
		 * Dash pattern is defined as the size of dashes as pairs of space with no line and with line.
		 *
		 * E.g if the dash pattern is [1, 2] we get 1 point with line, 2 without line repeat infinitelly.
		 *
		 * @type {number[]}
		 */
		this.dashPattern = [5, 5];

		/**
		 * Style of the object line.
		 *
		 * @type {Style}
		 */
		this.strokeStyle = new ColorStyle("#000000");

		/**
		 * Line width of the line.
		 *
		 * @type {number}
		 */
		this.lineWidth = 1;
	}

	Line.prototype = Object.create(Object2D.prototype);
	Line.prototype.constructor = Line;
	Line.prototype.type = "Line";
	Object2D.register(Line, "Line");

	Line.prototype.style = function(context, viewport, canvas)
	{
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.strokeStyle.get(context);
		context.setLineDash(this.dashPattern);
	};

	Line.prototype.draw = function(context, viewport, canvas)
	{
		context.beginPath();
		context.moveTo(this.from.x, this.from.y);
		context.lineTo(this.to.x, this.to.y);
		context.stroke();
	};

	Line.prototype.serialize = function(recursive)
	{
		var data = Object2D.prototype.serialize.call(this, recursive);

		data.from = this.from.toArray();
		data.to = this.to.toArray();
		data.dashPattern = this.dashPattern;
		data.strokeStyle = this.strokeStyle !== null ? this.strokeStyle.serialize() : null;
		data.lineWidth = this.lineWidth;

		return data;
	};

	Line.prototype.parse = function(data, root)
	{
		Object2D.prototype.parse.call(this, data, root);

		this.to.fromArray(data.to);
		this.from.fromArray(data.from);
		this.dashPattern = data.dashPattern;
		this.strokeStyle = data.strokeStyle !== null ? Style$1.parse(data.strokeStyle) : null;
		this.lineWidth = data.lineWidth;
	};

	/**
	 * Text element, used to draw single line text into the canvas.
	 *
	 * For multi line text with support for line break check {MultiLineText} object.
	 *
	 * @class
	 * @extends {Object2D}
	 */
	function Text()
	{
		Object2D.call(this);

		/**
		 * Text value displayed by this element.
		 *
		 * @type {string}
		 */
		this.text = "";

		/**
		 * Font of the text.
		 *
		 * @type {string}
		 */
		this.font = "16px Arial";

		/**
		 * Style of the object border line. If set null it is ignored.
		 *
		 * @type {Style}
		 */
		this.strokeStyle = null;

		/**
		 * Line width, only used if a valid strokeStyle is defined.
		 *
		 * @type {number}
		 */
		this.lineWidth = 1;

		/**
		 * CSS background color of the box. If set null it is ignored.
		 *
		 * @type {Style}
		 */
		this.fillStyle = new ColorStyle("#000000");

		/**
		 * Text align property. Same values as used for canvas text applies
		 *
		 * Check documentation at https://developer.mozilla.org/en-US/docs/Web/CSS/text-align for mode details about this property.
		 *
		 * @type {string}
		 */
		this.textAlign = "center";

		/**
		 * Text baseline defines the vertical position of the text relative to the imaginary line Y position. Same values as used for canvas text applies
		 *
		 * Check documentation at https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline for mode details about this property.
		 *
		 * @type {string}
		 */
		this.textBaseline = "middle";
	}

	Text.prototype = Object.create(Object2D.prototype);
	Text.prototype.constructor = Text;
	Text.prototype.type = "Text";
	Object2D.register(Text, "Text");

	Text.prototype.draw = function(context, viewport, canvas)
	{
		context.font = this.font;
		context.textAlign = this.textAlign;
		context.textBaseline = this.textBaseline;
		
		if(this.fillStyle !== null)
		{
			context.fillStyle = this.fillStyle.get(context);
			context.fillText(this.text, 0, 0);
		}

		if(this.strokeStyle !== null)
		{
			context.strokeStyle = this.strokeStyle.get(context);
			context.strokeText(this.text, 0, 0);
		}
	};

	Text.prototype.serialize = function(recursive)
	{
		var data = Object2D.prototype.serialize.call(this, recursive);

		data.text = this.text;
		data.font = this.font;
		data.strokeStyle = this.strokeStyle !== null ? this.strokeStyle.serialize() : null;
		data.lineWidth = this.lineWidth;
		data.fillStyle = this.fillStyle !== null ? this.fillStyle.serialize() : null;
		data.textAlign = this.textAlign;
		data.textBaseline = this.textBaseline;

		return data;
	};

	Text.prototype.parse = function(data, root)
	{
		Object2D.prototype.parse.call(this, data, root);

		this.text = data.text;
		this.font = data.font;
		this.strokeStyle = data.strokeStyle !== null ? Style.parse(data.strokeStyle) : null;
		this.lineWidth = data.lineWidth;
		this.fillStyle = data.fillStyle !== null ? Style.parse(data.fillStyle) : null;
		this.textAlign = data.textAlign;
		this.textBaseline = data.textBaseline;
	};

	/**
	 * Image object is used to draw an image from URL.
	 *
	 * @class
	 * @param {string} src Source URL of the image.
	 * @extends {Object2D}
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
	Image.prototype.constructor = Image;
	Image.prototype.type = "Image";
	Object2D.register(Image, "Image");

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
		if(this.image.src.length > 0)
		{
			context.drawImage(this.image, 0, 0, this.image.naturalWidth, this.image.naturalHeight, this.box.min.x, this.box.min.y, this.box.max.x - this.box.min.x, this.box.max.y - this.box.min.y);
		}
	};

	Image.prototype.serialize = function(recursive)
	{
		var data = Object2D.prototype.serialize.call(this, recursive);

		data.box = this.box.toArray();
		data.image = this.image.src;

		return data;
	};

	Image.prototype.parse = function(data, root)
	{
		Object2D.prototype.parse.call(this, data, root);

		this.box.fromArray(data.box);
		this.image.src = data.image;
	};

	/**
	 * A DOM object transformed using CSS3D to be included in the scene.
	 *
	 * DOM objects always stay on top or bellow (depending on the DOM parent placement) of everything else. It is not possible to layer these object with regular canvas objects.
	 *
	 * By default mouse events are not supported for these objects (it does not implement pointer collision checking). Use the DOM events for interaction with these types of objects.
	 *
	 * @class
	 * @param {string} type Type of the DOM element (e.g. "div", "p", ...)
	 * @extends {Object2D}
	 */
	function DOM(type)
	{
		Object2D.call(this);

		/**
		 * Parent element that contains this DOM object.
		 *
		 * The DOM parent element if not set manually is automatically set to the parent of the drawing canvas.
		 *
		 * @type {Element}
		 */
		this.parentElement = null;

		/**
		 * DOM element contained by this object.
		 *
		 * By default it has the pointerEvents style set to none. In order to use any DOM event with this object first you have to set the element.style.pointerEvents to "auto".
		 *
		 * @type {Element}
		 */
		this.element = document.createElement(type || "div");
		this.element.style.transformStyle = "preserve-3d";
		this.element.style.position = "absolute";
		this.element.style.top = "0px";
		this.element.style.bottom = "0px";
		this.element.style.transformOrigin = "0px 0px";
		this.element.style.overflow = "auto";
		this.element.style.pointerEvents = "none";
		
		/**
		 * Size of the DOM element (in world coordinates).
		 */
		this.size = new Vector2(100, 100);
	}

	DOM.prototype = Object.create(Object2D.prototype);
	DOM.prototype.constructor = DOM;
	DOM.prototype.type = "DOM";
	Object2D.register(DOM, "DOM");

	/**
	 * DOM object implements onAdd() method to automatically attach the DOM object to the DOM tree.
	 */
	DOM.prototype.onAdd = function()
	{
		if(this.parentElement !== null)
		{
			this.parentElement.appendChild(this.element);
		}
	};

	/**
	 * DOM object implements onRemove() method to automatically remove the DOM object to the DOM tree.
	 */
	DOM.prototype.onRemove = function()
	{
		if(this.parentElement !== null)
		{
			this.parentElement.removeChild(this.element);
		}
	};

	DOM.prototype.transform = function(context, viewport, canvas, renderer)
	{
		// Check if the DOM element parent is null
		if(this.parentElement === null)
		{
			this.parentElement = renderer.getDomContainer();
			this.parentElement.appendChild(this.element);
		}

		// CSS transformation matrix
		if(this.ignoreViewport)
		{
			this.element.style.transform = this.globalMatrix.cssTransform();
		}
		else
		{
			var projection = viewport.matrix.clone();
			projection.multiply(this.globalMatrix);
			this.element.style.transform = projection.cssTransform();
		}

		// Size of the element
		this.element.style.width = this.size.x + "px";
		this.element.style.height = this.size.y + "px";

		// Visibility
		this.element.style.display = this.visible ? "block" : "none"; 
	};

	DOM.prototype.serialize = function(recursive)
	{
		var data = Object2D.prototype.serialize.call(this, recursive);

		data.size = this.size.toArray();
		data.element = this.element.outerHTML;

		return data;
	};

	DOM.prototype.parse = function(data, root)
	{
		Object2D.prototype.parse.call(this, data, root);

		this.size.fromArray(data.size);

		var parser = new DOMParser();
		var doc = parser.parseFromString(this.element.outerHTML, 'text/html');
		this.element = doc.body.children[0];
	};

	/**
	 * Pattern object draw a image repeated as a pattern.
	 *
	 * Its similar to the Image class but the image can be repeat infinitely.
	 *
	 * @class
	 * @extends {Object2D}
	 * @param {string} src Source image URL.
	 */
	function Pattern(src)
	{
		Object2D.call(this);

		/**
		 * Box object containing the size of the object.
		 *
		 * @type {Box2}
		 */
		this.box = new Box2();

		/**
		 * Image source DOM element. Used as a source for the pattern image.
		 *
		 * This element can be replaced by one of other type (e.g canvas, video).
		 *
		 * @type {Element}
		 */
		this.image = document.createElement("img");

		/**
		 * Repetition indicates how the pattern image should be repeated.
		 *
		 * Possible values are "repeat", "repeat-x", "repeat-y" or "no-repeat".
		 *
		 * More information about this attribute here https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern.
		 *
		 * @type {string}
		 */
		this.repetition = "repeat";

		if(src !== undefined)
		{
			this.setImage(src);
		}
	}

	Pattern.prototype = Object.create(Object2D.prototype);
	Pattern.prototype.constructor = Pattern;
	Pattern.prototype.type = "Pattern";
	Object2D.register(Pattern, "Pattern");

	/**
	 * Set the image source of the object. Can be anything accepted by the src field of an img element.
	 *
	 * Automatically sets the box size to match the image.
	 *
	 * @param {string} src Image source string.
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

		if(this.image.src.length > 0)
		{
			var pattern = context.createPattern(this.image, this.repetition);

			context.fillStyle = pattern;
			context.fillRect(this.box.min.x, this.box.min.y, width, height);
		}
	};

	Pattern.prototype.serialize = function(recursive)
	{
		var data = Object2D.prototype.serialize.call(this, recursive);

		data.box = this.box.toArray();
		data.image = this.image.src;
		data.repetition = this.repetition;

		return data;
	};

	Pattern.prototype.parse = function(data, root)
	{
		Object2D.prototype.parse.call(this, data, root);

		this.box.fromArray(data.box);
		this.image.src = data.image;
		this.repetition = data.repetition;
	};

	/**
	 * Multiple line text drawing directly into the canvas.
	 *
	 * Has support for basic text indent and alignment.
	 *
	 * @class
	 * @extends {Text}
	 */
	function MultiLineText()
	{
		Text.call(this);

		/**
		 * Maximum width of the text content. After text reaches the max width a line break is placed.
		 *
		 * Can be set to null to be ignored.
		 *
		 * @type {number}
		 */
		this.maxWidth = null;

		/**
		 * Height of each line of text, can be smaller or larger than the actual font size.
		 *
		 * Can be set to null to be ignored.
		 *
		 * @type {number}
		 */
		this.lineHeight = null;
	}

	MultiLineText.prototype = Object.create(Text.prototype);
	MultiLineText.prototype.constructor = MultiLineText;
	MultiLineText.prototype.type = "MultiLineText";
	Object2D.register(MultiLineText, "MultiLineText");

	MultiLineText.prototype.draw = function(context, viewport, canvas)
	{
		context.font = this.font;
		context.textAlign = this.textAlign;
		context.textBaseline = this.textBaseline;

		var lineHeight = this.lineHeight || Number.parseFloat(this.font);
		var lines = this.text.split("\n");
		var offsetY = 0;

		// Iterate trough all lines (breakpoints)
		for(var i = 0; i < lines.length; i++)
		{
			var line = lines[i];
			var size = context.measureText(line);
			var sublines = [];

			// Split into multiple sub-lines
			if(this.maxWidth !== null && size.width > this.maxWidth)
			{
				while(line.length > 0)
				{
					var subline = "";
					var subsize = context.measureText(subline + line[0]);

					while(subsize.width < this.maxWidth && line.length > 0)
					{
						subline += line[0];
						line = line.substr(1);
						subsize = context.measureText(subline + line[0]);
					}

					sublines.push(subline);
				}

			}
			// Fits into a single line
			else
			{
				sublines = [line];
			}

			for(var j = 0; j < sublines.length; j++)
			{
				if(this.fillStyle !== null)
				{
					context.fillStyle = this.fillStyle.get(context);
					context.fillText(sublines[j], this.position.x, this.position.y + offsetY);
				}

				if(this.strokeStyle !== null)
				{
					context.lineWidth = this.lineWidth;
					context.strokeStyle = this.strokeStyle.get(context);
					context.strokeText(sublines[j], this.position.x, this.position.y + offsetY);
				}

				offsetY += lineHeight;
			}
		}
	};

	MultiLineText.prototype.serialize = function(recursive)
	{
		var data = Text.prototype.serialize.call(this, recursive);

		data.maxWidth = this.maxWidth;
		data.lineHeight = this.lineHeight;

		return data;
	};

	MultiLineText.prototype.parse = function(data, root)
	{
		Text.prototype.parse.call(this, data, root);

		this.maxWidth = data.maxWidth;
		this.lineHeight = data.lineHeight;
	};

	/**
	 * Bezier curve object draw as bezier curve between two points.
	 *
	 * @class
	 * @extends {Line}
	 */
	function BezierCurve()
	{
		Line.call(this);

		/**
		 * Initial position control point, indicates the tangent of the bezier curve on the first point.
		 *
		 * @type {Vector2}
		 */
		this.fromCp = new Vector2();

		/**
		 * Final position control point, indicates the tangent of the bezier curve on the last point.
		 *
		 * @type {Vector2}
		 */
		this.toCp = new Vector2();
	}

	BezierCurve.prototype = Object.create(Line.prototype);
	BezierCurve.prototype.constructor = BezierCurve;
	BezierCurve.prototype.type = "BezierCurve";
	Object2D.register(BezierCurve, "BezierCurve");

	/**
	 * Create a bezier curve helper, to edit the bezier curve anchor points.
	 *
	 * Helper objects are added to the parent of the curve object.
	 *
	 * @static
	 * @param {BezierCurve} object Object to create the helper for.
	 */
	BezierCurve.curveHelper = function(object)
	{
		var fromCp = new Circle();
		fromCp.radius = 3;
		fromCp.layer = object.layer + 1;
		fromCp.draggable = true;
		fromCp.onPointerDrag = function(pointer, viewport, delta)
		{
			Object2D.prototype.onPointerDrag.call(this, pointer, viewport, delta);
			object.fromCp.copy(fromCp.position);
		};
		object.parent.add(fromCp);

		var fromLine = new Line();
		fromLine.from = object.from;
		fromLine.to = object.fromCp;
		object.parent.add(fromLine);

		var toCp = new Circle();
		toCp.radius = 3;
		toCp.layer = object.layer + 1;
		toCp.draggable = true;
		toCp.onPointerDrag = function(pointer, viewport, delta)
		{
			Object2D.prototype.onPointerDrag.call(this, pointer, viewport, delta);
			object.toCp.copy(toCp.position);
		};
		object.parent.add(toCp);

		var toLine = new Line();
		toLine.from = object.to;
		toLine.to = object.toCp;
		object.parent.add(toLine);
	};

	BezierCurve.prototype.draw = function(context, viewport, canvas)
	{
		context.beginPath();
		context.moveTo(this.from.x, this.from.y);
		context.bezierCurveTo(this.fromCp.x, this.fromCp.y, this.toCp.x, this.toCp.y, this.to.x, this.to.y);
		context.stroke();
	};

	BezierCurve.prototype.serialize = function(recursive)
	{
		var data = Line.prototype.serialize.call(this, recursive);

		data.fromCp = this.fromCp.toArray();
		data.toCp = this.toCp.toArray();

		return data;
	};

	BezierCurve.prototype.parse = function(data, root)
	{
		Line.prototype.parse.call(this, data, root);

		this.fromCp.fromArray(data.fromCp);
		this.toCp.fromArray(data.toCp);
	};

	/**
	 * Bezier curve object draw as bezier curve between two points.
	 *
	 * @class
	 * @extends {Object2D}
	 */
	function QuadraticCurve()
	{
		Line.call(this);

		/**
		 * Control point of the quadratic curve used to control the curvature of the line between the from and to point.
		 *
		 * The curve is interpolated in the direction of the control point it defined the path of the curve.
		 *
		 * @type {Vector2}
		 */
		this.controlPoint = new Vector2();
	}

	QuadraticCurve.prototype = Object.create(Line.prototype);
	QuadraticCurve.prototype.constructor = QuadraticCurve;
	QuadraticCurve.prototype.type = "QuadraticCurve";
	Object2D.register(QuadraticCurve, "QuadraticCurve");

	/**
	 * Create a quadratic curve helper, to edit the curve control point.
	 *
	 * Helper objects are added to the parent of the curve object.
	 *
	 * @static
	 * @param {QuadraticCurve} object Object to create the helper for.
	 */
	QuadraticCurve.curveHelper = function(object)
	{
		var fromLine = new Line();
		fromLine.from = object.from;
		fromLine.to = object.controlPoint;
		object.parent.add(fromLine);

		var controlPoint = new Circle();
		controlPoint.radius = 3;
		controlPoint.layer = object.layer + 1;
		controlPoint.draggable = true;
		controlPoint.position = object.controlPoint;
		controlPoint.onPointerDrag = function(pointer, viewport, delta)
		{
			Object2D.prototype.onPointerDrag.call(this, pointer, viewport, delta);
			object.controlPoint.copy(controlPoint.position);
		};
		object.parent.add(controlPoint);

		var toLine = new Line();
		toLine.from = object.to;
		toLine.to = object.controlPoint;
		object.parent.add(toLine);
	};

	QuadraticCurve.prototype.draw = function(context, viewport, canvas)
	{
		context.beginPath();
		context.moveTo(this.from.x, this.from.y);
		context.quadraticCurveTo(this.controlPoint.x, this.controlPoint.y, this.to.x, this.to.y);
		context.stroke();
	};

	QuadraticCurve.prototype.serialize = function(recursive)
	{
		var data = Line.prototype.serialize.call(this, recursive);

		data.controlPoint = this.controlPoint.toArray();

		return data;
	};

	QuadraticCurve.prototype.parse = function(data, root)
	{
		Line.prototype.parse.call(this, data, root);

		this.controlPoint.fromArray(data.controlPoint);
	};

	/**
	 * Rounded box object draw a rectangular object with rounded corners.
	 *
	 * @class
	 * @extends {Box}
	 */
	function RoundedBox()
	{
		Box.call(this);

		/**
		 * Radius of the circular section that makes up the box corners.
		 *
		 * @type {number}
		 */
		this.radius = 5;
	}

	RoundedBox.prototype = Object.create(Box.prototype);
	RoundedBox.prototype.constructor = RoundedBox;
	RoundedBox.prototype.type = "RoundedBox";
	Object2D.register(RoundedBox, "RoundedBox");

	/**
	 * Draw a rounded rectangle into the canvas context using path to draw the rounded rectangle.
	 *
	 * @param {CanvasRenderingContext2D} context
	 * @param {number} x The top left x coordinate
	 * @param {number} y The top left y coordinate
	 * @param {number} width The width of the rectangle
	 * @param {number} height The height of the rectangle
	 * @param {number} radius Radius of the rectangle corners.
	 */
	RoundedBox.roundRect = function(context, x, y, width, height, radius)
	{
		context.beginPath();
		context.moveTo(x + radius, y);
		context.lineTo(x + width - radius, y);
		context.quadraticCurveTo(x + width, y, x + width, y + radius);
		context.lineTo(x + width, y + height - radius);
		context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		context.lineTo(x + radius, y + height);
		context.quadraticCurveTo(x, y + height, x, y + height - radius);
		context.lineTo(x, y + radius);
		context.quadraticCurveTo(x, y, x + radius, y);
		context.closePath();
	};

	RoundedBox.prototype.draw = function(context, viewport, canvas)
	{
		var width = this.box.max.x - this.box.min.x;
		var height = this.box.max.y - this.box.min.y;

		if(this.fillStyle !== null)
		{	
			context.fillStyle = this.fillStyle.get(context);
			RoundedBox.roundRect(context, this.box.min.x, this.box.min.y, width, height, this.radius);
			context.fill();
		}

		if(this.strokeStyle !== null)
		{
			context.lineWidth = this.lineWidth;
			context.strokeStyle = this.strokeStyle.get(context);
			RoundedBox.roundRect(context, this.box.min.x, this.box.min.y, width, height, this.radius);
			context.stroke();
		}
	};

	RoundedBox.prototype.serialize = function(recursive)
	{
		var data = Box.prototype.serialize.call(this, recursive);

		data.radius = this.radius;

		return data;
	};

	RoundedBox.prototype.parse = function(data, root)
	{
		Box.prototype.parse.call(this, data, root);

		this.radius = data.radius;
	};

	/**
	 * Graph object is used to plot numeric graph data into the canvas.
	 *
	 * Graph data is composed of Y values that are interpolated across the X axis.
	 *
	 * @class
	 * @extends {Object2D}
	 */
	function Graph()
	{
		Object2D.call(this);

		/**
		 * Graph object containing the size of the object.
		 */
		this.box = new Box2(new Vector2(-50, -35), new Vector2(50, 35));

		/**
		 * Color of the box border line.
		 */
		this.strokeStyle = new ColorStyle("rgb(0, 153, 255)");

		/**
		 * Line width used to stroke the graph data.
		 */
		this.lineWidth = 1.0;

		/**
		 * Background color of the box.
		 */
		this.fillStyle = new ColorStyle("rgba(0, 153, 255, 0.3)");

		/**
		 * Minimum value of the graph.
		 */
		this.min = 0;

		/**
		 * Maximum value of the graph.
		 */
		this.max = 10;

		/**
		 * Data to be presented in the graph.
		 *
		 * The array should store numeric values.
		 */
		this.data = [];
	}

	Graph.prototype = Object.create(Object2D.prototype);
	Graph.prototype.constructor = Graph;
	Graph.prototype.type = "Graph";
	Object2D.register(Graph, "Graph");

	Graph.prototype.isInside = function(point)
	{
		return this.box.containsPoint(point);
	};

	Graph.prototype.draw = function(context, viewport, canvas)
	{
		if(this.data.length === 0)
		{
			return;
		}
		
		var width = this.box.max.x - this.box.min.x;
		var height = this.box.max.y - this.box.min.y;

		context.lineWidth = this.lineWidth;
		context.beginPath();
				
		var step = width / (this.data.length - 1);
		var gamma = this.max - this.min;

		context.moveTo(this.box.min.x, this.box.max.y - ((this.data[0] - this.min) / gamma) * height);
		
		for(var i = 1, s = step; i < this.data.length; s += step, i++)
		{
			context.lineTo(this.box.min.x + s, this.box.max.y - ((this.data[i] - this.min) / gamma) * height);
		}

		if(this.strokeStyle !== null)
		{
			context.strokeStyle = this.strokeStyle.get(context);
			context.stroke();
		}

		if(this.fillStyle !== null)
		{
			context.fillStyle = this.fillStyle.get(context);
			context.lineTo(this.box.max.x, this.box.max.y);
			context.lineTo(this.box.min.x, this.box.max.y);
			context.fill();
		}
	};

	Graph.prototype.serialize = function(recursive)
	{
		var data = Object2D.prototype.serialize.call(this, recursive);

		data.box = this.box.toArray();
		data.strokeStyle = this.strokeStyle !== null ? this.strokeStyle.serialize() : null;
		data.lineWidth = this.lineWidth;
		data.fillStyle = this.fillStyle !== null ? this.fillStyle.serialize() : null;
		data.min = this.min;
		data.max = this.max;
		data.data = this.data;

		return data;
	};

	Graph.prototype.parse = function(data, root)
	{
		Object2D.prototype.parse.call(this, data, root);

		this.box.fromArray(data.box);
		this.strokeStyle = data.strokeStyle !== null ? Style.parse(data.strokeStyle) : null;
		this.lineWidth = data.lineWidth;
		this.fillStyle = data.fillStyle !== null ? Style.parse(data.fillStyle) : null;
		this.min = data.min;
		this.max = data.max;
		this.data = data.data;
	};

	/**
	 * Scatter graph can be used to draw numeric data as points.
	 *
	 * @class
	 * @extends {Object2D}
	 */
	function ScatterGraph()
	{
		Graph.call(this);

		/**
		 * Radius of each point represented in the scatter plot.
		 */
		this.radius = 5.0;

		/**
		 * Draw lines betwen the points of the scatter graph.
		 */
		this.drawLine = false;
	}

	ScatterGraph.prototype = Object.create(Graph.prototype);
	ScatterGraph.prototype.constructor = ScatterGraph;
	ScatterGraph.prototype.type = "BarGraph";
	Object2D.register(ScatterGraph, "BarGraph");

	ScatterGraph.prototype.draw = function(context, viewport, canvas)
	{
		if(this.data.length === 0)
		{
			return;
		}
		
		var width = this.box.max.x - this.box.min.x;
		var height = this.box.max.y - this.box.min.y;

		var step = width / (this.data.length - 1);
		var gamma = this.max - this.min;

		context.lineWidth = this.lineWidth;
		
		// Draw line
		if(this.drawLine)
		{
			context.beginPath();
			context.moveTo(this.box.min.x, this.box.max.y - ((this.data[0] - this.min) / gamma) * height);
			
			for(var i = 1, s = step; i < this.data.length; s += step, i++)
			{
				context.lineTo(this.box.min.x + s, this.box.max.y - ((this.data[i] - this.min) / gamma) * height);
			}
		
			if(this.strokeStyle !== null)
			{
				context.strokeStyle = this.strokeStyle.get(context);
				context.stroke();
			}
		}

		// Draw circles
		context.beginPath();

		for(var i = 0, s = 0; i < this.data.length; s += step, i++)
		{
			var y = this.box.max.y - ((this.data[i] - this.min) / gamma) * height;

			context.moveTo(this.box.min.x + s + this.radius, y);
			context.arc(this.box.min.x + s, y, this.radius, 0, Math.PI * 2, true);
		}

		if(this.strokeStyle !== null)
		{
			context.strokeStyle = this.strokeStyle.get(context);
			context.stroke();
		}

		if(this.fillStyle !== null)
		{
			context.fillStyle = this.fillStyle.get(context);
			context.fill();
		}
	};

	ScatterGraph.prototype.serialize = function(recursive)
	{
		var data = Graph.prototype.serialize.call(this, recursive);

		data.radius = this.radius;

		return data;
	};

	ScatterGraph.prototype.parse = function(data, root)
	{
		Graph.prototype.parse.call(this, data, root);

		this.radius = data.radius;
	};

	/**
	 * Bar graph can be used to plot bar data into the canvas.
	 *
	 * @class
	 * @extends {Object2D}
	 */
	function BarGraph()
	{
		Graph.call(this);

		/**
		 * Width of each bar in the graph.
		 * 
		 * If set null is automatically calculated from the graph size and number of points.
		 */
		this.barWidth = null;
	}

	BarGraph.prototype = Object.create(Graph.prototype);
	BarGraph.prototype.constructor = BarGraph;
	BarGraph.prototype.type = "BarGraph";
	Object2D.register(BarGraph, "BarGraph");

	BarGraph.prototype.draw = function(context, viewport, canvas)
	{
		if(this.data.length === 0)
		{
			return;
		}
		
		var width = this.box.max.x - this.box.min.x;
		var height = this.box.max.y - this.box.min.y;

		var step = width / (this.data.length - 1);
		var gamma = this.max - this.min;

		context.lineWidth = this.lineWidth;
		context.beginPath();

		var barWidth = this.barWidth !== null ? this.barWidth : width / this.data.length;
		var barHalfWidth = barWidth / 2.0;

		for(var i = 0, s = 0; i < this.data.length; s += step, i++)
		{
			var y = this.box.max.y - ((this.data[i] - this.min) / gamma) * height;

			context.moveTo(this.box.min.x + s - barHalfWidth, y);
			context.rect(this.box.min.x + s - barHalfWidth, y, barWidth, this.box.max.y - y);
		}

		if(this.strokeStyle !== null)
		{
			context.strokeStyle = this.strokeStyle.get(context);
			context.stroke();
		}

		if(this.fillStyle !== null)
		{
			context.fillStyle = this.fillStyle.get(context);
			context.fill();
		}
	};

	BarGraph.prototype.serialize = function(recursive)
	{
		var data = Graph.prototype.serialize.call(this, recursive);

		return data;
	};

	BarGraph.prototype.parse = function(data, root)
	{
		Graph.prototype.parse.call(this, data, root);
	};

	/**
	 * Gradient color stop is used to create the gradients by their color sections.
	 *
	 * The gradients are ordered, each stop has a target color that becomes solid on its offset value triggering the next color stop if there is one.
	 *
	 * @param offset Offset of the color stop between 0 and 1 inclusive.
	 * @param color CSS color value.
	 * @constructor
	 */
	function GradientColorStop(offset, color)
	{
	    /**
	     * Offset of the color stop between 0 and 1 inclusive.
	     *
	     * @type {number}
	     */
	    this.offset = offset;

	    /**
	     * CSS color value.
	     *
	     * @type {string}
	     */
	    this.color = color;
	}

	/**
	 * Gradient style is used to represent any type of gradient based style.
	 *
	 * It handles any gradient based operations and should be used as base for other gradient styles.
	 *
	 * @class
	 * @extends {Style}
	 */
	function GradientStyle()
	{
	    Style$1.call(this);

	    /**
	     * List of colors that compose this gradient ordered.
	     *
	     * You need to add at least one color stop to have a visible gradient.
	     *
	     * @type {GradientColorStop[]}
	     */
	    this.colors = [];
	}

	GradientStyle.prototype = Object.create(Style$1.prototype);

	/**
	 * Add a new color stop defined by an offset and a color to the gradient.
	 *
	 * If the offset is not between 0 and 1 inclusive, or if color can't be parsed as a CSS color, an error is raised.
	 *
	 * @param {number} offset Offset of the color stop between 0 and 1 inclusive.
	 * @param {string} color CSS color value.
	 */
	GradientStyle.prototype.addColorStop = function(offset, color)
	{
	    this.colors.push(new GradientColorStop(offset, color));
	};

	GradientStyle.prototype.serialize = function()
	{
	    return {
	        colors: this.colors
	    };
	};

	GradientStyle.prototype.parse = function(data)
	{
	    var colors = [];
	    for(var i = 0; i < data.colors.length; i++)
	    {
	        colors.push(new GradientColorStop(data.colors[i].offset, data.colors[i].color));
	    }
	    this.colors = colors;
	};

	/**
	 * Linear gradient style, represents a gradient of colors from a point to another interpolating in between.
	 *
	 * Behind the of the two points used the color is solid.
	 *
	 * The get method returns a CanvasGradient https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient when generated.
	 *
	 * @class
	 * @extends {GradientStyle}
	 */
	function LinearGradientStyle()
	{
	    GradientStyle.call(this);

	    /**
	     * The coordinates of the starting point of the gradient.
	     *
	     * @type {Vector2}
	     */
	    this.start = new Vector2(-100, 0);

	    /**
	     * The coordinates of the ending point of the gradient.
	     *
	     * @type {Vector2}
	     */
	    this.end = new Vector2(100, 0);
	}

	LinearGradientStyle.prototype = Object.create(GradientStyle.prototype);
	Style$1.register(LinearGradientStyle, "LinearGradient");

	LinearGradientStyle.prototype.get = function(context)
	{
	    var style = context.createLinearGradient(this.start.x, this.start.y, this.end.x, this.end.y);

	    for(var i = 0; i < this.colors.length; i++)
	    {
	        style.addColorStop(this.colors[i].offset, this.colors[i].color);
	    }

	    return style;
	};

	LinearGradientStyle.prototype.serialize = function ()
	{
	    var data = GradientStyle.prototype.serialize.call(this);

	    Object.assign(data, {
	        type: "LinearGradient",
	        start: this.start.toArray(),
	        end: this.end.toArray()
	    });

	    return data;
	};

	LinearGradientStyle.prototype.parse = function (data)
	{
	    GradientStyle.prototype.parse.call(this, data);

	    this.start.fromArray(data.start);
	    this.end.fromArray(data.end);
	};

	/**
	 * Gauge object is used to draw gauge like graphic.
	 *
	 * It has a defined range, start angle, end angle and style controls.
	 *
	 * @class
	 * @extends {Object2D}
	 */
	function Gauge()
	{
		Object2D.call(this);

		/**
		 * Value displayed by this gauge. It is displayed based on min and max values.
		 *
		 * @type {number}
		 */
		this.value = 50;

		/**
		 * Minimum value of the gauge. Necessary to display the value correctly to scale.
		 *
		 * @type {number}
		 */
		this.min = 0;

		/**
		 * Maximum value of the gauge. Necessary to display the value correctly to scale.
		 *
		 * @type {number}
		 */
		this.max = 100;

		/**
		 * Radius of the gauge object.
		 *
		 * @type {number}
		 */
		this.radius = 80;

		/**
		 * The line width of the gauge semi-circle.
		 *
		 * @type {number}
		 */
		this.lineWidth = 10;

		/**
		 * Start angle of the gauge.
		 *
		 * @type {number}
		 */
		this.startAngle = Math.PI;

		/**
		 * End angle of the gauge.
		 *
		 * @type {number}
		 */
		this.endAngle = 2 * Math.PI;

		/**
		 * If true draw a circular dial at the end of the gauge bar.
		 *
		 * @type {boolean}
		 */
		this.dial = false;

		/**
		 * Style of the base of the gauge object, (the background of the gauge bar).
		 *
		 * @type {Style}
		 */
		this.baseStyle = new ColorStyle("#e9ecf1");

		/**
		 * Style of the gauge bar.
		 *
		 * @type {Style}
		 */
		this.barStyle = new LinearGradientStyle();
		this.barStyle.start.set(-100, 0);
		this.barStyle.end.set(100, 0);
		this.barStyle.addColorStop(0, "#e5ff50");
		this.barStyle.addColorStop(0.5, "#50ff67");
		this.barStyle.addColorStop(1, "#32adff");
	}

	Gauge.prototype = Object.create(Object2D.prototype);
	Gauge.prototype.constructor = Gauge;
	Gauge.prototype.type = "Gauge";
	Object2D.register(Gauge, "Gauge");

	Gauge.prototype.isInside = function(point)
	{
		return point.length() <= this.radius;
	};

	Gauge.prototype.draw = function(context, viewport, canvas)
	{
		var percentage = this.value / (this.max - this.min);

		var range = [this.startAngle, this.endAngle];
		var diff = range[1] - range[0];
		var angle = range[0] + diff * percentage;
		var center = [0, 0];

		//Back
		context.lineWidth = this.lineWidth;
		context.lineCap = "round";
		context.strokeStyle = this.baseStyle.get(context);
		context.beginPath();
		context.arc(center[0], center[1], this.radius, range[0], range[1]);
		context.stroke();

		// Fill gradient
		var gradient = context.createLinearGradient(-this.radius, 0, this.radius, 0);

		context.strokeStyle = this.barStyle.get(context);

		context.lineWidth = this.lineWidth;
		context.beginPath();
		context.arc(center[0], center[1], this.radius, range[0], angle);
		context.stroke();

		if(this.dial)
		{
			var dialAngle = (this.startAngle - this.endAngle) * percentage;
			var dialCenter = [Math.cos(dialAngle) * this.radius, Math.sin(dialAngle) * this.radius];
			dialCenter[0] = dialCenter[0] - center[0];
			dialCenter[1] = dialCenter[1] - center[1];

			context.fillStyle = "#FFFFFF";
			context.beginPath();
			context.arc(dialCenter[0], dialCenter[1], this.lineWidth / 2, 0, 2 * Math.PI);
			context.fill();

			context.fillStyle = gradient;
			context.beginPath();
			context.arc(dialCenter[0], dialCenter[1], this.lineWidth / 3, 0, 2 * Math.PI);
			context.fill();
		}
	};

	Gauge.prototype.serialize = function(recursive)
	{
		var data = Object2D.prototype.serialize.call(this, recursive);

		data.value = this.value;
		data.min = this.min;
		data.max = this.max;
		data.radius = this.radius;
		data.lineWidth = this.lineWidth;
		data.startAngle = this.startAngle;
		data.endAngle = this.endAngle;
		data.dial = this.dial;
		data.baseStyle = this.baseStyle !== null ? this.baseStyle.serialize() : null;
		data.barStyle = this.barStyle !== null ? this.barStyle.serialize() : null;

		return data;
	};

	Gauge.prototype.parse = function(data, root)
	{
		Object2D.prototype.parse.call(this, data, root);

		this.value = data.value;
		this.min = data.min;
		this.max = data.max;
		this.radius = data.radius;
		this.lineWidth = data.lineWidth;
		this.startAngle = data.startAngle;
		this.endAngle = data.endAngle;
		this.dial = data.dial;
		this.baseStyle = data.baseStyle !== null ? Style.parse(data.baseStyle) : null;
		this.barStyle = data.barStyle !== null ? Style.parse(data.barStyle) : null;
	};

	/**
	 * Pie chart represents a set of data in a pie like chart graph.
	 * 
	 * The values are drawn in porportion relative to their sum.
	 *
	 * @class
	 * @extends {Object2D}
	 */
	function PieChart(data)
	{
		Object2D.call(this);

		/**
		 * Data to be displayed on the pie chart. Each element should store a value and a stroke/fill styles.
		 * 
		 * Each element should use the following structure {value: 0.0, fillStyle: ..., strokestyle: ...}.
		 */
		this.data = data !== undefined ? data : [];

		/**
		 * Variable pie slice size based on their value compared to the biggest value.
		 *
		 * @type {boolean}
		 */
		this.sliceSize = false;

		/**
		 * Radius of the pie chart object.
		 *
		 * @type {number}
		 */
		this.radius = 50;

		/**
		 * The line width of each pie chart section.
		 *
		 * @type {number}
		 */
		this.lineWidth = 1.0;

		/**
		 * Start angle of the pie chart.
		 *
		 * @type {number}
		 */
		this.startAngle = 0;

		/**
		 * End angle of the pie chart.
		 *
		 * @type {number}
		 */
		this.endAngle = 2 * Math.PI;
	}

	PieChart.prototype = Object.create(Object2D.prototype);
	PieChart.prototype.constructor = PieChart;
	PieChart.prototype.type = "PieChart";
	Object2D.register(PieChart, "PieChart");

	PieChart.prototype.isInside = function(point)
	{
		return point.length() <= this.radius;
	};

	PieChart.prototype.draw = function(context)
	{
		if(this.data.length === 0)
		{
			return;
		}

		var sum = 0;
		var max = this.data[0].value;

		for(var i = 0; i < this.data.length; i++)
		{
			sum += this.data[i].value;

			if(this.data[i].value > max)
			{
				max = this.data[i].value;
			}
		}

		context.lineWidth = this.lineWidth;
		
		var angleRange = this.endAngle - this.startAngle;
		var angle = this.startAngle;

		// Fill
		for(var i = 0; i < this.data.length; i++)
		{
			var section = angleRange * (this.data[i].value / sum);

			if(this.data[i].fillStyle)
			{
				context.beginPath();
				context.moveTo(0, 0);

				var radius = this.sliceSize ? ((this.data[i].value / max) * this.radius) : this.radius;
				context.arc(0, 0, radius, angle, angle + section);
				context.moveTo(0, 0);

				context.fillStyle = this.data[i].fillStyle.get(context);
				context.fill();
			}

			angle += section;
		}

		// Stroke
		for(var i = 0; i < this.data.length; i++)
		{
			var section = angleRange * (this.data[i].value / sum);

			if(this.data[i].strokeStyle)
			{
				context.beginPath();
				context.moveTo(0, 0);

				var radius = this.sliceSize ? ((this.data[i].value / max) * this.radius) : this.radius;
				context.arc(0, 0, radius, angle, angle + section);
				context.moveTo(0, 0);

				context.strokeStyle = this.data[i].strokeStyle.get(context);
				context.stroke();
			}

			angle += section;
		}
	};

	PieChart.prototype.serialize = function(recursive)
	{
		var data = Object2D.prototype.serialize.call(this, recursive);

		data.radius = this.radius;
		data.lineWidth = this.lineWidth;
		data.startAngle = this.startAngle;
		data.endAngle = this.endAngle;
		data.sliceSize = this.sliceSize;

		return data;
	};

	PieChart.prototype.parse = function(data, root)
	{
		Object2D.prototype.parse.call(this, data, root);

		this.radius = data.radius;
		this.lineWidth = data.lineWidth;
		this.startAngle = data.startAngle;
		this.endAngle = data.endAngle;
		this.sliceSize = data.sliceSize;
	};

	/**
	 * Path object can be used to draw paths build from commands into the canvas.
	 * 
	 * These paths can be also obtained from SVG files as a SVG command list.
	 *
	 * @class
	 * @extends {Object2D}
	 */
	function Path(path)
	{
		Object2D.call(this);

		/**
		 * Path2D object containing the commands to draw the shape into the canvas.
		 * 
		 * Check https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D for more details. 
		 */
		this.path = path !== undefined ? path : new Path2D("M10 10 h 80 v 80 h -80 Z");

		/**
		 * Style of the object border line.
		 *
		 * If set null it is ignored.
		 */
		this.strokeStyle = new ColorStyle("#000000");

		/**
		 * Line width, only used if a valid strokeStyle is defined.
		 */
		this.lineWidth = 1;

		/**
		 * Background color of the path.
		 *
		 * If set null it is ignored.
		 *
		 * @param {Style}
		 */
		this.fillStyle = new ColorStyle("#FFFFFF");
	}

	Path.prototype = Object.create(Object2D.prototype);
	Path.prototype.constructor = Path;
	Path.prototype.type = "Path";
	Object2D.register(Path, "Path");

	Path.prototype.draw = function(context)
	{
		if(this.fillStyle !== null)
		{	
			context.fillStyle = this.fillStyle.get(context);
			context.fill(this.path);
		}

		if(this.strokeStyle !== null)
		{
			context.lineWidth = this.lineWidth;
			context.strokeStyle = this.strokeStyle.get(context);
			context.stroke(this.path);
		}
	};

	Path.prototype.serialize = function(recursive)
	{
		var data = Object2D.prototype.serialize.call(this, recursive);

		data.strokeStyle = this.strokeStyle !== null ? this.strokeStyle.serialize() : null;
		data.lineWidth = this.lineWidth;
		data.fillStyle = this.fillStyle !== null ? this.fillStyle.serialize() : null;

		return data;
	};

	Path.prototype.parse = function(data, root)
	{
		Object2D.prototype.parse.call(this, data, root);

		this.strokeStyle = data.strokeStyle !== null ? Style$1.parse(data.strokeStyle) : null;
		this.lineWidth = data.lineWidth;
		this.fillStyle = data.fillStyle !== null ? Style$1.parse(data.fillStyle) : null;
	};

	/**
	 * Pattern style represents an opaque object describing a pattern, based on an image, a canvas, or a video.
	 *
	 * The get method returns a CanvasPattern object https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern created by the context.createPattern() method.
	 *
	 * @class
	 * @extends {Style}
	 * @param {CanvasImageSource} source Source element of the pattern.
	 */
	function PatternStyle(source)
	{
	    Style$1.call(this);

	    /**
	     * Source of the pattern style. Can be a image, video or another canvas element
	     *
	     * By default a empty image element is created.
	     *
	     * @type {CanvasImageSource}
	     */
	    this.source = source || document.createElement("img");

	    /**
	     * Repetition indicates how the pattern image should be repeated.
	     *
	     * Possible values are "repeat", "repeat-x", "repeat-y" or "no-repeat".
	     *
	     * More information about this attribute here https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern.
	     *
	     * @type {string}
	     */
	    this.repetition = "repeat";

	    /**
	     * Transformation matrix applied to the pattern.
	     *
	     * The transformation allows to move, rotate and scale the pattern freely
	     *
	     * @type {Matrix}
	     */
	    this.matrix = new Matrix();
	}

	PatternStyle.prototype = Object.create(Style$1.prototype);
	Style$1.register(PatternStyle, "Pattern");

	/**
	 * Applies an 2x3 transformation matrix representing a linear transform to the pattern.
	 *
	 * @param {number[]} transform 2x3 Transformation matrix.
	 */
	PatternStyle.prototype.setTransform = function(transform)
	{
	    this.matrix.m = transform;
	    this.needsUpdate = true;
	};

	PatternStyle.prototype.get = function(context)
	{
	    if(this.needsUpdate || this.cache === null)
	    {
	        this.cache = context.createPattern(this.source, this.repetition);
	        this.cache.setTransform(this.matrix.cssTransform());
	        this.needsUpdate = false;
	    }

	    return this.cache;
	};

	PatternStyle.prototype.serialize = function ()
	{
	    var data = GradientStyle.prototype.serialize.call(this);

	    Object.assign(data, {
	        type: "Pattern",
	        matrix: this.matrix.m,
	        repetition: this.repetition,
	        source: this.source
	    });

	    return data;
	};

	PatternStyle.prototype.parse = function (data)
	{
	    GradientStyle.prototype.parse.call(this, data);

	    this.matrix = new Matrix(data.matrix);
	    this.repetition = data.repetition;
	    this.source = data.source;
	};

	/**
	 * Radial gradient interpolates colors from a point to another point around up to a starting and finishing radius value.
	 *
	 * If the start and end point are the same it interpolates around the starting and ending radius forming a circle. Outside of the radius the color is solid.
	 *
	 * The get method returns a CanvasGradient https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient when generated.
	 *
	 * @class
	 * @extends {GradientStyle}
	 */
	function RadialGradientStyle()
	{
	    GradientStyle.call(this);

	    /**
	     * The coordinates of the starting circle of the gradient.
	     *
	     * @type {Vector2}
	     */
	    this.start = new Vector2(0, 0);

	    /**
	     * The radius of the starting circle.
	     *
	     * @type {number}
	     */
	    this.startRadius = 10;

	    /**
	     * The coordinates of the ending circle of the gradient.
	     *
	     * @type {Vector2}
	     */
	    this.end = new Vector2(0, 0);

	    /**
	     * The radius of the ending circle.
	     *
	     * @type {number}
	     */
	    this.endRadius = 50;
	}

	RadialGradientStyle.prototype = Object.create(GradientStyle.prototype);
	Style$1.register(RadialGradientStyle, "RadialGradient");

	RadialGradientStyle.prototype.get = function(context)
	{

	    var style = context.createRadialGradient(this.start.x, this.start.y, this.startRadius, this.end.x, this.end.y, this.endRadius);

	    for(var i = 0; i < this.colors.length; i++)
	    {
	        style.addColorStop(this.colors[i].offset, this.colors[i].color);
	    }

	    return style;
	};

	RadialGradientStyle.prototype.serialize = function ()
	{
	    var data = GradientStyle.prototype.serialize.call(this);

	    Object.assign(data, {
	        type: "RadialGradient",
	        start: this.start.toArray(),
	        end: this.end.toArray(),
	        startRadius: this.startRadius,
	        endRadius: this.endRadius
	    });

	    return data;
	};

	RadialGradientStyle.prototype.parse = function (data)
	{
	    GradientStyle.prototype.parse.call(this, data);

	    this.start.fromArray(data.start);
	    this.end.fromArray(data.end);
	    this.startRadius = data.startRadius;
	    this.endRadius = data.endRadius;
	};

	/**
	 * Node graph object should be used as a container for node elements.
	 *
	 * The node graph object specifies how the nodes are processed, each individual node can store and process data, the node graph specified how this information is processed.
	 *
	 * All node elements are stored as children of the node graph.
	 *
	 * @class
	 * @extends {Object2D}
	 */
	function NodeGraph()
	{
		Object2D.call(this);
	}

	NodeGraph.prototype = Object.create(Object2D.prototype);
	NodeGraph.prototype.constructor = NodeGraph;
	NodeGraph.prototype.type = "NodeGraph";
	Object2D.register(NodeGraph, "NodeGraph");

	/**
	 * Create and add a new node of specific node type to the graph.
	 *
	 * Automatically finds an empty space as close as possible to other nodes to add this new node.
	 *
	 * @param {Node} node Node object to be added.
	 * @return {Node} Node created (already added to the graph).
	 */
	NodeGraph.prototype.addNode = function(node)
	{
		// Check available position on screen.
		var x = 0, y = 0;
		for(var i = 0; i < this.children.length; i++)
		{
			if(this.children[i].position.x > x)
			{
				x = this.children[i].position.x;
			}
			if(this.children[i].position.y > y)
			{
				y = this.children[i].position.y;
			}
		}

		// Create and add new node
		node.position.set(x + 200, y / 2.0);
		this.add(node);

		if(node.registerSockets !== null)
		{
			node.registerSockets();
		}

		return node;
	};

	/**
	 * Node connector is used to connect a output of a node to a input of another node.
	 *
	 * Some nodes outputs might support multiple connections having an output connected to multiple inputs.
	 *
	 * Data always goes from the output node to a input node.
	 *
	 * @class
	 * @extends {BezierCurve}
	 */
	function NodeConnector()
	{
		BezierCurve.call(this);

		this.lineWidth = 2;

		/**
		 * Origin output socket that is attached to a node.
		 *
		 * @type {NodeSocket}
		 */
		this.outputSocket = null;

		/**
		 * Destination input socket that is attached to a node.
		 *
		 * @type {NodeSocket}
		 */
		this.inputSocket = null;
	}

	NodeConnector.prototype = Object.create(BezierCurve.prototype);
	NodeConnector.prototype.constructor = NodeConnector;
	NodeConnector.prototype.type = "NodeConnector";
	Object2D.register(NodeConnector, "NodeConnector");

	NodeConnector.prototype.destroy = function()
	{
		BezierCurve.prototype.destroy.call(this);

		if(this.outputSocket !== null)
		{
			this.outputSocket.removeConnector(this);
			this.outputSocket = null;
		}

		if(this.inputSocket !== null)
		{
			this.inputSocket.removeConnector(this);
			this.inputSocket = null;
		}
	};

	NodeConnector.prototype.onUpdate = function()
	{
		if(this.outputSocket !== null)
		{
			this.from.copy(this.outputSocket.position);
		}

		if(this.inputSocket !== null)
		{
			this.to.copy(this.inputSocket.position);
		}

		// Center control points
		this.fromCp.copy(this.from);
		this.fromCp.add(this.to);
		this.fromCp.multiplyScalar(0.5);
		this.toCp.copy(this.fromCp);

		var curvature = 0.5;

		// Check vertical/horizontal distances
		var yDistance = this.to.y - this.from.y;
		var xDistance = this.to.x - this.from.x;

		// Apply a offset to the control points
		if(Math.abs(xDistance) > Math.abs(yDistance))
		{
			this.toCp.x += xDistance * curvature;
			this.fromCp.x -= xDistance * curvature;
		}
		else
		{
			this.toCp.y += yDistance * curvature;
			this.fromCp.y -= yDistance * curvature;
		}
	};

	NodeConnector.prototype.serialize = function(recursive)
	{
		var data = BezierCurve.prototype.serialize.call(this, recursive);

		data.outputSocket = this.outputSocket !== null ? this.outputSocket.uuid : null;
		data.inputSocket = this.inputSocket !== null ? this.inputSocket.uuid : null;

		return data;
	};

	NodeConnector.prototype.parse = function(data, root)
	{
		BezierCurve.prototype.parse.call(this, data, root);

		if(data.outputSocket !== null)
		{
			this.outputSocket = root.getChildByUUID(data.outputSocket);
		}

		if(data.inputSocket !== null)
		{
			this.inputSocket = root.getChildByUUID(data.inputSocket);
		}
	};

	/**
	 * Represents a node hook point. Is attached to the node element and represented visually.
	 *
	 * Can be used as a node input, output or as a bidirectional connection.
	 *
	 * @class
	 * @extends {Circle}
	 * @param {Node} node Node of this hook.
	 * @param {number} direction Direction of the hook.
	 * @param {string} category Data category of the node socket.
	 * @param {string} name Name of the node socket.
	 */
	function NodeSocket(node, direction, category, name)
	{
		Circle.call(this);

		this.draggable = true;
		this.radius = 6;
		this.layer = 1;

		/**
		 * Name of the socket presented to the user.
		 *
		 * @type {string}
		 */
		this.name = name !== undefined ? name : "";

		/**
		 * Category of data available from this socket. Only sockets of the same category can be connected.
		 *
		 * Should directly store the data type name (e.g. "string", "number", "Object", etc).
		 *
		 * @type {string}
		 */
		this.category = category !== undefined ? category : "";

		/**
		 * Allow to connect a OUTPUT node to multiple INPUT sockets.
		 *
		 * A INPUT socket can only take one connection, this value is ignored for INPUT sockets.
		 *
		 * @type {boolean}
		 */
		this.multiple = true;

		/**
		 * Direction of the node hook, indicates the data flow of the socket.
		 *
		 * Can be INPUT or OUTPUT.
		 *
		 * @type {number}
		 */
		this.direction = direction;

		/**
		 * Node where this socket is attached to.
		 *
		 * Should be used to get data from node GUI and from other sockets.
		 *
		 * @type {Node}
		 */
		this.node = node;

		/**
		 * Node connector used to connect this socket to another node socket.
		 *
		 * Can be used to access the adjacent node. If the socket allows for multiple connections this array can have multiple elements.
		 *
		 * @type {NodeConnector[]}
		 */
		this.connectors = [];

		/**
		 * Indicates if the user is currently creating a new connection from this node socket.
		 *
		 * @type {boolean}
		 */
		this.creatingConnection = false;

		/**
		 * Text object used to present the name of the socket.
		 *
		 * Depending on the socket direction the text is aligned to the left or to the right.
		 *
		 * @type {Text}
		 */
		this.text = new Text();
		this.text.text = this.name;
		if(this.direction === NodeSocket.INPUT)
		{
			this.text.position.x -= 10;
			this.text.textAlign = "right";
		}
		else if(this.direction === NodeSocket.OUTPUT)
		{
			this.text.position.x += 10;
			this.text.textAlign = "left";
		}
		this.add(this.text);
	}

	NodeSocket.prototype = Object.create(Circle.prototype);
	NodeSocket.prototype.constructor = NodeSocket;
	NodeSocket.prototype.type = "NodeSocket";
	Object2D.register(NodeSocket, "NodeSocket");

	/**
	 * Input hook can only be connected to an output.
	 *
	 * Is used to read data from the output.
	 *
	 * @type {number}
	 */
	NodeSocket.INPUT = 1;

	/**
	 * Output hook can only be connected to an input.
	 *
	 * Writes data to the output.
	 *
	 * @type {number}
	 */
	NodeSocket.OUTPUT = 2;

	/**
	 * Get value stored or calculated in node socket, it should be the calculated from node logic, node inputs, user input, etc.
	 *
	 * For input nodes the value should be fetched trough the connector object that is connected to an output node elsewhere.
	 *
	 * By default it the socket is an INPUT it gets the value trough the connector if available. Inputs will recursively propagate the method trough the graph to get their value.
	 *
	 * If the socket is an OUTPUT or there is no connection the method returns null by default, in this case the method should be extended by implementations of this class to process data.
	 *
	 * @return {Object} Return data calculated from the node.
	 */
	NodeSocket.prototype.getValue = function()
	{
		// If the node is an input get its value from the output socket of the connection.
		if(this.direction === NodeSocket.INPUT && this.connectors.length > 0 && this.connectors[0].outputSocket !== null)
		{
			return this.connectors[0].outputSocket.getValue();
		}

		return null;
	};

	/**
	 * Connect this node socket to another socket.
	 *
	 * Sockets have to be compatible otherwise the connection cannot be made and an error will be thrown.
	 *
	 * @param {NodeSocket} socket Socket to be connected with this
	 * @return {NodeConnector} Node connector created.
	 */
	NodeSocket.prototype.connectTo = function(socket)
	{
		if(!this.isCompatible(socket))
		{
			throw new Error("Sockets are not compatible they cannot be connected.");
		}

		var connector = new NodeConnector();
		this.attachConnector(connector);
		socket.attachConnector(connector);
		return connector;
	};

	/**
	 * Attach a node connector to this socket. Sets the correct input/output attributes on the socket and the connector.
	 *
	 * Automatically adds the connector to the same parent and the node socket if no parent defined for the connector.
	 *
	 * @param {NodeConnector} connector Connector to be attached to this socket.
	 */
	NodeSocket.prototype.attachConnector = function(connector)
	{
		// If there is no space for a new connector delete the already existing connectors.
		if(!this.canAddConnector())
		{
			this.destroyConnectors();
		}

		// Attach the socket to the correct direction of the connector
		if(this.direction === NodeSocket.INPUT)
		{
			connector.inputSocket = this;
		}
		else if(this.direction === NodeSocket.OUTPUT)
		{
			connector.outputSocket = this;
		}

		// Add to the list connectors
		this.connectors.push(connector);
		if(connector.parent === null)
		{
			this.parent.add(connector);
		}
	};

	/**
	 * Check if this socket is compatible (type and direction) with another socket.
	 *
	 * For two sockets to be compatible the data flow should be correct (one input and a output) and they should carry the same data type.
	 *
	 * @param {NodeSocket} socket Socket to verify compatibility with.
	 * @return {boolean} Returns true if the two sockets are compatible.
	 */
	NodeSocket.prototype.isCompatible = function(socket)
	{
		return this.direction !== socket.direction && this.category === socket.category;
	};

	/**
	 * Check if this node socket can have a new connector attached to it.
	 *
	 * Otherwise it might be necessary to destroy old connectors before adding a new connector.
	 *
	 * @return {boolean} True if its possible to add a new connector to the socket, false otherwise.
	 */
	NodeSocket.prototype.canAddConnector = function()
	{
		return !(this.connectors.length > 0 && ((this.direction === NodeSocket.INPUT) || (this.direction === NodeSocket.OUTPUT && !this.multiple)));
	};

	/**
	 * Check if this socket can be connected with another socket, they have to be compatible and have space for a new connector.
	 *
	 * @param {NodeSocket} socket Socket to verify connectivity with.
	 * @return {boolean} Returns true if the two sockets can be connected.
	 */
	NodeSocket.prototype.canConnect = function(socket)
	{
		return this.isCompatible(socket) && this.canAddConnector();
	};

	/**
	 * Destroy a connector attached to this socket, calls the destroy() method of the connection.
	 */
	NodeSocket.prototype.removeConnector = function(connector)
	{
		var index = this.connectors.indexOf(connector);
		if(index !== -1)
		{
			this.connectors.splice(index, 1);
			connector.destroy();
		}
	};

	/**
	 * Destroy all connectors attached to this socket.
	 *
	 * Should be called when destroying the object or to clean up the object.
	 */
	NodeSocket.prototype.destroyConnectors = function()
	{
		for(var i = 0; i < this.connectors.length; i++)
		{
			this.connectors[i].destroy();
		}
	};

	NodeSocket.prototype.destroy = function()
	{
		Circle.prototype.destroy.call(this);

		this.destroyConnectors();
	};

	NodeSocket.prototype.onPointerDragStart = function(pointer, viewport)
	{
		this.creatingConnection = true;
		this.attachConnector(new NodeConnector());
	};

	NodeSocket.prototype.onPointerDrag = function(pointer, viewport, delta, position)
	{
		if(this.creatingConnection)
		{
			if(this.direction === NodeSocket.INPUT)
			{
				this.connectors[this.connectors.length - 1].from.copy(position);
			}
			else if(this.direction === NodeSocket.OUTPUT)
			{
				this.connectors[this.connectors.length - 1].to.copy(position);
			}
		}
	};

	NodeSocket.prototype.onPointerDragEnd = function(pointer, viewport)
	{
		if(this.creatingConnection)
		{
			var position = viewport.inverseMatrix.transformPoint(pointer.position);
			var objects = this.parent.getWorldPointIntersections(position);
			var found = false;

			for(var i = 0; i < objects.length; i++)
			{
				if(objects[i] instanceof NodeSocket)
				{
					if(this.isCompatible(objects[i]))
					{
						objects[i].attachConnector(this.connectors[this.connectors.length - 1]);
						found = true;
						break;
					}
				}
			}

			if(!found)
			{
				this.connectors[this.connectors.length - 1].destroy();
			}
		}

		this.creatingConnection = false;
	};

	NodeSocket.prototype.serialize = function(recursive)
	{
		var data = Circle.prototype.serialize.call(this, recursive);

		data.name = this.name;
		data.category = this.category;
		data.multiple = this.multiple;
		data.direction = this.direction;
		data.node = this.node.uuid;

		data.connectors = [];
		for(var i = 0; i < this.connectors.length; i++)
		{
			data.connectors.push(this.connectors[i].uuid);
		}

		return data;
	};

	NodeSocket.prototype.parse = function(data, root)
	{
		Circle.prototype.parse.call(this, data, root);

		this.name = data.name;
		this.category = data.category;
		this.multiple = data.multiple;
		this.direction = data.direction;

		this.node = root.getChildByUUID(data.node);
		for(var i = 0; i < data.connectors.length; i++)
		{
			this.connectors.push(root.getChildByUUID(data.connectors[i]));
		}
	};

	/**
	 * Node objects can be connected between them to create graphs.
	 *
	 * Each node contains inputs, outputs and a set of attributes containing their state. Inputs can be connected to outputs of other nodes, and vice-versa.
	 *
	 * This class implements node basic functionality, the logic to connect node and define inputs/outputs of the nodes.
	 *
	 * @class
	 * @extends {RoundedBox}
	 */
	function Node()
	{
		RoundedBox.call(this);

		this.draggable = true;

		/**
		 * List of inputs of the node.
		 *
		 * @type {NodeSocket[]}
		 */
		this.inputs = [];

		/**
		 * List of outputs of the node.
		 *
		 * @type {NodeSocket[]}
		 */
		this.outputs = [];
	}

	Node.prototype = Object.create(RoundedBox.prototype);
	Node.prototype.constructor = Node;
	Node.prototype.type = "Node";
	Object2D.register(Node, "Node");

	/**
	 * This method should be used for the node to register their socket inputs/outputs.
	 *
	 * It is called automatically after the node is added to the node graph to create sockets.
	 */
	Node.prototype.registerSockets = null;

	/**
	 * Add input to this node, can be connected to other nodes to receive data.
	 *
	 * @param {string} type Data type of the node socket.
	 * @param {string} name Name of the node socket.
	 * @return {NodeSocket} Node socket created for this node.
	 */
	Node.prototype.addInput = function(type, name)
	{
		var socket = new NodeSocket(this, NodeSocket.INPUT, type, name);
		this.inputs.push(socket);
		this.parent.add(socket);
		return socket;
	};

	/**
	 * Add output socket to this node, can be connected to other nodes to send data.
	 *
	 * @param {string} type Data type of the node socket.
	 * @param {string} name Name of the node socket.
	 * @return {NodeSocket} Node socket created for this node.
	 */
	Node.prototype.addOutput = function(type, name)
	{
		var socket = new NodeSocket(this, NodeSocket.OUTPUT, type, name);
		this.outputs.push(socket);
		this.parent.add(socket);
		return socket;
	};

	/**
	 * Get a output socket by its name. If there are multiple sockets with the same name only the first one found is returned.
	 *
	 * @param {string} name Name of the node socket to get.
	 * @return {NodeSocket} Node socket if it was found, null otherwise.
	 */
	Node.prototype.getOutput = function(name)
	{
		for(var i = 0; i < this.outputs.length; i++)
		{
			if(this.outputs[i].name === name)
			{
				return this.outputs[i];
			}
		}

		return null;
	};

	/**
	 * Get a input socket by its name. If there are multiple sockets with the same name only the first one found is returned.
	 *
	 * @param {string} name Name of the node socket to get.
	 * @return {NodeSocket} Node socket if it was found, null otherwise.
	 */
	Node.prototype.getInput = function(name)
	{
		for(var i = 0; i < this.inputs.length; i++)
		{
			if(this.inputs[i].name === name)
			{
				return this.inputs[i];
			}
		}

		return null;
	};

	Node.prototype.destroy = function()
	{
		RoundedBox.prototype.destroy.call(this);

		for(var i = 0; i < this.inputs.length; i++)
		{
			this.inputs[i].destroy();
		}

		for(var i = 0; i < this.outputs.length; i++)
		{
			this.outputs[i].destroy();
		}
	};

	Node.prototype.onUpdate = function()
	{
		var height = this.box.max.y - this.box.min.y;

		// Input hooks position
		var step = height / (this.inputs.length + 1);
		var start = this.box.min.y + step;

		for(var i = 0; i < this.inputs.length; i++)
		{
			this.inputs[i].position.set(this.position.x + this.box.min.x, this.position.y + (start + step * i));
		}

		// Output hooks position
		step = height / (this.outputs.length + 1);
		start = this.box.min.y + step;

		for(var i = 0; i < this.outputs.length; i++)
		{
			this.outputs[i].position.set(this.position.x + this.box.max.x, this.position.y + (start + step * i));
		}
	};

	Node.prototype.serialize = function(recursive)
	{
		var data = RoundedBox.prototype.serialize.call(this, recursive);

		data.inputs = [];
		for(var i = 0; i < this.inputs.length; i++)
		{
			data.inputs.push(this.inputs[i].uuid);
		}

		data.outputs = [];
		for(var i = 0; i < this.outputs.length; i++)
		{
			data.outputs.push(this.outputs[i].uuid);
		}

		return data;
	};

	Node.prototype.parse = function(data, root)
	{
		RoundedBox.prototype.parse.call(this, data, root);

		for(var i = 0; i < data.inputs.length; i++)
		{
			this.inputs.push(root.getChildByUUID(data.inputs[i]));
		}

		for(var i = 0; i < data.outputs.length; i++)
		{
			this.outputs.push(root.getChildByUUID(data.outputs[i]));
		}
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
			console.warn("escher.js: Helpers.boxResizeTool(), object box property missing.");
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
	 * File utils is used to read and write files.
	 *
	 * Can be used alongside with object serialization to store and load objects from file.
	 *
	 * @class
	 * @static
	 */
	function FileUtils(){}

	/**
	 * Read a local or remote file as text data.
	 *
	 * @param {string} fname Path or URL of the file being read.
	 * @param {Function} onLoad onLoad callback receives the read data as parameter.
	 * @param {Function} onError onError call is called when a error occurs while reading the file.
	 */
	FileUtils.read = function(fname, onLoad, onError)
	{
		var file = new XMLHttpRequest();
		file.overrideMimeType("text/plain");
		file.open("GET", fname, true);
		if(onLoad !== undefined)
		{
			file.onload = function()
			{
				onLoad(file.response);
			};
		}

		if(onError !== undefined)
		{
			file.onerror = onError;
		}

		file.send(null);
	};

	/**
	 * Write text to a file and automatically download it from blob storage.
	 *
	 * @method writeFile
	 * @param {string} fname Path of the file to write.
	 * @param {string} data Text data to be written to the file.
	 */
	FileUtils.write = function(fname, data)
	{
		var blob = new Blob([data], {type:"octet/stream"});
		var download = document.createElement("a");
		download.download = fname;
		download.href = window.URL.createObjectURL(blob);
		download.style.display = "none";
		download.onclick = function()
		{
			document.body.removeChild(this);
		};
		document.body.appendChild(download);
		download.click();
	};

	/**
	 * Open file chooser dialog window for the user to select files stored in the system.
	 *
	 * The files selected are retrieved using the onLoad callback that receives a array of File objects.
	 *
	 * @param {Function} onLoad onLoad callback that receives array of files as parameter.
	 * @param {string} filter File type filter (e.g. ".zip,.rar, etc)
	 */
	FileUtils.select = function(onLoad, filter)
	{
		var chooser = document.createElement("input");
		chooser.type = "file";
		chooser.style.display = "none";
		document.body.appendChild(chooser);

		if(filter !== undefined)
		{
			chooser.accept = filter;
		}

		chooser.onchange = function(event)
		{
			if(onLoad !== undefined)
			{
				onLoad(chooser.files);
			}

			document.body.removeChild(chooser);
		};

		chooser.click();
	};

	exports.AnimationTimer = AnimationTimer;
	exports.BarGraph = BarGraph;
	exports.BezierCurve = BezierCurve;
	exports.Box = Box;
	exports.Box2 = Box2;
	exports.BoxMask = BoxMask;
	exports.Circle = Circle;
	exports.ColorStyle = ColorStyle;
	exports.DOM = DOM;
	exports.EventManager = EventManager;
	exports.FileUtils = FileUtils;
	exports.Gauge = Gauge;
	exports.GradientColorStop = GradientColorStop;
	exports.GradientStyle = GradientStyle;
	exports.Graph = Graph;
	exports.Helpers = Helpers;
	exports.Image = Image;
	exports.Key = Key;
	exports.Line = Line;
	exports.LinearGradientStyle = LinearGradientStyle;
	exports.Mask = Mask;
	exports.Matrix = Matrix;
	exports.MultiLineText = MultiLineText;
	exports.Node = Node;
	exports.NodeConnector = NodeConnector;
	exports.NodeGraph = NodeGraph;
	exports.NodeSocket = NodeSocket;
	exports.Object2D = Object2D;
	exports.Path = Path;
	exports.Pattern = Pattern;
	exports.PatternStyle = PatternStyle;
	exports.PieChart = PieChart;
	exports.Pointer = Pointer;
	exports.QuadraticCurve = QuadraticCurve;
	exports.RadialGradientStyle = RadialGradientStyle;
	exports.Renderer = Renderer;
	exports.RoundedBox = RoundedBox;
	exports.ScatterGraph = ScatterGraph;
	exports.Style = Style$1;
	exports.Text = Text;
	exports.UUID = UUID;
	exports.Vector2 = Vector2;
	exports.Viewport = Viewport;
	exports.ViewportControls = ViewportControls;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
