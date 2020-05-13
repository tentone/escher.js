import {Box} from "../Box";
import {NodeSocket} from "./NodeSocket";
import {RoundedBox} from "../RoundedBox";

/**
 * Node objects can be connected between them to create graphs.
 *
 * Each node contains inputs, outputs and a set of attributes containing their state. Inputs can be connected to outputs of other nodes, and vice-versa.
 *
 * This class implements node basic functionality, the logic to connected node and define inputs/outputs of the nodes.
 *
 * @class Node
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

export {Node};
