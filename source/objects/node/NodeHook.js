import {Circle} from "../Circle";
import {Node} from "./Node";

/**
 * Represents a node input point. Is attached to the node element and represented visually.
 *
 * @class NodeInput
 */
function NodeInput(node)
{
	Circle.call(this);

	/**
	 * Direction of the node hook.
	 */
	this.direction = NodeInput.INPUT;
	
	/**
	 * Node where this input element in attached.
	 *
	 * @type {Node}
	 */
	this.node = null;
}

NodeInput.INPUT = 1;
NodeInput.OUTPUT = 2;

NodeInput.prototype = Object.create(Circle.prototype);

export {NodeInput};
