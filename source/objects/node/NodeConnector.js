import {BezierCurve} from "../BezierCurve";
import {Object2D} from "../../Object2D";
import {NodeGraph} from "./NodeGraph";

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

	/**
	 * Width of the connector line.
	 * 
	 * @type {number}
	 */
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

export {NodeConnector};
