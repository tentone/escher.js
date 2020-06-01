import {Style} from "./Style";

/**
 * Pattern style represents an opaque object describing a pattern, based on an image, a canvas, or a video.
 *
 * The get method returns a CanvasPattern object https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern created by the context.createPattern() method.
 *
 * @class
 * @extends {Style}
 * @param {CanvasImageSource} source Source element of the pattern.
 */
function PatternStyle(source)
{
    /**
     * Source of the pattern style. Can be a image, video or another canvas element
     *
     * By default a empty image element is created.
     *
     * @type {CanvasImageSource}
     */
    this.source = source || document.createElement("img");

    /**
     * Repetition indicates how the pattern image should be repeated.
     *
     * Possible values are "repeat", "repeat-x", "repeat-y" or "no-repeat".
     *
     * More information about this attribute here https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern.
     *
     * @type {string}
     */
    this.repetition = "repeat"

    /**
     * Transformation matrix applied to the pattern.
     *
     * The transformation allows to move, rotate and scale the pattern freely
     *
     * @type {Matrix}
     */
    this.transform = new Matrix();
}

PatternStyle.prototype = Object.create(Style.prototype);
Style.register(PatternStyle, "Pattern");

/**
 * Applies an 2x3 transformation matrix representing a linear transform to the pattern.
 *
 * @param {number[]} transform 2x3 Transformation matrix.
 */
PatternStyle.prototype.setTransform = function(transform)
{
    // TODO <ADD CODE HERE>
};

PatternStyle.prototype.get = function(context)
{
    return context.createPattern(this.source, this.repetition);
};

PatternStyle.prototype.serialize = function ()
{
    // TODO <ADD CODE HERE>
};

PatternStyle.prototype.parse = function (data)
{
    // TODO <ADD CODE HERE>
};

export {PatternStyle};