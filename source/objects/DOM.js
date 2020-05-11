import {Object2D} from "../Object2D.js";
import {Vector2} from "../math/Vector2.js";

/**
 * A DOM object transformed using CSS3D to ver included in the graph.
 *
 * DOM objects always stay on top of everything else, mouse events are not supported for these.
 *
 * Use the normal DOM events for interaction.
 *
 * @class
 * @param parentDOM Parent DOM element that contains the drawing canvas.
 * @param type Type of the DOM element (e.g. "div", "p", ...)
 * @extends {Object2D}
 */
function DOM(parentDOM, type)
{
	Object2D.call(this);

	/**
	 * Parent element that contains this DOM div.
	 */
	this.parentDOM = parentDOM;

	/**
	 * DOM element contained by this object.
	 *
	 * Bye default it has the pointerEvents style set to none.
	 */
	this.element = document.createElement("div");
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

DOM.prototype.onAdd = function()
{
	this.parentDOM.appendChild(this.element);
};

DOM.prototype.onRemove = function()
{
	this.parentDOM.removeChild(this.element);
};

DOM.prototype.transform = function(context, viewport, canvas)
{
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

export {DOM};
