import {Box} from "../Box";

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
	this.add(hook);
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
	this.add(hook);
};


Node.prototype.draw = function(context, viewport, canvas)
{
	// Position the hooks in the box.
	// TODO <ADD CODE HERE>

	Box.prototype.draw.call(this, context, viewport, canvas);
};

export {Node};
