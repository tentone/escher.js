import {Object2D} from "../../Object2D";
import {Node} from "./Node";

/**
 * Node graph object should be used as a container for node elements.
 *
 * The node graph object specifies how the nodes are processed, each individual node can store and process data, the node graph specified how this information is processed.
 *
 * All node elements are stored as children of the node graph.
 *
 * @class
 * @extends {Object2D}
 */
function NodeGraph()
{
	Object2D.call(this);
}

NodeGraph.prototype = Object.create(Object2D.prototype);
NodeGraph.prototype.constructor = NodeGraph;
NodeGraph.prototype.type = "NodeGraph";
Object2D.register(NodeGraph, "NodeGraph");

/**
 * Create and add a new node of specific node type to the graph.
 *
 * Automatically finds an empty space as close as possible to other nodes to add this new node.
 *
 * @param {Node} node Node object to be added.
 * @return {Node} Node created (already added to the graph).
 */
NodeGraph.prototype.addNode = function(node)
{
	// Check available position on screen.
	var x = 0, y = 0;
	for(var i = 0; i < this.children.length; i++)
	{
		if(this.children[i].position.x > x)
		{
			x = this.children[i].position.x;
		}
		if(this.children[i].position.y > y)
		{
			y = this.children[i].position.y;
		}
	}

	// Create and add new node
	node.position.set(x + 200, y / 2.0);
	this.add(node);

	if(node.registerSockets !== null)
	{
		node.registerSockets();
	}

	return node;
};

export {NodeGraph};
