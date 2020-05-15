import {Circle} from "../Circle";
import {Node} from "./Node";
import {NodeConnector} from "./NodeConnector";
import {Text} from "../Text";
import {NodeGraph} from "./NodeGraph";

/**
 * Represents a node hook point. Is attached to the node element and represented visually.
 *
 * Can be used as a node input, output or as a bidirectional connection.
 *
 * @class
 * @extends {Circle}
 * @param {Node} node Node of this hook.
 * @param {number} direction Direction of the hook.
 * @param {string} type Data type of the node socket.
 * @param {string} name Name of the node socket.
 */
function NodeSocket(node, direction, type, name)
{
	Circle.call(this);

	this.draggable = true;
	this.radius = 6;
	this.layer = 1;

	/**
	 * Name of the socket presented to the user.
	 *
	 * @type {string}
	 */
	this.name = name !== undefined ? name : "";

	/**
	 * Type of data available from this socket. Only sockets of the same type can be connected.
	 *
	 * Should directly store the data type name (e.g. "string", "number", "Object", etc).
	 *
	 * @type {string}
	 */
	this.type = type !== undefined ? type : "";

	/**
	 * Direction of the node hook, indicates the data flow of the socket.
	 *
	 * Can be INPUT or OUTPUT.
	 *
	 * @type {number}
	 */
	this.direction = direction;

	/**
	 * Node where this socket is attached to.
	 *
	 * Should be used to get data from node GUI and from other sockets.
	 *
	 * @type {Node}
	 */
	this.node = node;

	/**
	 * Node connector used to connect this socket to another node socket.
	 *
	 * Can be used to access the adjacent node.
	 *
	 * @type {NodeConnector}
	 */
	this.connector = null;

	/**
	 * Text object used to present the name of the socket.
	 *
	 * Depending on the socket direction the text is aligned to the left or to the right.
	 *
	 * @type {Text}
	 */
	this.text = new Text();
	this.text.text = this.name;
	if(this.direction === NodeSocket.INPUT)
	{
		this.text.position.x -= 10;
		this.text.textAlign = "right";
	}
	else if(this.direction === NodeSocket.OUTPUT)
	{
		this.text.position.x += 10;
		this.text.textAlign = "left";
	}
	this.add(this.text);
}

NodeSocket.prototype = Object.create(Circle.prototype);
NodeSocket.prototype.constructor = NodeSocket;

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

/**
 * Get value stored or calculated in node socket, it should be the calculated from node logic, node inputs, user input, etc.
 *
 * For input nodes the value should be fetched trough the connector object that is connected to an output node elsewhere.
 *
 * By default it the socket is an INPUT it gets the value trough the connector if available. Inputs will recursively propagate the method trough the graph to get their value.
 *
 * If the socket is an OUTPUT or there is no connection the method returns null by default, in this case the method should be extended by implementations of this class to process data.
 *
 * @return {Object} Return data calculated from the node.
 */
NodeSocket.prototype.getValue = function()
{
	if(this.direction === NodeSocket.INPUT && this.connector !== null && this.connector.outputSocket !== null)
	{
		return this.connector.outputSocket.getValue();
	}

	return null;
};

/**
 * Connect this node socket to another socket.
 *
 * Sockets have to be compatible otherwise the connection cannot be made and an error will be thrown.
 *
 * @param {NodeSocket} socket Socket to be connected with this
 * @return {NodeConnector} Node connector created.
 */
NodeSocket.prototype.connectTo = function(socket)
{
	if(!this.isCompatible(socket))
	{
		throw new Error("Sockets are not compatible they cannot be connected.");
	}

	var connector = new NodeConnector();
	this.attachConnector(connector);
	socket.attachConnector(connector);
	return connector;
};

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

NodeSocket.prototype.destroy = function()
{
	Circle.prototype.destroy.call(this);

	if(this.connector !== null)
	{
		this.connector.destroy();
	}
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
				if(this.isCompatible(objects[i]))
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
		}
	}
};

export {NodeSocket};
