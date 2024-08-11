import {Pointer} from "./input/Pointer.js";
import {ViewportControls} from "./controls/ViewportControls.js";
import {AnimationTimer} from "./utils/AnimationTimer";
import {EventManager} from "./utils/EventManager";

/**
 * The renderer is responsible for drawing the objects structure into the canvas element and manage its rendering state.
 *
 * Object are updated by the renderer before drawing, the renderer sorts the objects by layer, checks for pointer events and draw the objects into the screen.
 *
 * Input handling is also performed by the renderer (it is also used for the event handling).
 *
 * @class
 * @param {Element} canvas Canvas to render the content to.
 * @param {Object} options Renderer canvas options.
 */
function Renderer(canvas, options)
{
	// Default options
	var defaultOptions =
	{
		alpha: true,
		disableContextMenu: true,
		imageSmoothingEnabled: true,
		imageSmoothingQuality: "low",
		globalAlpha: 1.0,
		// "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor"
		globalCompositeOperation: "source-over", 
		 // "auto", "optimizeSpeed", "optimizeLegibility", "geometricPrecision"
		textRendering: "auto",
		filter: null
	};

	options = options ? Object.assign(defaultOptions, options) : defaultOptions;
	
	/**
	 * Event manager for DOM events created by the renderer.
	 * 
	 * Created automatically when the renderer is created. Disposed automatically when the renderer is destroyed.
	 * 
	 * @type {EventManager}
	 */
	this.manager = new EventManager();

	if(options.disableContextMenu) {
		this.manager.add(canvas, "contextmenu", function(e) {
			e.preventDefault();
			e.stopPropagation();
		}); 
	}

	this.manager.create();

	/**
	 * Canvas DOM element, the user needs to manage the canvas state.
	 *
	 * The canvas size (width and height) should always match its actual display size (adjusted for the device pixel ratio).
	 *
	 * @type {Element}
	 */
	this.canvas = canvas;

	/**
	 * Division where DOM and SVG objects should be placed at. This division should be perfectly aligned whit the canvas element.
	 *
	 * If no division is defined the canvas parent element is used by default to place these objects.
	 *
	 * The DOM container to be used can be obtained using the getDomContainer() method.
	 *
	 * @type {Element}
	 */
	this.container = null;

	/**
	 * Canvas 2D rendering context used to draw content.
	 *
	 * The options passed thought the constructor are applied to the context created.
	 *
	 * @type {CanvasRenderingContext2D}
	 */
	this.context = this.canvas.getContext("2d", {alpha: options.alpha});
	this.context.imageSmoothingEnabled = options.imageSmoothingEnabled;
	this.context.imageSmoothingQuality = options.imageSmoothingQuality;
	this.context.globalCompositeOperation = options.globalCompositeOperation;
	this.context.globalAlpha = options.globalAlpha;
	this.context.textRendering = options.textRendering;
	this.context.filter = options.filter;

	/**
	 * Pointer input handler object, automatically updated by the renderer.
	 *
	 * The pointer is attached to the DOM window and to the canvas provided by the user.
	 *
	 * @type {Pointer}
	 */
	this.pointer = new Pointer(window, this.canvas);

	/**
	 * Indicates if the canvas should be automatically cleared before new frame is drawn.
	 *
	 * If set to false the user should clear the frame before drawing.
	 *
	 * @type {boolean}
	 */
	this.autoClear = true;
}

/**
 * Get the DOM container to be used to store DOM and SVG objects.
 *
 * Can be set using the container attribute, by default the canvas parent element is used.
 *
 * @returns {Element} DOM element selected for objects.
 */
Renderer.prototype.getDomContainer = function()
{
	return this.container !== null ? this.container : this.canvas.parentElement;
};

/**
 * Creates a infinite render loop to render the group into a viewport each frame.
 *
 * Automatically creates a viewport controls object, used for the user to control the viewport.
 *
 * The render loop can be accessed trough the animation timer returned. Should be stopped when no longer necessary to prevent memory/code leaks.
 *
 * @param {Object2D} group Object to be rendered, alongside with all its children. Object2D can be used as a container to group objects.
 * @param {Viewport} viewport Viewport into the scene.
 * @param {Function} onUpdate Function called before rendering the frame, can be used for additional logic code. Object logic should be directly written in the update method of objects.
 * @return {AnimationTimer} Animation timer created for this render loop. Should be stopped when no longer necessary.
 */
Renderer.prototype.createRenderLoop = function(group, viewport, onUpdate)
{
	var self = this;

	var controls = new ViewportControls(viewport);
	var timer = new AnimationTimer(function()
	{
		if(onUpdate !== undefined)
		{
			onUpdate();
		}

		controls.update(self.pointer);
		self.update(group, viewport);
	});
	timer.start();

	return {timer: timer, controls: controls};
};

/**
 * Dispose the renderer object, clears the pointer events attached to the window/canvas.
 *
 * Should be called if the renderer is no longer in use to prevent code/memory leaks.
 */
Renderer.prototype.dispose = function(group, viewport, onUpdate)
{
	this.manager.destroy();
	this.pointer.dispose();
};

/**
 * Renders a object using a user defined viewport into a canvas element.
 *
 * Before rendering automatically updates the input handlers and calculates the objects/viewport transformation matrices.
 *
 * The canvas state is saved and restored for each individual object, ensuring that the code of one object does not affect another one.
 *
 * Should be called at a fixed rate preferably using the requestAnimationFrame() method, its also possible to use the createRenderLoop() method, that automatically creates a infinite render loop.
 *
 * @param object {Object2D} Object to be updated and drawn into the canvas, the Object2D should be used as a group to store all the other objects to be updated and drawn.
 * @param viewport {Viewport} Viewport to be updated (should be the one where the objects will be rendered after).
 */
