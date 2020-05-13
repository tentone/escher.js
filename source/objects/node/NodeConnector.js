import {BezierCurve} from "../BezierCurve";

/**
 * Node connector is used to connect a output of a node to a input of another node.
 *
 * Some nodes inputs/outputs might support just one or multiple connections.
 *
 * @class NodeConnector
 */
function NodeConnector()
{
	BezierCurve.call(this);

	this.lineWidth = 2;

	/**
	 * Origin hook that is attached to a node.
	 *
	 * @type {NodeSocket}
	 */
	this.outputSocket = null;

	/**
	 * Destination hook that is attached to a node.
	 *
	 * @type {NodeSocket}
	 */
	this.inputSocket = null;
}

NodeConnector.prototype = Object.create(BezierCurve.prototype);

NodeConnector.prototype.destroy = function()
{
	if(this.outputSocket !== null)
	{
		this.outputSocket.connector = null;
	}

	if(this.inputSocket !== null)
	{
		this.inputSocket.connector = null;
	}

	BezierCurve.prototype.destroy.call(this);
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


export {NodeConnector};
