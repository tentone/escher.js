/**
 * Style represents in a generic way a style applied to canvas drawing.
 *
 * Some styles (e.g. gradients, patterns) required a context to be generated this provides a generic way to share styles between objects.
 *
 * @class
 */
function Style() {}

/**
 * Get generated style object from style data and the drawing context.
 *
 * @param {CanvasRenderingContext2D} context Context being used to draw the object.
 * @return {string | CanvasGradient | CanvasPattern} Return the canvas style object generated.
 */
Style.prototype.get = function(context) {};

/**
 * Serialize the style to JSON object, called by the objects using these styles.
 *
 * @return {Object} Serialized style data.
 */
Style.prototype.serialize = function() {};

/**
 * Parse the style attributes from JSON object data created with the serialize() method.
 *
 * @param {Object} data Serialized style data.
 */
Style.prototype.parse = function(data) {};

/**
 * List of available style types known by the application. Stores the object constructor by object type.
 *
 * @static
 * @type {Map<string, Function>}
 */
Style.types = new Map([]);

/**
 * Register a style type to be serializable. Associates the type string to the object constructor.
 *
 * @param {Function} constructor Style constructor.
 * @param {string} type Style type name.
 */
Style.register = function(constructor, type)
{
    Style.types.set(type, constructor);
};

/**
 * Parse style from JSON serialized data, created a style of the correct data type automatically and parses its data.
 *
 * @param data JSON serialized data.
 * @returns {Style} Parsed style from the provided data.
 */
Style.parse = function (data)
{
    var style = new (Style.types.get(data.type))();
    style.parse(data);
    return style;
};

export {Style};
