import {Style} from "./Style";
import {PatternStyle} from "./PatternStyle";

/**
 * Radial gradient interpolates colors from a point all around up to a radius value.
 *
 * Outside of the radius the color is solid.
 *
 * The get method returns a CanvasGradient https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient when generated.
 *
 * @class
 * @extends {Style}
 */
function RadialGradientStyle()
{
    this.start = new Vector2(0, 0);

    this.end = new Vector2(20, 20);

    this.radiusStart = 0;

    this.radiusEnd = 10;

    // TODO <ADD CODE HERE>
}

RadialGradientStyle.prototype = Object.create(Style.prototype);
Style.register(RadialGradientStyle, "RadialGradient");

/**
 * Add a new color stop defined by an offset and a color to the gradient.
 *
 * If the offset is not between 0 and 1 inclusive, or if color can't be parsed as a CSS color, an error is raised.
 *
 * @param {number} offset Offset of the color stop between 0 and 1 inclusive.
 * @param {string} color CSS color value.
 */
RadialGradientStyle.prototype.addColorStop = function(offset, color)
{
    // TODO <ADD CODE HERE>
};

RadialGradientStyle.prototype.get = function(context)
{
    // TODO <ADD CODE HERE>
    // return context.createRadialGradient();
};

RadialGradientStyle.prototype.serialize = function ()
{
    return {
        type: "RadialGradient"
    };
};

RadialGradientStyle.prototype.parse = function (data)
{
    // TODO <ADD CODE HERE>
};


export {RadialGradientStyle};
