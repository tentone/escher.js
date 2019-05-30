"use strict";

function Vector2(x, y)
{
	this.x = x || 0;
	this.y = y || 0;
}

Object.assign(Vector2.prototype,
{
	isVector2: true,

	set: function(x, y)
	{
		this.x = x;
		this.y = y;
	},

	setScalar: function(scalar)
	{
		this.x = scalar;
		this.y = scalar;
	},

	clone: function()
	{
		return new Vector2(this.x, this.y);
	},

	copy: function(v)
	{
		this.x = v.x;
		this.y = v.y;
	},

	add: function(v, w)
	{
		this.x += v.x;
		this.y += v.y;
	},

	addScalar: function(s)
	{
		this.x += s;
		this.y += s;
	},

	addVectors: function(a, b)
	{
		this.x = a.x + b.x;
		this.y = a.y + b.y;
	},

	addScaledVector: function(v, s)
	{
		this.x += v.x * s;
		this.y += v.y * s;
	},

	sub: function(v, w)
	{
		this.x -= v.x;
		this.y -= v.y;
	},

	subScalar: function(s)
	{
		this.x -= s;
		this.y -= s;
	},

	subVectors: function(a, b)
	{
		this.x = a.x - b.x;
		this.y = a.y - b.y;
	},

	multiply: function(v)
	{
		this.x *= v.x;
		this.y *= v.y;
	},

	multiplyScalar: function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
	},

	divide: function(v)
	{
		this.x /= v.x;
		this.y /= v.y;
	},

	divideScalar: function(scalar)
	{
		return this.multiplyScalar(1 / scalar);
	},

	applyMatrix3: function(m)
	{
		var x = this.x,
			y = this.y;
		var e = m.elements;

		this.x = e[0] * x + e[3] * y + e[6];
		this.y = e[1] * x + e[4] * y + e[7];
	},

	min: function(v)
	{
		this.x = Math.min(this.x, v.x);
		this.y = Math.min(this.y, v.y);
	},

	max: function(v)
	{
		this.x = Math.max(this.x, v.x);
		this.y = Math.max(this.y, v.y);
	},

	clamp: function(min, max)
	{
		// assumes min < max, componentwise
		this.x = Math.max(min.x, Math.min(max.x, this.x));
		this.y = Math.max(min.y, Math.min(max.y, this.y));
	},

	clampScalar: function(minVal, maxVal)
	{

		this.x = Math.max(minVal, Math.min(maxVal, this.x));
		this.y = Math.max(minVal, Math.min(maxVal, this.y));
	},

	clampLength: function(min, max)
	{
		var length = this.length();
		return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
	},

	floor: function()
	{

		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
	},

	ceil: function()
	{

		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
	},

	round: function()
	{

		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
	},

	roundToZero: function()
	{

		this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
		this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
	},

	negate: function()
	{
		this.x = -this.x;
		this.y = -this.y;

		return this;
	},

	dot: function(v)
	{
		return this.x * v.x + this.y * v.y;
	},

	cross: function(v)
	{
		return this.x * v.y - this.y * v.x;
	},

	lengthSq: function()
	{
		return this.x * this.x + this.y * this.y;
	},

	length: function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},

	manhattanLength: function()
	{
		return Math.abs(this.x) + Math.abs(this.y);
	},

	normalize: function()
	{
		return this.divideScalar(this.length() || 1);
	},

	/**
	 * Computes the angle in radians with respect to the positive x-axis
	 */
	angle: function()
	{
		var angle = Math.atan2(this.y, this.x);

		if(angle < 0) angle += 2 * Math.PI;

		return angle;
	},

	distanceTo: function(v)
	{
		return Math.sqrt(this.distanceToSquared(v));
	},

	distanceToSquared: function(v)
	{
		var dx = this.x - v.x,
			dy = this.y - v.y;
		return dx * dx + dy * dy;
	},

	manhattanDistanceTo: function(v)
	{
		return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
	},

	setLength: function(length)
	{
		return this.normalize().multiplyScalar(length);
	},

	lerp: function(v, alpha)
	{
		this.x += (v.x - this.x) * alpha;
		this.y += (v.y - this.y) * alpha;
	},

	lerpVectors: function(v1, v2, alpha)
	{
		return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
	},

	equals: function(v)
	{
		return ((v.x === this.x) && (v.y === this.y));
	},

	fromArray: function(array, offset)
	{
		if(offset === undefined) offset = 0;

		this.x = array[offset];
		this.y = array[offset + 1];
	},

	toArray: function(array, offset)
	{
		if(array === undefined) array = [];
		if(offset === undefined) offset = 0;

		array[offset] = this.x;
		array[offset + 1] = this.y;

		return array;
	},

	rotateAround: function(center, angle)
	{
		var c = Math.cos(angle),
			s = Math.sin(angle);

		var x = this.x - center.x;
		var y = this.y - center.y;

		this.x = x * c - y * s + center.x;
		this.y = x * s + y * c + center.y;
	}
});

//export {Vector2};
