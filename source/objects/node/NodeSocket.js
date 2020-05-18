import {Circle} from "../Circle";
import {Node} from "./Node";
import {NodeConnector} from "./NodeConnector";
import {Text} from "../Text";
import {Object2D} from "../../Object2D";

/**
 * Represents a node hook point. Is attached to the node element and represented visually.
 *
 * Can be used as a node input, output or as a bidirectional connection.
 *
 * @class
 * @extends {Circle}
 * @param {Node} node Node of this hook.
 * @param {number} direction Direction of the hook.
 * @param {string} category Data category of the node socket.
 * @param {string} name Name of the node socket.
 */
function NodeSocket(node, direction, category, name)
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
	 * Category of data available from this socket. Only sockets of the same category can be connected.
	 *
	 * Should directly store the data type name (e.g. "string", "number", "Object", etc).
	 *
	 * @type {string}
	 */
	this.category = category !== undefined ? category : "";

	/**
	 * Allow to connect a OUTPUT node to multiple INPUT sockets.
	 *
	 * A INPUT socket can only take one connection, this value is ignored for INPUT sockets.
	 *
	 * @type {boolean}
	 */
	this.multiple = true;

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
	 * Can be used to access the adjacent node. If the socket allows for multiple connections this array can have multiple elements.
	 *
	 * @type {NodeConnector[]}
	 */
	this.connectors = [];

	/**
	 * Indicates if the user is currently creating a new connection from this node socket.
	 *
	 * @type {boolean}
	 */
	this.creatingConnection = false;

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
NodeSocket.prototype.type = "NodeSocket";

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
	// If the node is an input get its value from the output socket of the connection.
	if(this.direction === NodeSocket.INPUT && this.connectors.length > 0 && this.connectors[0].outputSocket !== null)
	{
		return this.connectors[0].outputSocket.getValue();
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
	// If there is no space for a new connector delete the already existing connectors.
	if(!this.canAddConnector())
	{
		this.destroyConnectors();
	}

	// Attach the socket to the correct direction of the connector
	if(this.direction === NodeSocket.INPUT)
	{
		connector.inputSocket = this;
	}
	else if(this.direction === NodeSocket.OUTPUT)
	{
		connector.outputSocket = this;
	}

	// Add to the list connectors
	this.connectors.push(connector);
	if(connector.parent === null)
	{
		this.parent.add(connector);
	}
};

/**
 * Check if this socket is compatible (type and direction) with another socket.
 *
 * For two sockets to be compatible the data flow should be correct (one input and a output) and they should carry the same data type.
 *
 * @param {NodeSocket} socket Socket to verify compatibility with.
 * @return {boolean} Returns true if the two sockets are compatible.
 */
NodeSocket.prototype.isCompatible = function(socket)
{
	return this.direction !== socket.direction && this.category === socket.category;
};

/**
 * Check if this node socket can have a new connector attached to it.
 *
 * Otherwise it might be necessary to destroy old connectors before adding a new connector.
 *
 * @return {boolean} True if its possible to add a new connector to the socket, false otherwise.
 */
NodeSocket.prototype.canAddConnector = function()
{
	return !(this.connectors.length > 0 && ((this.direction === NodeSocket.INPUT) || (this.direction === NodeSocket.OUTPUT && !this.multiple)));
};

/**
 * Check if this socket can be connected with another socket, they have to be compatible and have space for a new connector.
 *
 * @param {NodeSocket} socket Socket to verify connectivity with.
 * @return {boolean} Returns true if the two sockets can be connected.
 */
NodeSocket.prototype.canConnect = function(socket)
{
	return this.isCompatible(socket) && this.canAddConnector();
};

/**
 * Destroy a connector attached to this socket, calls the destroy() method of the connection.
 */
NodeSocket.prototype.removeConnector = function(connector)
{
	var index = this.connectors.indexOf(connector);
	if(index !== -1)
	{
		this.connectors.splice(index, 1);
		connector.destroy();
	}
};

/**
 * Destroy all connectors attached to this socket.
 *
 * Should be called when destroying the object or to clean up the object.
 */
NodeSocket.prototype.destroyConnectors = function()
{
	for(var i = 0; i < this.connectors.length; i++)
	{
		this.connectors[i].destroy();
	}
};

NodeSocket.prototype.destroy = function()
{
	Circle.prototype.destroy.call(this);

	this.destroyConnectors();
};

NodeSocket.prototype.onPointerDragStart = function(pointer, viewport)
{
	if(this.connectors.length === 0)
	{
		this.creatingConnection = true;
		this.attachConnector(new NodeConnector());
	}
};

NodeSocket.prototype.onPointerDrag = function(pointer, viewport, delta, position)
{
	if(this.creatingConnection)
	{
		if(this.direction === NodeSocket.INPUT)
		{
			this.connectors[this.connectors.length - 1].from.copy(position);
		}
		else if(this.direction === NodeSocket.OUTPUT)
		{
			this.connectors[this.connectors.length - 1].to.copy(position);
		}
	}
};

NodeSocket.prototype.onPointerDragEnd = function(pointer, viewport)
{
	if(this.creatingConnection)
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
					objects[i].attachConnector(this.connectors[this.connectors.length - 1]);
					found = true;
					break;
				}
			}
		}

		if(!found)
		{
			this.connectors[this.connectors.length - 1].destroy();
		}
	}

	this.creatingConnection = false;
};

NodeSocket.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	data.name = this.name;
	data.category = this.category;
	data.multiple = this.multiple;
	data.direction = this.direction;
	data.node = this.node.uuid;

	data.connectors = [];
	for(var i = 0; i < this.connectors.length; i++)
	{
		data.connectors.push(this.connectors[i].uuid);
	}

	return data;
};

NodeSocket.prototype.parse = function(data, root)
{
	Object2D.prototype.parse.call(this, data);

	this.name = data.name;
	this.category = data.category;
	this.multiple = data.multiple;
	this.direction = data.direction;

	this.node = root.getChildByUUID(data.node);
	for(var i = 0; i < data.connectors.length; i++)
	{
		this.connectors.push(root.getChildByUUID(data.connectors[i]));
	}
};

export {NodeSocket};
