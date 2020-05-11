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

	// TODO <ADD CODE HERE>
}

NodeConnector.prototype = Object.create(BezierCurve.prototype);

export {NodeConnector};
