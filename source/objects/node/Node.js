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

	this.inputs = [];

	this.outputs = [];

}

Node.prototype = Object.create(Box.prototype);

export {Node};
