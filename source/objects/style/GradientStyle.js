import {Style} from "./Style";
import {GradientColorStop} from "./GradientColorStop";

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
    Style.call(this);

    /**
     * List of colors that compose this gradient ordered.
     *
     * You need to add at least one color stop to have a visible gradient.
     *
     * @type {GradientColorStop[]}
     */
    this.colors = [];
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


export {GradientStyle};
