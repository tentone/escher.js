import {Box} from "../Box";
import {Vector2} from "../../math/Vector2";
import {NodeHook} from "./NodeHook";

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
	Box.call(this);

	this.draggable = true;

	/**
	 * List of inputs of the node.
	 *
	 * @type {NodeHook[]}
	 */
	this.inputs = [];

	/**
	 * List of outputs of the node.
	 *
	 * @type {NodeHook[]}
	 */
	this.outputs = [];
}

Node.prototype = Object.create(Box.prototype);

/**
 * Add input to this node.
 *
 * @param type
 */
Node.prototype.addInput = function(type)
{
	var hook = new NodeHook(this, NodeHook.INPUT);
	hook.type = type;
	this.inputs.push(hook);
	this.parent.add(hook);
};

/**
 * Add output hook to this node.
 *
 * @param type
 */
Node.prototype.addOutput = function(type)
{
	var hook = new NodeHook(this, NodeHook.OUTPUT);
	hook.type = type;
	this.outputs.push(hook);
	this.parent.add(hook);
};

Node.prototype.draw = function(context, viewport, canvas)
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
	var step = height / (this.outputs.length + 1);
	var start = this.box.min.y + step;

	for(var i = 0; i < this.outputs.length; i++)
	{
		this.outputs[i].position.set(this.position.x + this.box.max.x, this.position.y + (start + step * i));
	}

	Box.prototype.draw.call(this, context, viewport, canvas);
};

export {Node};
