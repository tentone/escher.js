"use strict";

function ViewportControls(viewport)
{
	this.viewport = viewport;

	var pressed = -1;
	var x = 0, y = 0;
	var dx = 0, dy = 0;

	var self = this;
	
	this.manager = new EventManager();

	this.manager.add(canvas, "contextmenu", function(event)
	{
		event.preventDefault();
		return false;
	});

	this.manager.add(canvas, "mousedown", function(event)
	{
		pressed = event.which;
	});

	this.manager.add(canvas, "mouseup", function(event)
	{
		pressed = -1;
	});
	
	this.manager.add(canvas, "mousemove", function(event)
	{
		dx = event.clientX - x;
		dy = event.clientY - y;
		x = event.clientX;
		y = event.clientY;

		// Mouse
		if(pressed === 3)
		{
			self.viewport.position.x += dx;
			self.viewport.position.y += dy;
		}
	});

	this.manager.add(canvas, "wheel", function(event)
	{
		self.viewport.scale -= (event.deltaY * 0.001) * self.viewport.scale;
	});
}

ViewportControls.prototype.create = function()
{
	this.manager.create();
};

ViewportControls.prototype.destroy = function()
{
	this.manager.destroy();
};
