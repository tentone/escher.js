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
	 */
	this.viewport = viewport;

	/**
	 * Button used to drag and viewport around.
	 *
	 * On touch enabled devices the touch event is represented as a LEFT button.
	 */
	this.dragButton = Pointer.RIGHT;

	/**
	 * Is set to true allow the viewport to be scalled.
	 *
	 * Scaling is performed using the pointer scroll.
	 */
	this.allowScale = true;

	/**
	 * Flag to indicate if the viewport should move when scalling.
	 *
	 * For some application its easier to focus the target if the viewport moves to the pointer location while scalling.
	 */
	this.moveOnScale = false;

	/**
	 * If true allows the viewport to be rotated.
	 *
	 * Rotation is performed by holding the RIGHT and LEFT pointer buttons and rotating around the initial point.
	 */
	this.allowRotation = true;

	/**
	 * Value of the initial point of rotation if the viewport is being rotated.
	 *
	 * Is set to null when the viewport is not being rotated.
	 */
	this.rotationPoint = null;

	/**
	 * Initial rotation of the viewport.
	 */
	this.rotationInitial = 0;
}

/**
 * Update the viewport controls using the pointer object.
 *
 * Should be called every frame before rendering.
 *
 * @param {Pointer} pointer
 */
ViewportControls.prototype.update = function(pointer)
{	
	// Scale
	if(this.allowScale && pointer.wheel !== 0)
	{
		var scale = pointer.wheel * 1e-3 * this.viewport.scale;

		this.viewport.scale -= scale;
		this.viewport.matrixNeedsUpdate = true;

		// Move on scale
		if(this.moveOnScale && pointer.canvas !== null)
		{	
			this.viewport.updateMatrix();

			var pointerWorld = this.viewport.inverseMatrix.transformPoint(pointer.position);

			var centerWorld = new Vector2(pointer.canvas.width / 2.0, pointer.canvas.height / 2.0);
			centerWorld = this.viewport.inverseMatrix.transformPoint(centerWorld);

			var delta = pointerWorld.clone();
			delta.sub(centerWorld);
			delta.multiplyScalar(0.1);

			this.viewport.position.sub(delta);
			this.viewport.matrixNeedsUpdate = true;
		}
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
			var pointer = pointer.position.clone();
			pointer.sub(this.rotationPoint);
			this.viewport.rotation = this.rotationInitial + pointer.angle();
			this.viewport.matrixNeedsUpdate = true;
		}
	}
	// Drag
	else
	{
		this.rotationPoint = null;

		if(pointer.buttonPressed(this.dragButton))
		{
			this.viewport.position.x += pointer.delta.x;
			this.viewport.position.y += pointer.delta.y;
			this.viewport.matrixNeedsUpdate = true;
		}
	}
};

export {ViewportControls};
