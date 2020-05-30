import {Style} from "./Style";

/**
 * Gradient style describes a gradient by its colors, directions origin, type (linear or radial, etc.
 *
 * The get method returns a CanvasGradient https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient when generated.
 *
 * @class
 * @extends {Style}
 */
function GradientStyle()
{
    /**
     * Type of gradient can be LINEAR or RADIAL.
     *
     * @type {number}
     */
    this.type = GradientStyle.LINEAR;
}

GradientStyle.prototype = Object.create(Style);

/**
 * Linear gradient style, represents a gradient of colors from a point to another interpolating in between.
 *
 * Behind the of the two points used the color is solid.
 *
 * @type {number}
 */
GradientStyle.LINEAR = 100;

/**
 * Radial gradient interpolates colors from a point all around up to a radius value.
 *
 * Outside of the radius the color is solid.
 *
 * @type {number}
 */
GradientStyle.RADIAL = 101;

/**
 * Add a new color stop defined by an offset and a color to the gradient.
 *
 * If the offset is not between 0 and 1 inclusive, or if color can't be parsed as a CSS color, an error is raised.
 *
 * @param {number} offset Offset of the color stop between 0 and 1 inclusive.
 * @param {string} color CSS color value.
 */
GradientStyle.prototype.addColorStop = function(offset, color)
{

};

GradientStyle.prototype.get = function(context)
{
    // context.createLinearGradient()
    // context.createRadialGradient()
};

GradientStyle.prototype.serialize = function ()
{
    return {
        type: "Gradient"
    };
};

export {GradientStyle};
