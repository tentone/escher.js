import {Style} from "./Style";
import {GradientStyle} from "./GradientStyle";
import {Matrix} from "../../math/Matrix";

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
    Style.call(this);

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
    this.matrix = new Matrix();
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
    this.matrix.m = transform;
    this.needsUpdate = true;
};

PatternStyle.prototype.get = function(context)
{
    if(this.needsUpdate || this.cache === null)
    {
        this.cache = context.createPattern(this.source, this.repetition);
        this.cache.setTransform(this.matrix.cssTransform());
        this.needsUpdate = false;
    }

    return this.cache;
};

PatternStyle.prototype.serialize = function ()
{
    var data = GradientStyle.prototype.serialize.call(this);

    Object.assign(data, {
        type: "Pattern",
        matrix: this.matrix.m,
        repetition: this.repetition,
        source: this.source
    });

    return data;
};

PatternStyle.prototype.parse = function (data)
{
    GradientStyle.prototype.parse.call(this, data);

    this.matrix = new Matrix(data.matrix);
    this.repetition = data.repetition;
    this.source = data.source;
};

export {PatternStyle};