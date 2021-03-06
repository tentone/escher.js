import {NodeSocket} from "./NodeSocket";
import {RoundedBox} from "../RoundedBox";
import {Object2D} from "../../Object2D";

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

export {Node};
