import {BezierCurve} from "../BezierCurve";
import {Box} from "../Box";
import {Node} from "./Node";

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
	this.outputHook = null;

	/**
	 * Destination hook that is attached to a node.
	 *
	 * @type {NodeHook}
	 */
	this.inputHook = null;
}

NodeConnector.prototype = Object.create(BezierCurve.prototype);

NodeConnector.prototype.draw = function(context, viewport, canvas)
{
	// TODO <SET POSITIONS>

	BezierCurve.prototype.draw.call(this, context, viewport, canvas);
};


export {NodeConnector};
