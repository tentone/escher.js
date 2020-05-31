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

ColorStyle.prototype = Object.create(Style.prototype);
Style.register(ColorStyle, "Color");

ColorStyle.prototype.get = function(context)
{
    return this.color;
};

ColorStyle.prototype.serialize = function()
{
    return {
        type: "Color",
        color: this.color
    };
};

ColorStyle.prototype.parse = function(data)
{
    this.color = data.color;
};

export {ColorStyle};
