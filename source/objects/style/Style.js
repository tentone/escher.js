import {ColorStyle} from "./ColorStyle";

/**
 * Style represents in a generic way a style applied to canvas drawing.
 *
 * Some styles (e.g. gradients, patterns) required a context to be generated this provides a generic way to share styles between objects.
 *
 * @class
 */
function Style() {}

/**
 * Generate style object from style data and the drawing context.
 *
 * @param {CanvasRenderingContext2D} context Context being used to draw the object.
 * @return {string | CanvasGradient | CanvasPattern} Return the canvas style object generated.
 */
Style.prototype.generate = function(context) {};

Style.prototype.toJSON = function() {};

Style.fromJSON = function ()
{

};

export {Style};