Renderer.prototype.update = function(object, viewport)
{
	// Get objects to be rendered
	var objects = [];

	// Traverse object and get all objects into a list.
	object.traverse(function(child)
	{
		if(child.visible)
		{
			objects.push(child);
		}
	});

	// Sort objects by layer
	objects.sort(function(a, b)
	{
		if(b.layer === a.layer)
		{
			return b.level - a.level;
		}
		
		return b.layer - a.layer;
	});

	// Pointer object update
	var pointer = this.pointer;
	pointer.update();

	// Viewport transform matrix
	viewport.updateMatrix();

	// Project pointer coordinates
	var point = pointer.position.clone();
	var viewportPoint = viewport.inverseMatrix.transformPoint(point);

	// Object pointer events
	for(var i = 0; i < objects.length; i++)
	{
		var child = objects[i];
		
		//Process the object pointer events
		if(child.pointerEvents)
		{
			// Calculate the pointer position in the object coordinates
			var localPoint = child.inverseGlobalMatrix.transformPoint(child.ignoreViewport ? point : viewportPoint);

			// Check if the pointer pointer is inside
			if(child.isInside(localPoint))
			{
				// Pointer enter
				if(!child.pointerInside && child.onPointerEnter !== null)
				{			
					child.onPointerEnter(pointer, viewport);
				}

				// Pointer over
				if(child.onPointerOver !== null)
				{
					child.onPointerOver(pointer, viewport);
				}

				// Double click
				if(pointer.buttonDoubleClicked(Pointer.LEFT) && child.onDoubleClick !== null)
				{
					child.onDoubleClick(pointer, viewport);
				}

				// Pointer pressed
				if(pointer.buttonPressed(Pointer.LEFT) && child.onButtonPressed !== null)
				{	
					child.onButtonPressed(pointer, viewport);
				}

				// Just released
				if(pointer.buttonJustReleased(Pointer.LEFT) && child.onButtonUp !== null)
				{	
					child.onButtonUp(pointer, viewport);
				}

				// Pointer just pressed
				if(pointer.buttonJustPressed(Pointer.LEFT))
				{
					if(child.onButtonDown !== null)
					{
						child.onButtonDown(pointer, viewport);
					}

					// Drag object and break to only start a drag operation on the top element.
					if(child.draggable)
					{
						child.beingDragged = true;
						if(child.onPointerDragStart !== null)
						{
							child.onPointerDragStart(pointer, viewport);
						}
						break;
					}
				}

				child.pointerInside = true;
			}
			else if(child.pointerInside)
			{
				// Pointer leave
				if(child.onPointerLeave !== null)
				{
					child.onPointerLeave(pointer, viewport);
				}

				child.pointerInside = false;
			}

			// Stop object drag
			if(pointer.buttonJustReleased(Pointer.LEFT))
			{	
				if(child.draggable)
				{
					// On drag end callback
					if(child.beingDragged === true && child.onPointerDragEnd !== null)
					{
						child.onPointerDragEnd(pointer, viewport);
					}
					child.beingDragged = false;
				}
			}
		}
	}

	// Object drag events and update logic
	for(var i = 0; i < objects.length; i++)
	{
		var child = objects[i];

		// Pointer drag event
		if(child.beingDragged)
		{
			if(child.onPointerDrag !== null)
			{
				var lastPosition = pointer.position.clone();
				lastPosition.sub(pointer.delta);

				// Get position and last position in world space to calculate world pointer movement
				var positionWorld = viewport.inverseMatrix.transformPoint(pointer.position);
				var lastWorld = viewport.inverseMatrix.transformPoint(lastPosition);

				// Pointer movement delta in world coordinates
				var delta = positionWorld.clone();
				delta.sub(lastWorld);

				child.onPointerDrag(pointer, viewport, delta, positionWorld);
			}
		}

		// On update
		if(child.onUpdate !== null)
		{
			child.onUpdate();
		}
	}

	// Update transformation matrices
	object.traverse(function(child)
	{
		child.updateMatrix();
	});

	this.context.setTransform(1, 0, 0, 1, 0, 0);
	
	// Clear canvas content
	if(this.autoClear)
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	// Render into the canvas
	for(var i = objects.length - 1; i >= 0; i--)
	{	
		if(objects[i].isMask)
		{
			continue;
		}

		if(objects[i].saveContextState)
		{
			this.context.save();
		}

		// Apply all masks
		var masks = objects[i].masks;
		for(var j = 0; j < masks.length; j++)
		{
			if(!masks[j].ignoreViewport)
			{
				viewport.matrix.setContextTransform(this.context);
			}

			masks[j].transform(this.context, viewport, this.canvas, this);
			masks[j].clip(this.context, viewport, this.canvas);
		}

		// Set the viewport transform
		if(!objects[i].ignoreViewport)
		{
			viewport.matrix.setContextTransform(this.context);
		}
		else if(masks.length > 0)
		{
			this.context.setTransform(1, 0, 0, 1, 0, 0);
		}

		// Apply the object transform to the canvas context
		objects[i].transform(this.context, viewport, this.canvas, this);

		// Style the canvas context
		if(objects[i].style !== null)
		{
			objects[i].style(this.context, viewport, this.canvas);
		}

		// Draw content into the canvas.
		if(objects[i].draw !== null)
		{
			objects[i].draw(this.context, viewport, this.canvas);
		}

		if(objects[i].restoreContextState)
		{
			this.context.restore();
		}
	}
};

export {Renderer};
