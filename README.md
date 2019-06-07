# trenette.js

 - Web based diagram and graph building framework.
 - Entity based diagram build system, entities are stores as a tree. Parent elements transformations affect the children transforms.
 - Boxes, circle, custom shapes, lines, customizable elements.
 - Support for DOM elements using CSS transforms (useful for text input, or more complex user interaction).
 - Built in viewport controls with drag, zoom and move functions.
 - Supports mobile web browsers.



![graph](C:\Users\joseferrao\Documents\Git\trenette.js\examples\graph.png)

### Getting started

- There are a couple of example in the example folder, they can be used as base for your project.



### Setup

- Trenette is based on web canvas, it requires a DOM canvas element to draw its content.
- It is necessary for the canvas element width and height parameters to be properly configured since their values are used to process user input.
- When using other DOM elements with the framework is also necessary to setup a DOM div to store these elements. (Booth the canvas and division should have the same position and size and should be aligned).



### Custom Objects

- Its possible to create custom graph elements by expanding the Object2D class, and overriding its draw(), transform() methods.
- The draw(context, viewport, canvas) function is where the object gets draw into the screen, here you can implement your custom object as if it was drawn alone in a canvas.
- Consider the point zero the origin of the object, every object has a position, rotation, scale and origin points used to control the object transform, these points don't need to be considered in the draw method.
- Example of a custom element, drawing a custom box with a red gradient.

```javascript
var object = new Trenette.Object2D();
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





### Pointer events

- The system supports multiple pointer events that can be used to control the objects and interact with the users.



### DOM Objects

- Its possible to use DOM elements in the graph, by applying CSS transform to absolute positioned elements the system already provides a DOM base object that creates a basic division.



### License

 - This project is distributed under MIT license available on the repository page.

