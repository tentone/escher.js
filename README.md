# escher.js
[![npm version](https://badge.fury.io/js/escher.js.svg)](https://badge.fury.io/js/escher.js)[![GitHub version](https://badge.fury.io/gh/tentone%2Fescher.js.svg)](https://badge.fury.io/gh/tentone%2Fescher.js)[![GitHub stars](https://img.shields.io/github/stars/tentone/escher.js.svg)](https://github.com/tentone/escher.js/stargazers)

 - Web based 2D graphics framework on top of the canvas API.
 - Entity based diagram build system, entities are stores as a tree.
 - Interactive 2D graphics with complex pointer events and viewport controls.
 - Compose complex animated canvas objects using parent-children transforms.
 - Extensible using already existing canvas based visualization libs. 
 - Base objects boxes, circle, custom shapes, lines, that can be used to compose more complex objects.
 - Support for DOM elements using CSS transforms (Useful for text input and more complex user interaction).
 - Built in viewport controls with drag, zoom and move functions. Supports mobile web browsers.

![graph](<https://tentone.github.io/escher.js/readme/example.png>)


### Examples / Documentation

- Sometimes the best way to learn about something is to try it yourself, there are a couple of example in the example folder in the Git repository. They can be used as base for your project.
  - [Playground](https://tentone.github.io/escher.js/examples/playground)
  - [Physics](https://tentone.github.io/escher.js/examples/physics)
  - [PDF & TIFF (External libraries)](https://tentone.github.io/escher.js/examples/pdftiff)
  - [Masks](https://tentone.github.io/escher.js/examples/mask)
  - [Snake Game](https://tentone.github.io/escher.js/examples/snake)
  - [Node Graph](https://tentone.github.io/escher.js/examples/node)
  - [Stress test](https://tentone.github.io/escher.js/examples/stress)
- There is also available API documentation containing implementation details about all the internal components of the framework and detailed functionality descriptions.
  - [API Documentation](https://tentone.github.io/escher.js/docs/)



### Getting Started
- Add the library to your project by using the precompiled file availabe on the repository or by downloading it from NPM.
- Escher is based on web canvas, it requires a DOM canvas element to draw its content.
- It is necessary for the canvas element width and height parameters to be properly configured since their values are used to process user input.
- When using other DOM elements with the framework is also necessary to setup a DOM div to store these elements. (Booth the canvas and division should have the same position and size and should be aligned).
- The code bellow shows how a canvas could be configured for a full screen setup. The canvas is created in the HTML document, preferably encapsulated in some div (for DOM based objects).

```html
<div style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px">
    <canvas id="canvas" style="width: 100%; height: 100%;"></canvas>
</div>
```

```javascript
var canvas = document.getElementById(canvas);
document.body.onresize = function()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};
```

- The coordinate system used, is the same as if using the canvas API directly -Y is down relative to the origin and +X is left relative to the origin. All objects are positioned using this coordinate system.

![graph](<https://tentone.github.io/escher.js/readme/grid.png>)

- We can now put together a simple application we can start by creating a `Object2D` object to serve as a container for all other objects. Objects can be added to the container using the `add()` method.
- The `Viewport` object is used to define how the user views the objects, the window size, zoom and rotation.
- Now all that is left is to create a `Renderer` that will take care of drawing the object to the screen for us. By using the `createRenderLoop()` method the renderer also creates a control object for user interaction with the viewport (dragging, zoom, rotate) using the mouse/touchscreen.

```javascript
var group = new Escher.Object2D();

var text = new Escher.Text();
text.position.set(0, -100);
text.text = "Hello World!"
group.add(text);

var box = new Escher.Box();
box.position.set(-100, 0);
group.add(box);

var circle = new Escher.Circle();
circle.position.set(100, 0);
circle.radius = 50;
group.add(circle);

var viewport = new Escher.Viewport(canvas);

var renderer = new Escher.Renderer(canvas);

renderer.createRenderLoop(group, viewport);
```

![graph](<https://tentone.github.io/escher.js/readme/hello.png>)

- Alternatively you can create the render loop manually, the render loop should be called at the same rate as the screen is refreshed using the [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) method or a `AnimationTimer` object from the library.

```javascript
var renderer = new Escher.Renderer(canvas);
var controls = new ViewportControls(viewport);

var timer = new AnimationTimer(function()
{
    controls.update(renderer.pointer);
    renderer.update(group, viewport);
});
timer.start();
```

- If the application is not running a full screen canvas there might be some problems with the page scrolling around or showing context menu while interacting to prevent this we can disable/prevent these browser events.
  - In the example we use the `EventManager` object to create and manage these events but we could also create these directly attached to the DOM elements.

```javascript
function preventDefault(event)
{
    event.preventDefault();
    return false;
}

var event = new EventManager();
event.add(canvas, 'DOMMouseScroll', preventDefault);
event.add(canvas, 'wheel', preventDefault);
event.add(canvas, 'mousewheel', preventDefault);
event.add(canvas, 'contextmenu', preventDefault);
event.create();
```



### Viewport

- The `Viewport` is the object that indicates how the user will view the objects, the viewport can be used to change the position of the elements, zoom in and out, or even rotate the entire canvas.
- Some object might ignore the viewport transformations by setting the `ignoreViewport` flag to false. This will indicate to the renderer to reset the viewport transform for that object so that the viewport does not affect it.
- We can use the `ViewportController` (or implement new variants of this object) to allow the user control over the viewport.

![graph](<https://tentone.github.io/escher.js/readme/viewport.png>)



### Node Graph

- Node graph can be used to create node diagrams, node have inputs and outputs sockets that can be connected using node connectors.
- Data flows between the nodes, each node class has to implement how its data is processed using the `getValue()` method of its sockets. This method is called across the nodes connected together to retrieve the result at any point.

```javascript
registerSockets()
{
	this.a = this.addInput("number", "a");
	this.b = this.addInput("number", "b");
    
	this.r = this.addOutput("number", "r");
	this.r.getValue = () =>
	{
        // Add input A and input B
		return this.a.getValue() + this.b.getValue();
	};
}
```

- The node value propagates trough the node connections from outputs to inputs.
- Its possible to integrate user input elements using the DOM wrapper object.

![graph](<https://tentone.github.io/escher.js/readme/nodes.png>)



### Custom Objects

- Its possible to create custom graph elements by expanding the Object2D class, and overriding its `draw(context, viewport, canvas)` and its `transform(context, viewport, canvas)` methods.
- The `draw(context, viewport, canvas)` function is where the object gets draw into the screen, here you can implement your custom object as if it was drawn alone in a canvas.
- The `transform(context, viewport, canvas)` is where the object matrix gets applied to the canvas drawing context, it is assumed that the viewport transformation was pre-applied.
- Consider the point zero the origin of the object, every object has a position, rotation, scale and origin points used to control the object transform, these points don't need to be considered in the draw method.
- Example of a custom element, drawing a custom box with a red gradient box. Its also possible to extend other base objects like `Box` that already includes the necessary code for mouse events.

```javascript
var object = new Escher.Object2D();
object.draw = function(context, viewport, canvas)
{
    // Create gradient
    var grd = context.createLinearGradient(0, 0, 70, 0);
    grd.addColorStop(0, "#FF0000");
    grd.addColorStop(1, "#FFFFFF");

    // Fill with gradient
    context.fillStyle = grd;
    context.fillRect(-70, 70, 140, 140);
};
```



### Data Serialization

- The library includes a per-object serialization extensible API. Every base object implements a serialize() and parse() methods that indicate how that specific object type should be serialized and loaded.
- The parse() method receives json data and access to the loaded root object that can be used to get refences to other objects.
  - All references to other objects should be done by storing the object UUID and later on getting the object directly from the root.
- For custom objects it is possible to implement these serialization methods easily. It is necessary to register the new object type for the loader to know the data type and create a type attribute in the object.
- If your custom object is just composed of base objects, they should be automatically serializable without any additional code.

```javascript
class CustomObject extends Escher.Node
{
	constructor(operation)
	{
		super();

		this.type = "CustomObject";
		this.something = 2;
	}

	serialize(recursive)
	{
		var data = super.serialize(recursive);
		data.something = this.something;
		return data;
	}
    
	parse(data, root)
	{
		super.parse(data, root);
		this.something = data.something;
	}
}

Escher.Object2D.register(CustomObject, "CustomObject");
```

- When creating custom objects that are composed of multiple base objects built on the constructor you will need to disable serialization for those objects (otherwise there will be duplicated instances on parse). This can be done by settings the `serializable` attribute to false.

```javascript
constructor()
{
	super();
	this.text = new Escher.Text();
	this.text.serializable = false;
	this.add(this.text);
}
```

- Sometimes it might be necessary to access references to other objects in the group. It is recommended to store these relations by their UUID and rebuilding from the root object.

```javascript
parse(data, root)
{
	this.someObject = root.getChildByUUID(data.someObject);
}
```



### Pointer events

- The system supports multiple pointer events that can be used to control the objects and interact with the users.

```javascript
// Called when the pointer enters the object.
onPointerEnter(pointer, viewport);

// Called when the was inside of the object and leaves the object.
onPointerLeave(pointer, viewport);

// Called while the pointer is over (inside) of the object.
onPointerOver(pointer, viewport);

// Called when the object is dragged across the screen, only works if the object has the property draggable set true.
// Delta is the movement of the pointer already translated into local object coordinates.
onPointerDrag(pointer, viewport, delta);

// Called while the pointer button is pressed.
onButtonPressed(pointer, viewport);

// Called when the pointer button is pressed down.
onButtonDown(pointer, viewport);

// Called after the pointer button gets released.
onButtonUp(pointer, viewport);
```



### DOM Objects

- Its possible to use DOM elements in the graph, by applying CSS transform to absolute positioned elements the system already provides a DOM base object that creates a basic division.
- DOM objects are always drawn on top of everything else, its not possible to partially occlude a DOM object with a canvas object.
- DOM objects contain a div `element` inside that can be used to attach custom code, by default that element `pointerEvents` CSS style is set to none, disabling all the pointer events, it can be set to auto to re-enable them.

```javascript
var dom = new Escher.DOM(division);
dom.size.set(100, 50);
dom.origin.set(50, 25);
group.add(dom);

// Re-enable DOM pointer events
dom.element.style.pointerEvents = "auto";

// Attach a new DOM element to the DOM object
var text = document.createElement("div");
text.style.fontFamily = "Arial";
text.style.textAlign = "center";
text.innerHTML = "DOM text!";
dom.element.appendChild(text);
```



### Integrating external libraries

- Its possible to integrate external canvas based libraries with this framework.  The external library need to provide direct access to its drawing  canvas context without resetting its state.
- Another solution to (easier but slower) to integrate libraries is to copy the content from their own self managed canvas into the object draw method.
- Here is an example using the [tiff.js](https://github.com/seikichi/tiff.js) library to draw tiff images using the second method. It creates an internal canvas ands does not provide a draw into this context method.
  - Here we are using the `context.drawImage()` method to copy the content from the internal canvas to the drawing object.

```javascript
// Read the tiff data as arraybuffer from file
var xhr = new XMLHttpRequest();
xhr.responseType = "arraybuffer";
xhr.open("GET", "images/kofax.tif");
xhr.onload = function (e)
{
    // Decode the image using tiffjs
	var tiff = new Tiff({buffer: xhr.response});
	var tiffCanvas = tiff.toCanvas();
	if(tiffCanvas)
	{
        // Create the object to draw
		var tiffImage = new Escher.Object2D();
		tiffImage.draw = function(context, viewport, canvas)
		{	
            // Copy the content of the tiff canvas
			context.drawImage(tiffCanvas, 0, 0);
		};
        
        // Add object to the group
		group.add(tiffImage);
	}
};
xhr.send();
```
 - Some libraries provide `ImageData`, the `context.putImageData()` method does not consider the canvas transforms. To draw `ImageData` into the canvas its possible instead to create a offscreen canvas draw into that canvas and the use the `context.drawImage()` method.



### License

 - This project is distributed under MIT license available on the repository page.

