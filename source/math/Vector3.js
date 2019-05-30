"use strict";

function Vector3(x, y, z)
{
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}

Object.assign(Vector3.prototype,
{
	set: function(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	},

	setScalar: function(scalar)
	{
		this.x = scalar;
		this.y = scalar;
		this.z = scalar;
	},

	clone: function()
	{
		return new Vector3(this.x, this.y, this.z);
	},

	copy: function(v)
	{
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
	},

	add: function(v, w)
	{
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
	},

	addScalar: function(s)
	{
		this.x += s;
		this.y += s;
		this.z += s;
	},

	addVectors: function(a, b)
	{
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
	},

	addScaledVector: function(v, s)
	{
		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;
	},

	sub: function(v, w)
	{
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
	},

	subScalar: function(s)
	{

		this.x -= s;
		this.y -= s;
		this.z -= s;
	},

	subVectors: function(a, b)
	{

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
	},

	multiply: function(v, w)
	{
		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;
	},

	multiplyScalar: function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
	},

	multiplyVectors: function(a, b)
	{
		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;
	},

	divide: function(v)
	{
		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;
	},

	divideScalar: function(scalar)
	{
		return this.multiplyScalar(1 / scalar);
	},

	min: function(v)
	{
		this.x = Math.min(this.x, v.x);
		this.y = Math.min(this.y, v.y);
		this.z = Math.min(this.z, v.z);
	},

	max: function(v)
	{
		this.x = Math.max(this.x, v.x);
		this.y = Math.max(this.y, v.y);
		this.z = Math.max(this.z, v.z);
	},

	clamp: function(min, max)
	{
		// assumes min < max, componentwise

		this.x = Math.max(min.x, Math.min(max.x, this.x));
		this.y = Math.max(min.y, Math.min(max.y, this.y));
		this.z = Math.max(min.z, Math.min(max.z, this.z));
	},

	clampScalar: function(minVal, maxVal)
	{
		this.x = Math.max(minVal, Math.min(maxVal, this.x));
		this.y = Math.max(minVal, Math.min(maxVal, this.y));
		this.z = Math.max(minVal, Math.min(maxVal, this.z));
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
		this.z = Math.floor(this.z);
	},

	ceil: function()
	{
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		this.z = Math.ceil(this.z);
	},

	round: function()
	{
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		this.z = Math.round(this.z);
	},

	roundToZero: function()
	{
		this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
		this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
		this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
	},

	negate: function()
	{
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
	},

	dot: function(v)
	{
		return this.x * v.x + this.y * v.y + this.z * v.z;
	},

	lengthSquared: function()
	{
		return this.x * this.x + this.y * this.y + this.z * this.z;
	},

	length: function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	},

	manhattanLength: function()
	{
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	},

	normalize: function()
	{
		return this.divideScalar(this.length() || 1);
	},

	setLength: function(length)
	{
		return this.normalize().multiplyScalar(length);
	},

	lerp: function(v, alpha)
	{
		this.x += (v.x - this.x) * alpha;
		this.y += (v.y - this.y) * alpha;
		this.z += (v.z - this.z) * alpha;
	},

	lerpVectors: function(v1, v2, alpha)
	{
		return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
	},

	cross: function(v, w)
	{
		return this.crossVectors(this, v);
	},

	crossVectors: function(a, b)
	{

		var ax = a.x,
			ay = a.y,
			az = a.z;
		var bx = b.x,
			by = b.y,
			bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;
	},

	projectOnVector: function(vector)
	{
		var scalar = vector.dot(this) / vector.lengthSq();

		return this.copy(vector).multiplyScalar(scalar);
	},

	/**
	 * Reflect incident vector off plane orthogonal to normal, normal is assumed to have unit length.
	 */
	reflect: function()
	{
		var v1 = new Vector3();

		return function reflect(normal)
		{
			return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
		};

	}(),

	angleTo: function(v)
	{
		var theta = this.dot(v) / (Math.sqrt(this.lengthSq() * v.lengthSq()));
		return Math.acos(theta);
	},

	distanceTo: function(v)
	{
		return Math.sqrt(this.distanceToSquared(v));
	},

	distanceToSquared: function(v)
	{
		var dx = this.x - v.x,
			dy = this.y - v.y,
			dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;
	},

	manhattanDistanceTo: function(v)
	{
		return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
	},

	setFromSpherical: function(s)
	{
		return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
	},

	setFromSphericalCoords: function(radius, phi, theta)
	{
		var sinPhiRadius = Math.sin(phi) * radius;

		this.x = sinPhiRadius * Math.sin(theta);
		this.y = Math.cos(phi) * radius;
		this.z = sinPhiRadius * Math.cos(theta);
	},

	setFromCylindrical: function(c)
	{
		return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
	},

	setFromCylindricalCoords: function(radius, theta, y)
	{
		this.x = radius * Math.sin(theta);
		this.y = y;
		this.z = radius * Math.cos(theta);
	},

	setFromMatrixPosition: function(m)
	{
		var e = m.elements;

		this.x = e[12];
		this.y = e[13];
		this.z = e[14];
	},

	equals: function(v)
	{
		return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
	},

	fromArray: function(array, offset)
	{
		if(offset === undefined) offset = 0;

		this.x = array[offset];
		this.y = array[offset + 1];
		this.z = array[offset + 2];
	},

	toArray: function(array, offset)
	{
		if(array === undefined) array = [];
		if(offset === undefined) offset = 0;

		array[offset] = this.x;
		array[offset + 1] = this.y;
		array[offset + 2] = this.z;

		return array;
	}
});

//export {Vector3};
