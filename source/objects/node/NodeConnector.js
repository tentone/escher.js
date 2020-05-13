import {Line} from "../Line";

/**
 * Node connector is used to connect a output of a node to a input of another node.
 *
 * Some nodes inputs/outputs might support just one or multiple connections.
 *
 * @class NodeConnector
 */
function NodeConnector()
{
	Line.call(this);

	/**
	 * Origin hook that is attached to a node.
	 *
	 * @type {NodeSocket}
	 */
	this.outputSocket = null;

	/**
	 * Destination hook that is attached to a node.
	 *
	 * @type {NodeSocket}
	 */
	this.inputSocket = null;
}

NodeConnector.prototype = Object.create(Line.prototype);

NodeConnector.prototype.destroy = function()
{
	Line.prototype.destroy.call(this);

	// TODO <REMOVE FROM HOOKS>
};

NodeConnector.prototype.onUpdate = function()
{
	if(this.outputSocket !== null)
	{
		this.from.copy(this.outputSocket.position);
	}

	if(this.inputSocket !== null)
	{
		this.to.copy(this.inputSocket.position);
	}
};


export {NodeConnector};
