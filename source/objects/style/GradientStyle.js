import {Style} from "./Style";
import {RadialGradientStyle} from "./RadialGradientStyle";

/**
 * Gradient style is used to represent any type of gradient based style.
 *
 * It handles any gradient based operations and should be used as base for other gradient styles.
 *
 * @class
 * @extends {Style}
 */
function GradientStyle()
{
    /**
     * List of colors that compose this gradient ordered.
     *
     * You need to add at least one color stop to have a visible gradient.
     *
     * @type {GradientColorStop[]}
     */
    this.colors = [];
}

/**
 * Gradient color stop is used to create the gradients by their color sections.
 *
 * The gradients are ordered, each stop has a target color that becomes solid on its offset value triggering the next color stop if there is one.
 *
 * @param offset Offset of the color stop between 0 and 1 inclusive.
 * @param color CSS color value.
 * @constructor
 */
function GradientColorStop(offset, color)
{
    /**
     * Offset of the color stop between 0 and 1 inclusive.
     *
     * @type {number}
     */
    this.offset = offset;

    /**
     * CSS color value.
     *
     * @type {string}
     */
    this.color = color;
}

GradientStyle.prototype = Object.create(Style.prototype);

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
    this.colors.push(new GradientColorStop(offset, color));
};

GradientStyle.prototype.serialize = function()
{
    return {
        colors: this.colors
    };
};

GradientStyle.prototype.parse = function(data)
{
    var colors = [];
    for(var i = 0; i < data.colors.length; i++)
    {
        colors.push(new GradientColorStop(data.colors[i].offset, data.colors[i].color));
    }
    this.colors = colors;
};


export {GradientStyle, GradientColorStop};
