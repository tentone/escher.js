import {Object2D} from "../../Object2D.js";
import {Vector2} from "../../math/Vector2.js";
import {Box2} from "../../math/Box2.js";

/**
 * Gauge object is used to draw gauge like graphic.
 *
 * It has a defined range, value animation and style controls.
 *
 * @class
 * @extends {Object2D}
 */
function Gauge()
{
	Object2D.call(this);

	// TODO <ADD CODE HERE>
}

Gauge.prototype = Object.create(Object2D.prototype);
Gauge.prototype.constructor = Gauge;
Gauge.prototype.type = "Gauge";
Object2D.register(Gauge, "Gauge");

Gauge.prototype.draw = function(context, viewport, canvas)
{
	// TODO <ADD CODE HERE>
};

Gauge.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	// TODO <ADD CODE HERE>

	return data;
};

Gauge.prototype.parse = function(data, root)
{
	Object2D.prototype.parse.call(this, data, root);

	// TODO <ADD CODE HERE>
};


export {Gauge};
