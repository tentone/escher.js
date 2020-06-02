import {Style} from "./Style";
import {GradientStyle} from "./GradientStyle";
import {Vector2} from "../../math/Vector2";

/**
 * Linear gradient style, represents a gradient of colors from a point to another interpolating in between.
 *
 * Behind the of the two points used the color is solid.
 *
 * The get method returns a CanvasGradient https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient when generated.
 *
 * @class
 * @extends {GradientStyle}
 */
function LinearGradientStyle()
{
    GradientStyle.call(this);

    /**
     * The coordinates of the starting point of the gradient.
     *
     * @type {Vector2}
     */
    this.start = new Vector2(-100, 0);

    /**
     * The coordinates of the ending point of the gradient.
     *
     * @type {Vector2}
     */
    this.end = new Vector2(100, 0);
}

LinearGradientStyle.prototype = Object.create(GradientStyle.prototype);
Style.register(LinearGradientStyle, "LinearGradient");

LinearGradientStyle.prototype.get = function(context)
{
    var style = context.createLinearGradient(this.start.x, this.start.y, this.end.x, this.end.y);

    for(var i = 0; i < this.colors.length; i++)
    {
        style.addColorStop(this.colors[i].offset, this.colors[i].color);
    }

    return style;
};

LinearGradientStyle.prototype.serialize = function ()
{
    var data = GradientStyle.prototype.serialize.call(this);

    Object.assign(data, {
        type: "LinearGradient",
        start: this.start.toArray(),
        end: this.end.toArray()
    });

    return data;
};

LinearGradientStyle.prototype.parse = function (data)
{
    GradientStyle.prototype.parse.call(this, data);

    this.start.fromArray(data.start);
    this.end.fromArray(data.end);
};

export {LinearGradientStyle};
