import {Style} from "./Style";

/**
 * Simple solid color style represented and stored as a CSS color.
 *
 * @class
 * @extends {Style}
 * @param {string} color Color of the style, if undefined it is set to black.
 */
function ColorStyle(color)
{
    /**
     * Color of this style object.
     *
     * @type {string}
     */
    this.color = color || "#000000";
}

ColorStyle.prototype = Object.create(Style);

ColorStyle.prototype.generate = function(context)
{
    return this.color;
};

ColorStyle.prototype.toJSON = function()
{
    return {
        type: "Color",
        color: this.color
    };
};

export {ColorStyle};
