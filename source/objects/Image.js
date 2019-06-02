"use strict";

import {Object2D} from "../Object2D.js";

function Image(src)
{
	Object2D.call(this);

	this.image = document.createElement("img");
	this.image.src = src;
}

Image.prototype = Object.create(Object2D.prototype);

Image.prototype.draw = function(context)
{
	context.drawImage(this.image, 0, 0);
};

export {Image};
