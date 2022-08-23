import {Viewport} from "../Viewport.js";
import {Pointer} from "../input/Pointer.js";
import {Vector2} from "../math/Vector2.js";

/**
 * Viewport controls are used to allow the user to control the viewport.
 *
 * @class
 * @param {Viewport} viewport
 */
function ViewportControls(viewport)
{
	/**
	 * Viewport being controlled by this object.
	 *
	 * @type {Viewport}
	 */
	this.viewport = viewport;

	/**
	 * Button used to drag and viewport around.
	 *
	 * On touch enabled devices the touch event is represented as a LEFT button.
	 *
	 * @type {number}
	 */
	this.dragButton = Pointer.RIGHT;

	/**
	 * Is set to true allow the viewport to be scalled.
	 *
	 * Scaling is performed using the pointer scroll.
	 *
	 * @type {boolean}
	 */
	this.allowScale = true;

	/**
	 * Flag to indicate if the viewport should automatically cente ron the pointer position.
	 * 
	 * The viewport will simulataniously move to the pointer position while scalling.
	 *
	 * For some application its easier to focus the target if the viewport moves to the pointer location while scalling.
	 *
	 * @type {boolean}
	 */
	this.centerOnPointer = true;

	/**
	 * Flag to recenter the viewport automatically to the canvas.
	 * 
	 * This will ensure that rotation and scaling will not cause the viewport to move around.
	 * 
	 * @type {boolean}
	 * @default true
	 */
	this.centerOnCanvas = false;

	/**
	 * If true allows the viewport to be rotated.
	 *
	 * Rotation is performed by holding the RIGHT and LEFT pointer buttons and rotating around the initial point.
	 *
	 * @type {boolean}
	 */
	this.allowRotation = true;

	/**
	 * Value of the initial point of rotation if the viewport is being rotated.
	 * 
	 * Is the value of the pointer position when the rotation starts.
	 *
	 * Is set to null when the viewport is not being rotated.
	 *
	 * @type {Vector2 | null}
	 */
	this.rotationPoint = null;

	/**
	 * Initial rotation of the viewport.
	 * 
	 * Is set to the current rotation of the viewport when the rotation starts.
	 *
	 * @type {number}
	 */
	this.rotationInitial = 0;
}

/**
 * Update the viewport controls using the pointer object.
 *
 * Should be called every frame before rendering.
 *
 * @param {Pointer} pointer Pointer used to control the viewport.
 */
ViewportControls.prototype.update = function(pointer)
{	
	// Scale
	if(this.allowScale && pointer.wheel !== 0)
	{
		var scale = pointer.wheel * 1e-3 * this.viewport.scale;

		this.viewport.scale -= scale;
		this.viewport.matrixNeedsUpdate = true;
	}

	// Rotation
	if(this.allowRotation && pointer.buttonPressed(Pointer.RIGHT) && pointer.buttonPressed(Pointer.LEFT))
	{
		// Rotation pivot
		if(this.rotationPoint === null)
		{
			this.rotationPoint = pointer.position.clone();
			this.rotationInitial = this.viewport.rotation;
		}
		else
		{
			var point = pointer.position.clone();
			point.sub(this.rotationPoint);
			this.viewport.rotation = this.rotationInitial + point.angle();
			this.viewport.matrixNeedsUpdate = true;
		}
	} else {
		this.rotationPoint = null;
	}

	// Drag
	if(pointer.buttonPressed(this.dragButton))
	{
		this.viewport.position.add(pointer.delta);
		this.viewport.matrixNeedsUpdate = true;
	}

	// Automtical center the viewport.
	if (this.centerOnCanvas && pointer.canvas !== null) {
		var centerWorld = new Vector2(pointer.canvas.width / 2.0, pointer.canvas.height / 2.0);
		centerWorld = this.viewport.inverseMatrix.transformPoint(centerWorld);
		this.viewport.center.copy(centerWorld);
		this.viewport.matrixNeedsUpdate = true;
	} 
	// Center on pointer
	else if(this.centerOnPointer && pointer.canvas !== null)
	{
		var pointerWorld = this.viewport.inverseMatrix.transformPoint(pointer.position)
		this.viewport.center.copy(pointerWorld);
		this.viewport.matrixNeedsUpdate = true;
	}
};

export {ViewportControls};
