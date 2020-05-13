import {Circle} from "../Circle";
import {Node} from "./Node";
import {NodeConnector} from "./NodeConnector";

/**
 * Represents a node hook point. Is attached to the node element and represented visually.
 *
 * Can be used as a node input, output or as a bidirectional connection.
 *
 * @class NodeSocket
 * @param {Node} node Node of this hook.
 * @param {number} direction Direction of the hook.
 */
function NodeSocket(node, direction)
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
NodeSocket.INPUT = 1;

/**
 * Output hook can only be connected to an input.
 *
 * Writes data to the output.
 *
 * @type {number}
 */
NodeSocket.OUTPUT = 2;

NodeSocket.prototype = Object.create(Circle.prototype);

/**
 * Attach a node connector to this socket. Sets the correct input/output attributes on the socket and the connector.
 *
 * Automatically adds the connector to the same parent and the node socket if no parent defined for the connector.
 *
 * @param {NodeConnector} connector Connector to be attached to this socket.
 */
NodeSocket.prototype.attachConnector = function(connector)
{
	if(this.direction === NodeSocket.INPUT)
	{
		connector.inputSocket = this;
	}
	else if(this.direction === NodeSocket.OUTPUT)
	{
		connector.outputSocket = this;
	}

	this.connector = connector;
	if(connector.parent === null)
	{
		this.parent.add(connector);
	}
};

/**
 * Check if this socket can be connected (is compatible) with another socket.
 *
 * For two sockets to be compatible the data flow should be correct (one input and a output) and they should carry the same data type.
 *
 * @param {NodeSocket} socket Socket to verify compatibility with.
 * @return {boolean} Returns true if the two sockets are compatible.
 */
NodeSocket.prototype.isCompatible = function(socket)
{
	return this.direction !== socket.direction && this.type === socket.type;
};


NodeSocket.prototype.onPointerDragStart = function(pointer, viewport)
{
	if(this.connector === null)
	{
		this.attachConnector(new NodeConnector());
	}
};

NodeSocket.prototype.onPointerDrag = function(pointer, viewport, delta, position)
{
	if(this.connector !== null)
	{
		if(this.direction === NodeSocket.INPUT)
		{
			this.connector.from.copy(position);
		}
		else if(this.direction === NodeSocket.OUTPUT)
		{
			this.connector.to.copy(position);
		}
	}
};

NodeSocket.prototype.onPointerDragEnd = function(pointer, viewport)
{
	if(this.connector !== null)
	{
		var position = viewport.inverseMatrix.transformPoint(pointer.position);
		var objects = this.parent.getWorldPointIntersections(position);
		var found = false;

		for(var i = 0; i < objects.length; i++)
		{
			if(objects[i] instanceof NodeSocket)
			{
				if(this.direction !== objects[i].direction && this.type === objects[i].type)
				{
					objects[i].attachConnector(this.connector);
					found = true;
					break;
				}
			}
		}

		if(!found)
		{
			this.connector.destroy();
			this.connector = null;
		}

		// TODO <REMOVE THIS>
		console.log("Finished drag.", objects);
	}
};

export {NodeSocket};
