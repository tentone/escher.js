import {Object2D} from "./Object2D";

/**
 * Handles object serialization to and from JSON.
 *
 * All objects should implement serialization methods to serialize and load data from generic object.
 *
 * @class
 */
function Serialization(){}

/**
 * Serialize a object into JSON object. That can be written into a file, sent using HTTP request etc.
 *
 * Booth the object and all its children are serialized.
 *
 * Data has to be parsed into the correct object types before it can be used using the parse() method.
 *
 * @static
 * @param {Object2D} object Object to be serialized.
 * @return {Object} Serialized object data.
 */
Serialization.serialize = function(object)
{
	// TODO <ADD CODE HERE>
};

/**
 * Parse serialized object data into the proper data structures to be rendered into the screen.
 *
 * @static
 * @param {Object} data Object data loaded from JSON.
 * @return {Object2D} Parsed object data.
 */
Serialization.parse = function(data)
{
	// TODO <ADD CODE HERE>
};

export {Serialization};
