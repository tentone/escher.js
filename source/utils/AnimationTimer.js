/**
 * Animation timer should be used to run the update and render loops of the application.
 * 
 * Underneat it uses the requestAnimationFrame() method that calls the function with the same rate as the screen refresh rate.
 * 
 * @class
 * @param {Function} callback Timer callback function.
 */
function AnimationTimer(callback)
{
	/**
	 * Task of the timer, executed at the timer defined rate.
	 * 
	 * @type {Function}
	 */
	this.callback = callback;

	/**
	 * Indicates if the timer is currently running, it is set to true on start and reset to false on stop.
	 * 
	 * @type {boolean}
	 */
	this.running = false;

	/**
	 * ID of the currently waiting timeout clock. Used to cancel the already request execution of the next clock tick.
	 * 
	 * @type {number}
	 */
	this.id = -1;
}

/**
 * Start timer, is the timer is already running does not do anything.
 */
AnimationTimer.prototype.start = function()
{
	if(this.running)
	{
		return;
	}

	this.running = true;

	var self = this;
	function loop()
	{
		self.callback();

		if(self.running)
		{
			self.id = requestAnimationFrame(loop);
		}
	}

	loop();
};

/**
 * Stop animation timer, should be called when the render loop is no longer in use to prevent code/memory leaks.
 *
 * If the timer is not stopped the loop will keep running using processing power and consuming memory.
 */
AnimationTimer.prototype.stop = function()
{
	this.running = false;
	cancelAnimationFrame(this.id);
};

export {AnimationTimer};
