import {Vector2} from "./math/Vector2.js";
import {Matrix} from "./math/Matrix.js";
import {UUID} from "./math/UUID.js";

/**
 * Base object class, implements all the object positioning and scaling features.
 *
 * Stores all the base properties shared between all objects as the position, transformation properties, children etc.
 *
 * Object2D object can be used as a group to the other objects drawn.
 *
 * @class
 */
function Object2D()
{	
	/**
	 * UUID of the object.
	 *
	 * @type {string}
	 */
	this.uuid = UUID.generate(); 

	/**
	 * List of children objects attached to the object.
	 *
	 * @type {Object2D[]}
	 */
	this.children = [];

	/**
	 * Parent object, the object position is affected by its parent position.
	 *
	 * @type {Object2D}
	 */
	this.parent = null;

	/**
	 * Depth level in the object tree, objects with higher depth are drawn on top.
	 *
	 * The layer value is considered first.
	 *
	 * @type {number}
	 */
	this.level = 0;

	/**
	 * Position of the object.
	 *
	 * The world position of the object is affected by its parent transform.
	 *
	 * @type {Vector2}
	 */
	this.position = new Vector2(0, 0);

	/**
	 * Origin of the object used as point of rotation.
	 *
	 * @type {Vector2}
	 */
	this.origin = new Vector2(0, 0);

	/**
	 * Scale of the object.
	 *
	 * The world scale of the object is affected by the parent transform.
	 *
	 * @type {Vector2}
	 */
	this.scale = new Vector2(1, 1);

	/**
	 * Rotation of the object relative to its center.
	 *
	 * The world rotation of the object is affected by the parent transform.
	 *
	 * @type {number}
	 */
	this.rotation = 0.0;

	/**
	 * Indicates if the object is visible.
	 *
	 * @type {boolean}
	 */
	this.visible = true;

	/**
	 * Layer of this object, objects are sorted by layer value.
	 *
	 * Lower layer value is draw first, higher layer value is drawn on top.
	 *
	 * @type {number}
	 */
	this.layer = 0;

	/**
	 * Local transformation matrix applied to the object.
	 *
	 * @type {Matrix}
	 */
	this.matrix = new Matrix();

	/**
	 * Global transformation matrix multiplied by the parent matrix.
	 *
	 * Used to transform the object before projecting into screen coordinates.
	 *
	 * @type {Matrix}
	 */
	this.globalMatrix = new Matrix();

	/**
	 * Inverse of the global (world) transform matrix.
	 *
	 * Used to convert pointer input points (viewport space) into object coordinates.
	 *
	 * @type {Matrix}
	 */
	this.inverseGlobalMatrix = new Matrix();

	/**
	 * Mask objects being applied to this object. Used to mask/subtract portions of this object when rendering.
	 *
	 * Multiple masks can be used simultaneously. Same mask might be reused for multiple objects.
	 *
	 * @type {Mask[]}
	 */
	this.masks = [];

	/**
	 * Indicates if the transform matrix should be automatically updated every frame.
	 *
	 * Set this false for better performance. But if you do so dont forget to set matrixNeedsUpdate every time that a transform attribute is changed.
	 *
	 * @type {boolean}
	 */
	this.matrixAutoUpdate = true;

	/**
	 * Indicates if the matrix needs to be updated, should be set true after changes to the object position, scale or rotation.
	 *
	 * The matrix is updated before rendering the object, after the matrix is updated this attribute is automatically reset to false.
	 *
	 * @type {boolean}
	 */
	this.matrixNeedsUpdate = true;

	/**
	 * Draggable controls if its possible to drag the object around. Set this true to enable dragging events on this object.
	 *
	 * The onPointerDrag callback is used to update the state of the object while being dragged, by default it just updates the object position.
	 *
	 * @type {boolean}
	 */
	this.draggable = false;

	/**
	 * Indicates if this object uses pointer events.
	 *
	 * Can be set false to skip the pointer interaction events, better performance if pointer events are not required.
	 *
	 * @type {boolean}
	 */
	this.pointerEvents = true;

	/**
	 * Flag to indicate whether this object ignores the viewport transformation.
	 *
	 * @type {boolean}
	 */
	this.ignoreViewport = false;

	/**
	 * Flag to indicate if the context of canvas should be saved before render.
	 *
	 * @type {boolean}
	 */
	this.saveContextState = true;

	/**
	 * Flag to indicate if the context of canvas should be restored after render.
	 *
	 * @type {boolean}
	 */
	this.restoreContextState = true;

	/**
	 * Flag indicating if the pointer is inside of the element.
	 *
	 * Used to control object event.
	 *
	 * @type {boolean}
	 */
	this.pointerInside = false;

	/**
	 * Flag to indicate if the object is currently being dragged.
	 *
	 * @type {boolean}
	 */
	this.beingDragged = false;
}

