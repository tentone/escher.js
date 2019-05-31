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
	 * Global transformation matrix used to project the object to screen space.
	 */
	this.globalMatrix = new Matrix();
}

/**
 * Attach a children to the object.
 */ 
Object2D.prototype.add = function(object)
{
	object.parent = this;
	this.children.push(object);
};

/**
 * Remove object from the children list.
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

/**
 * Draw the object into the canvas.
 */
Object2D.prototype.draw = function(context)
{

};