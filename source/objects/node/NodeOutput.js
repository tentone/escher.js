import {Circle} from "../Circle";

/**
 * TODO
 *
 * @class NodeInput
 */
function NodeOutput()
{
	Circle.call(this);

}

NodeOutput.prototype = Object.create(Circle.prototype);

export {NodeOutput};