/**
 * Check if a point in world coordinates intersects this object or some of its children.
 *
 * @param {Vector2} point Point in world coordinates.
 * @param {boolean} recursive If set to false it will only check intersections with this object.
 */
Object2D.prototype.intersect = function(point, recursive)
{
	// Calculate the pointer position in the object coordinates
	var localPoint = this.inverseGlobalMatrix.transformPoint(point);

	// TODO <APPLY MATRIX TO POINT>

	if(recursive)
	{
		for(var i = 0; i < this.children.length; i++)
		{
			if(this.children[i].intersect(point, true))
			{
				return true;
			}
		}
	}

	return false;
};


/**
 * Destroy the object, removes it from the parent object.
 */
Object2D.prototype.destroy = function()
{
	if(this.parent !== null)
	{
		this.parent.remove(this);
	}
};

/**
 * Traverse the object tree and run a function for all objects.
 *
 * @param {Function} callback Callback function that receives the object as parameter.
 */
Object2D.prototype.traverse = function(callback)
{
	callback(this);

	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].traverse(callback);
	}
};

/**
 * Get a object from its children list by its UUID.
 *
 * @param {string} uuid UUID of the object to get.
 * @return {Object2D} The object that has the UUID specified, null if the object was not found.
 */
Object2D.prototype.getChildByUUID = function(uuid)
{
	var object = null;

	this.traverse(function(child)
	{
		if(child.uuid === uuid)
		{
			object = child;
		}
	});

	return object;
};

/**
 * Attach a children to this object.
 *
 * The object is set as children of this object and the transformations applied to this object are traversed to its children.
 *
 * @param {Object2D} object Object to attach to this object.
 */ 
Object2D.prototype.add = function(object)
{
	object.parent = this;
	object.level = this.level + 1;

	object.traverse(function(child)
	{
		if(child.onAdd !== null)
		{
			child.onAdd(this);
		}
	});

	this.children.push(object);
};

/**
 * Remove object from the children list.
 *
 * @param {Object2D} children Object to be removed.
 */
Object2D.prototype.remove = function(children)
{
	var index = this.children.indexOf(children);
	
	if(index !== -1)
	{
		var object = this.children[index];
		object.parent = null;
		object.level = 0;

		object.traverse(function(child)
		{
			if(child.onRemove !== null)
			{
				child.onRemove(this);
			}
		});

		this.children.splice(index, 1)
	}
};

/**
 * Check if a point is inside of the object. Used by the renderer check for pointer collision (required for the object to properly process pointer events).
 *
 * Point should be in local object coordinates.
 *
 * To check if a point in world coordinates intersects the object the inverseGlobalMatrix should be applied to that point before calling this method.
 *
 * @param {Vector2} point Point in local object coordinates.
 * @return {boolean} True if the point is inside of the object.
 */
Object2D.prototype.isInside = function(point)
{
	return false;
};

/**
 * Update the transformation matrix of the object.
 *
 * @param {CanvasRenderingContext2D} context Canvas 2d drawing context.
 */
Object2D.prototype.updateMatrix = function(context)
{
	if(this.matrixAutoUpdate || this.matrixNeedsUpdate)
	{
		this.matrix.compose(this.position.x, this.position.y, this.scale.x, this.scale.y, this.origin.x, this.origin.y, this.rotation);
		this.globalMatrix.copy(this.matrix);

		if(this.parent !== null)
		{	
			this.globalMatrix.premultiply(this.parent.globalMatrix);
		}

		this.inverseGlobalMatrix = this.globalMatrix.getInverse()
		this.matrixNeedsUpdate = false;
	}
};

/**
 * Apply the transform to the rendering context, it is assumed that the viewport transform is pre-applied to the context.
 *
 * This is called before style() and draw(). It can also be used for some pre-rendering logic.
 *
 * @param {CanvasRenderingContext2D} context Canvas 2d drawing context.
 * @param {Viewport} viewport Viewport applied to the canvas.
 */
Object2D.prototype.transform = function(context, viewport)
{
	this.globalMatrix.tranformContext(context);
};

/**
 * Style is called right before draw() it should not draw any content into the canvas, all context styling should be applied here (colors, fonts, etc).
 *
 * The draw() and style() methods can be  useful for objects that share the same styling attributes but are drawing differently.
 *
 * Should be implemented by underlying classes.
 *
 * @param {CanvasRenderingContext2D} context Canvas 2d drawing context.
 * @param {Viewport} viewport Viewport used to view the canvas content.
 * @param {DOM} canvas DOM canvas element where the content is being drawn.
 */
