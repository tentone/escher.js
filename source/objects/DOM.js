import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";

/**
 * A DOM object transformed using CSS3D to be included in the scene.
 *
 * DOM objects always stay on top or bellow (depending on the DOM parent placement) of everything else. It is not possible to layer these object with regular canvas objects.
 *
 * By default mouse events are not supported for these objects (it does not implement pointer collision checking). Use the DOM events for interaction with these types of objects.
 *
 * @class
 * @param {string} type Type of the DOM element (e.g. "div", "p", ...)
 * @extends {Object2D}
 */
function DOM(type)
{
	Object2D.call(this);

	/**
	 * Parent element that contains this DOM object.
	 *
	 * The DOM parent element if not set manually is automatically set to the parent of the drawing canvas.
	 *
	 * @type {Element}
	 */
	this.parentElement = null;

	/**
	 * DOM element contained by this object.
	 *
	 * By default it has the pointerEvents style set to none. In order to use any DOM event with this object first you have to set the element.style.pointerEvents to "auto".
	 *
	 * @type {Element}
	 */
	this.element = document.createElement(type || "div");
	this.element.style.transformStyle = "preserve-3d";
	this.element.style.position = "absolute";
	this.element.style.top = "0px";
	this.element.style.bottom = "0px";
	this.element.style.transformOrigin = "0px 0px";
	this.element.style.overflow = "auto";
	this.element.style.pointerEvents = "none";
	
	/**
	 * Size of the DOM element (in world coordinates).
	 */
	this.size = new Vector2(100, 100);
}

DOM.prototype = Object.create(Object2D.prototype);
DOM.prototype.constructor = DOM;
DOM.prototype.type = "DOM";
Object2D.register(DOM, "DOM");

/**
 * DOM object implements onAdd() method to automatically attach the DOM object to the DOM tree.
 */
DOM.prototype.onAdd = function()
{
	if(this.parentElement !== null)
	{
		this.parentElement.appendChild(this.element);
	}
};

/**
 * DOM object implements onRemove() method to automatically remove the DOM object to the DOM tree.
 */
DOM.prototype.onRemove = function()
{
	if(this.parentElement !== null)
	{
		this.parentElement.removeChild(this.element);
	}
};

DOM.prototype.transform = function(context, viewport, canvas)
{
	// Check if the DOM element parent is null
	if(this.parentElement === null)
	{
		this.parentElement = canvas.parentElement;
		this.parentElement.appendChild(this.element);
	}

	// CSS transformation matrix
	if(this.ignoreViewport)
	{
		this.element.style.transform = this.globalMatrix.cssTransform();
	}
	else
	{
		var projection = viewport.matrix.clone();
		projection.multiply(this.globalMatrix);
		this.element.style.transform = projection.cssTransform();
	}

	// Size of the element
	this.element.style.width = this.size.x + "px";
	this.element.style.height = this.size.y + "px";

	// Visibility
	this.element.style.display = this.visible ? "block" : "none"; 
};

DOM.prototype.serialize = function(recursive)
{
	var data = Object2D.prototype.serialize.call(this, recursive);

	data.size = this.size.toArray();
	data.element = this.element.outerHTML;

	return data;
};

DOM.prototype.parse = function(data)
{
	Object2D.prototype.parse.call(this, data);

	this.size.fromArray(data.size);

	var parser = new DOMParser();
	var doc = parser.parseFromString(this.element.outerHTML, 'text/html');
	this.element = doc.body.children[0];
};

export {DOM};
