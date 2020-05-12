import {Circle} from "../Circle";
import {Node} from "./Node";
import {NodeConnector} from "./NodeConnector";
import {Object2D} from "../../Object2D";

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

	this.draggable = true;

	this.radius = 6;
	this.layer = 1;

	/**
	 * Name of the hook presented to the user.
	 */
	this.name = "";

	/**
	 * Type of hook. Hooks of the same type can be connected.
	 *
	 * @type {string}
	 */
	this.type = "";

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
	 * Node where this input element in attached.
	 *
	 * @type {Node}
	 */
	this.node = node;

	/**
	 * Node connector used to connect this hook to another node hook.
	 *
	 * @type {NodeConnector}
	 */
	this.connector = null;
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

NodeHook.prototype.onButtonPressed = function()
{
	if(this.connector === null)
	{
		// TODO <REMOVE THIS>
		console.log("Create a new connector.")

		var connector = new NodeConnector();
		if(this.direction === NodeHook.INPUT)
		{
			connector.inputHook = this;
		}
		else if(this.direction === NodeHook.OUTPUT)
		{
			connector.outputHook = this;
		}

		this.connector = connector;
		this.node.parent.add(connector);
	}
};

NodeHook.prototype.onPointerDrag = function(pointer, viewport, delta)
{
	if(this.connector !== null)
	{
		// TODO <REMOVE THIS>
		console.log("Dragging around");
	}
};

NodeHook.prototype.onPointerDragEnd = function(pointer, viewport)
{
	if(this.connector !== null)
	{
		// TODO <REMOVE THIS>
		console.log("Finished drag.");
	}
};

export {NodeHook};
