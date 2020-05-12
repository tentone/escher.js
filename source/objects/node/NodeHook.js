import {Circle} from "../Circle";
import {Node} from "./Node";

/**
 * Represents a node hook point. Is attached to the node element and represented visually.
 *
 * Can be used as a node input, output or as a bidirectional connection.
 *
 * @class NodeHook
 */
function NodeHook(node)
{
	Circle.call(this);

	/**
	 * Direction of the node hook.
	 */
	this.direction = NodeHook.INPUT;

	/**
	 * Node where this input element in attached.
	 *
	 * @type {Node}
	 */
	this.node = null;
}

NodeHook.INPUT = 1;
NodeHook.OUTPUT = 2;
NodeHook.BIDIRECTIONAL = 3;

NodeHook.prototype = Object.create(Circle.prototype);

export {NodeHook};
