/**
 * Gradient color stop is used to create the gradients by their color sections.
 *
 * The gradients are ordered, each stop has a target color that becomes solid on its offset value triggering the next color stop if there is one.
 *
 * @class
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

export {GradientColorStop};