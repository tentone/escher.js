import {Style} from "./Style";

/**
 * Pattern style represents an opaque object describing a pattern, based on an image, a canvas, or a video.
 *
 * The get method returns a CanvasPattern object https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern created by the context.createPattern() method.
 *
 * @class
 * @extends {Style}
 */
function PatternStyle()
{

}

/**
 * Applies an 2x3 transformation matrix representing a linear transform to the pattern.
 *
 * The transformation allows to move, rotate and scale the pattern freely
 *
 * @param {number[]} transform 2x3 Transformation matrix.
 */
PatternStyle.prototype.setTransform = function(transform)
{
    // TODO <ADD CODE HERE>
};

PatternStyle.prototype.serialize = function ()
{

};

export {PatternStyle};