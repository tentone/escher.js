import {BezierCurve} from "../BezierCurve";

/**
 * Node connector is used to connect a output of a node to a input of another node.
 *
 * Some nodes inputs/outputs might support just one or multiple connections.
 *
 * @class NodeConnector
 */
function NodeConnector()
{
	BezierCurve.call(this);

	/**
	 * Origin hook that is attached to a node.
	 *
	 * @type {NodeHook}
	 */
	this.origin = null;

	/**
	 * Destination hook that is attached to a node.
	 *
	 * @type {NodeHook}
	 */
	this.destination = null;
}

NodeConnector.prototype = Object.create(BezierCurve.prototype);

export {NodeConnector};
