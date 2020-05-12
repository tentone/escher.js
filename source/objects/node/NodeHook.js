import {Circle} from "../Circle";
import {Node} from "./Node";

/**
 * Represents a node hook point. Is attached to the node element and represented visually.
 *
 * Can be used as a node input, output or as a bidirectional connection.
 *
 * @class NodeHook
 * @param {Node} node Node of this hook.
 * @param {number} direction Direction of the hook.
 */
function NodeHook(node, direction)
{
	Circle.call(this);

	/**
	 * If set true the hook can be connected to multiple hooks.
	 *
	 * @type {boolean}
	 */
	this.multiple = false;

	/**
	 * Direction of the node hook.
	 *
	 * @type {number}
	 */
	this.direction = direction;

	/**
	 * Type of hook. Hooks of the same type can be connected.
	 *
	 * @type {string}
	 */
	this.type = "";

	/**
	 * Node where this input element in attached.
	 *
	 * @type {Node}
	 */
	this.node = node;
}

/**
 * Input hook can only be connected to an output.
 *
 * Is used to read data from the output.
 *
 * @type {number}
 */
NodeHook.INPUT = 1;

/**
 * Output hook can only be connected to an input.
 *
 * Writes data to the output.
 *
 * @type {number}
 */
NodeHook.OUTPUT = 2;

/**
 * Bidirectional hook can be connected to any type of hook.
 *
 * Can be used to write and read from inputs and/or outputs.
 *
 * @type {number}
 */
NodeHook.BIDIRECTIONAL = 3;

NodeHook.prototype = Object.create(Circle.prototype);

export {NodeHook};