Object2D.prototype.style = null; // function(context, viewport, canvas){};

/**
 * Draw the object into the canvas, this is called transform() and style(), should be where the content is actually drawn into the canvas.
 *
 * Should be implemented by underlying classes.
 *
 * @param {CanvasRenderingContext2D} context Canvas 2d drawing context.
 * @param {Viewport} viewport Viewport used to view the canvas content.
 * @param {DOM} canvas DOM canvas element where the content is being drawn.
 */
Object2D.prototype.draw = null; // function(context, viewport, canvas){};

/**
 * Callback method while the object is being dragged across the screen.
 *
 * By default is adds the delta value to the object position (making it follow the mouse movement).
 *
 * Delta is the movement of the pointer already translated into local object coordinates.
 *
 * To detect when the object drag stops the onPointerDragEnd() method can be used.
 *
 * @param {Pointer} pointer Pointer object that receives the user input.
 * @param {Viewport} viewport Viewport where the object is drawn.
 * @param {Vector2} delta Pointer movement diff in world space since the last frame.
 * @param {Vector2} positionWorld Position of the dragging pointer in world coordinates.
 */
Object2D.prototype.onPointerDrag = function(pointer, viewport, delta, positionWorld)
{
	this.position.add(delta);
};

/**
 * Callback method called when the pointer drag start after the button was pressed
 *
 * @param {Pointer} pointer Pointer object that receives the user input.
 * @param {Viewport} viewport Viewport where the object is drawn.
 */
Object2D.prototype.onPointerDragStart = null;

/**
 * Callback method called when the pointer drag ends after the button has been released.
 *
 * @param {Pointer} pointer Pointer object that receives the user input.
 * @param {Viewport} viewport Viewport where the object is drawn.
 */
Object2D.prototype.onPointerDragEnd = null;

/**
 * Method called when the object its added to a parent.
 *
 * @param {Object2D} parent Parent object were it was added.
 */
Object2D.prototype.onAdd = null;

/**
 * Method called when the object gets removed from its parent
 *
 * @param {Object2D} parent Parent object from were the object is being removed.
 */
Object2D.prototype.onRemove = null;

/**
 * Callback method called every time before the object is draw into the canvas.
 *
 * Can be used to run preparation code, move the object, etc.
 */
Object2D.prototype.onUpdate = null;

/**
 * Callback method called when the pointer enters the object.
 *
 * Receives (pointer, viewport) as arguments.
 *
 * @param {Pointer} pointer Pointer object that receives the user input.
 * @param {Viewport} viewport Viewport where the object is drawn.
 */
Object2D.prototype.onPointerEnter = null;

/**
 * Callback method called when the was inside of the object and leaves the object.
 *
 * Receives (pointer, viewport) as arguments.
 *
 * @param {Pointer} pointer Pointer object that receives the user input.
 * @param {Viewport} viewport Viewport where the object is drawn.
 */
Object2D.prototype.onPointerLeave = null;

/**
 * Callback method while the pointer is over (inside) of the object.
 *
 * Receives (pointer, viewport) as arguments.
 *
 * @param {Pointer} pointer Pointer object that receives the user input.
 * @param {Viewport} viewport Viewport where the object is drawn.
 */
Object2D.prototype.onPointerOver = null;

/**
 * Callback method called while the pointer button is pressed.
 *
 * Receives (pointer, viewport) as arguments.
 *
 * @param {Pointer} pointer Pointer object that receives the user input.
 * @param {Viewport} viewport Viewport where the object is drawn.
 */
Object2D.prototype.onButtonPressed = null;

/**
 * Callback method called while the pointer button is double clicked.
 *
 * Receives (pointer, viewport) as arguments.
 *
 * @param {Pointer} pointer Pointer object that receives the user input.
 * @param {Viewport} viewport Viewport where the object is drawn.
 */
Object2D.prototype.onDoubleClick = null;

/**
 * Callback method called when the pointer button is pressed down (single time).
 *
 * Receives (pointer, viewport) as arguments.
 *
 * @param {Pointer} pointer Pointer object that receives the user input.
 * @param {Viewport} viewport Viewport where the object is drawn.
 */
Object2D.prototype.onButtonDown = null;

/**
 * Callback method called when the pointer button is released (single time).
 *
 * Receives (pointer, viewport) as arguments.
 *
 * @param {Pointer} pointer Pointer object that receives the user input.
 * @param {Viewport} viewport Viewport where the object is drawn.
 */
Object2D.prototype.onButtonUp = null;

export {Object2D};
