"use strict";

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
	 * Position of the object.
	 */
	this.position = new Vector2(0, 0);

	/**
	 * Scale of the object.
	 */
	this.scale = new Vector2(1, 1);

	/**
	 * Rotation of the object relative to its center.
	 */
	this.rotation = 0.0;

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
	 * Used to convert mouse input points into object coordinates.
	 */
	this.inverseGlobalMatrix = new Matrix();

	/**
	 * If true the matrix is updated before rendering the object.
	 */
	this.matrixNeedsUpdate = true;
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
		this.children[index].parent = null;
		this.children.splice(index, 1)
	}
};

Object2D.prototype.onOver = function(){};

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
		this.matrix.compose(this.position.x, this.position.y, this.scale.x, this.scale.y, this.rotation);
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
 * Draw the object into the canvas.
 *
 * Has to be implemented by underlying classes.
 *
 * @param context Canvas 2d drawing context.
 * @param canvas The canvas DOM element where its being drawn.
 */
Object2D.prototype.draw = function(context){};