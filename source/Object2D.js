"use strict";

import {Vector2} from "./math/Vector2.js";
import {Matrix} from "./math/Matrix.js";
import {UUID} from "./math/UUID.js";

/**
 * Base 2D object class, implements all the object positioning and scalling features.
 *
 * @class
 */
function Object2D()
{	
	/**
	 * UUID of the object.
	 */
	this.uuid = UUID.generate(); 

	/**
	 * List of children objects attached to the object.
	 */
	this.children = [];

	/**
	 * Parent object, the object position is affected by its parent position.
	 */
	this.parent = null;

	/**
	 * Depth level in the object tree, objects with higher depth are drawn on top.
	 *
	 * The layer value is considered first. 
	 */
	this.level = 0;

	/**
	 * Position of the object.
	 */
	this.position = new Vector2(0, 0);

	/**
	 * Origin of the object used as point of rotation.
	 */
	this.origin = new Vector2(0, 0);

	/**
	 * Scale of the object.
	 */
	this.scale = new Vector2(1, 1);

	/**
	 * Rotation of the object relative to its center.
	 */
	this.rotation = 0.0;

	/**
	 * Indicates if the object is visible.
	 */
	this.visible = true;

	/**
	 * Layer of this object, objects are sorted by layer value.
	 *
	 * Lower layer value is draw first.
	 */
	this.layer = 0;

	/**
	 * Local transformation matrix applied to the object. 
	 */
	this.matrix = new Matrix();

	/**
	 * Global transformation matrix multiplied by the parent matrix.
	 *
	 * Used to transform the object before projecting into screen coordinates.
	 */
	this.globalMatrix = new Matrix();

	/**
	 * Inverse of the global matrix.
	 *
	 * Used to convert pointer input points into object coordinates.
	 */
	this.inverseGlobalMatrix = new Matrix();

	/**
	 * Masks being applied to this object.
	 *
	 * Multiple masks can be used simultaneously.
	 */
	this.masks = [];

	/**
	 * If true the matrix is updated before rendering the object.
	 */
	this.matrixNeedsUpdate = true;

	/**
	 * Indicates if its possible to drag the object around.
	 *
	 * If true the onPointerDrag callback is used to update the state of the object.
	 */
	this.draggable = false;

	/**
	 * Indicates if this object uses pointer events.
	 *
	 * Can be set false to skip the pointer interaction events.
	 */
	this.pointerEvents = true;

	/**
	 * Flag to indicate wheter this objet ignores the viewport transformation.
	 */
	this.ignoreViewport = false;

	/**
	 * Flag to indicate if the context of canvas should be saved before render.
	 */
	this.saveContextState = true;

	/**
	 * Flag to indicate if the context of canvas should be restored after render.
	 */
	this.restoreContextState = true;

	/**
	 * Flag indicating if the pointer is inside of the element.
	 *
	 * Used to control object event.
	 */
	this.pointerInside = false;

	/**
	 * Flag to indicate if the object is currently being dragged.
	 */
	this.beingDragged = false;
}

/**
 * Traverse the object tree and run a function for all objects.
 *
 * @param callback Callback function that receives the object as parameter.
 */
Object2D.prototype.traverse = function(callback)
{
	callback(this);

	var children = this.children;

	for(var i = 0; i < children.length; i++)
	{
		children[i].traverse(callback);
	}
};

/**
 * Attach a children to the object.
 *
 * @param object Object to attach to this object.
 */ 
Object2D.prototype.add = function(object)
{
	object.parent = this;
	object.level = this.level + 1;

	if(object.õnAdd !== null)
	{
		object.õnAdd(object, this);
	}

	this.children.push(object);
};

/**
 * Remove object from the children list.
 *
 * @param object Object to be removed.
 */
Object2D.prototype.remove = function(object)
{
	var index = this.children.indexOf(object);
	
	if(index !== -1)
	{
		var object = this.children[index];
		object.parent = null;
		object.level = 0;

		if(object.onRemove !== null)
		{
			object.onRemove(object, this);
		}

		this.children.splice(index, 1)
	}
};

/**
 * Check if a point is inside of the object.
 */
Object2D.prototype.isInside = function(point)
{
	return false;
};

/**
 * Update the transformation matrix of the object.
 */
Object2D.prototype.updateMatrix = function(context)
{
	if(this.matrixNeedsUpdate)
	{
		this.matrix.compose(this.position.x, this.position.y, this.scale.x, this.scale.y, this.origin.x, this.origin.y, this.rotation);
		this.globalMatrix.copy(this.matrix);

		if(this.parent !== null)
		{	
			this.globalMatrix.premultiply(this.parent.globalMatrix);
		}

		this.inverseGlobalMatrix = this.globalMatrix.getInverse()
		//this.matrixNeedsUpdate = false;
	}
};

/**
 * Apply the transform to the rendering context.
 *
 * It is assumed that the viewport transform is pre-applied to the context.
 *
 * Can also be used for pre rendering logic.
 *
 * @param {CanvasContext} context Canvas 2d drawing context.
 * @param {Viewport} viewport Viewport applied to the canvas.
 */
Object2D.prototype.transform = function(context, viewport)
{
	this.globalMatrix.tranformContext(context);
};

/**
 * Draw the object into the canvas.
 *
 * Has to be implemented by underlying classes.
 *
 * @param {CanvasContext} context Canvas 2d drawing context.
 * @param {Viewport} viewport Viewport applied to the canvas.
 * @param {DOM} canvas DOM canvas element where the content is being drawn.
 */
Object2D.prototype.draw = function(context, viewport, canvas){};

/**
 * Method called when the object its added to a parent.
 *
 * Receives (object, parent) as arguments.
 */
Object2D.prototype.onAdd = null;

/**
 * Method called when the object gets removed from its parent
 *
 * Receives (object, parent) as arguments.
 */
Object2D.prototype.onRemove = null;

/**
 * Callback method called every time before the object is draw into the canvas.
 *
 * Can be used to run preparation code, move the object, etc.
 *
 * Receives (object) as argument.
 */
Object2D.prototype.onUpdate = null;

/**
 * Callback method called when the pointer enters the object.
 *
 * Receives (object, pointer, viewport) as arguments.
 */
Object2D.prototype.onPointerEnter = null;

/**
 * Callback method called when the was inside of the object and leaves the object.
 *
 * Receives (object, pointer, viewport) as arguments.
 */
Object2D.prototype.onPointerLeave = null;

/**
 * Callback method while the pointer is over (inside) of the object.
 *
 * Receives (object, pointer, viewport) as arguments.
 */
Object2D.prototype.onPointerOver = null;

/**
 * Callback method while the object is being dragged across the screen.
 *
 * Receives (object, pointer, viewport, delta) as arguments. Delta is the movement of the pointer already translated into local object coordinates.
 */
Object2D.prototype.onPointerDrag = function(pointer, viewport, delta)
{
	this.position.add(delta);
};

/**
 * Callback method called while the pointer button is pressed.
 *
 * Receives (object, pointer, viewport) as arguments.
 */
Object2D.prototype.onButtonPressed = null;

/**
 * Callback method called when the pointer button is pressed down (single time).
 *
 * Receives (object, pointer, viewport) as arguments.
 */
Object2D.prototype.onButtonDown = null;

/**
 * Callback method called when the pointer button is released (single time).
 *
 * Receives (object, pointer, viewport) as arguments.
 */
Object2D.prototype.onButtonUp = null;

export {Object2D};
