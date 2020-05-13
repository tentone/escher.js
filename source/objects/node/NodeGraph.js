import {Object2D} from "../../Object2D";

/**
 * Node graph object should be used as a container for node elements.
 *
 * The node graph object specifies how the nodes are processed, each individual node can store and process data, the node graph specified how this information is processed.
 *
 * All node elements are stored as children of the node graph.
 *
 * @class NodeGraph
 */
function NodeGraph()
{
	Object2D.call(this);

	// TODO <ADD CODE HERE>
}

NodeGraph.prototype = Object.create(Object2D.prototype);

export {NodeGraph};
