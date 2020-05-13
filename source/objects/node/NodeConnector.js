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
	 * @type {NodeHook}
	 */
	this.outputHook = null;

	/**
	 * Destination hook that is attached to a node.
	 *
	 * @type {NodeHook}
	 */
	this.inputHook = null;
}

NodeConnector.prototype = Object.create(Line.prototype);

NodeConnector.prototype.draw = function(context, viewport, canvas)
{
	if(this.outputHook !== null)
	{
		this.from.copy(this.outputHook.position);
	}

	if(this.inputHook !== null)
	{
		this.to.copy(this.inputHook.position);
	}

	Line.prototype.draw.call(this, context, viewport, canvas);
};


export {NodeConnector};
