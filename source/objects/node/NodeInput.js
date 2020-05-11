import {Circle} from "../Circle";

/**
 * TODO
 *
 * @class NodeInput
 */
function NodeInput()
{
	Circle.call(this);

}

NodeInput.prototype = Object.create(Circle.prototype);

export {NodeInput};
