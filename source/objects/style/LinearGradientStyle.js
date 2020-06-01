import {Style} from "./Style";
import {GradientStyle} from "./GradientStyle";

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
    // TODO <ADD CODE HERE>
}

LinearGradientStyle.prototype = Object.create(GradientStyle.prototype);
Style.register(LinearGradientStyle, "LinearGradient");

LinearGradientStyle.prototype.get = function(context)
{
    // TODO <ADD CODE HERE>
    // return context.createLinearGradient();
};

LinearGradientStyle.prototype.serialize = function ()
{
    return {
        type: "LinearGradient"
    };
};

LinearGradientStyle.prototype.serialize = function ()
{
    var data = GradientStyle.prototype.serialize.call(this);

    Object.assign(data, {
        type: "LinearGradient"
    });

    return data;
};

LinearGradientStyle.prototype.parse = function (data)
{
    GradientStyle.prototype.parse.call(this, data);

    // TODO <ADD CODE HERE>
};

export {LinearGradientStyle};
