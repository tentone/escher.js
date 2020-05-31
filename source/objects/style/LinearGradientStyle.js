import {Style} from "./Style";
import {ColorStyle} from "./ColorStyle";

/**
 * Linear gradient style, represents a gradient of colors from a point to another interpolating in between.
 *
 * Behind the of the two points used the color is solid.
 *
 * The get method returns a CanvasGradient https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient when generated.
 *
 * @class
 * @extends {Style}
 */
function LinearGradientStyle()
{
    // TODO <ADD CODE HERE>
}

LinearGradientStyle.prototype = Object.create(Style.prototype);
Style.register(LinearGradientStyle, "LinearGradient");

/**
 * Add a new color stop defined by an offset and a color to the gradient.
 *
 * If the offset is not between 0 and 1 inclusive, or if color can't be parsed as a CSS color, an error is raised.
 *
 * @param {number} offset Offset of the color stop between 0 and 1 inclusive.
 * @param {string} color CSS color value.
 */
LinearGradientStyle.prototype.addColorStop = function(offset, color)
{
    // TODO <ADD CODE HERE>
};

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

LinearGradientStyle.prototype.parse = function (data)
{
    // TODO <ADD CODE HERE>
};

export {LinearGradientStyle};
