"use strict";

import {Stencil} from "./Stencil.js";
import {Vector2} from "../math/Vector2.js";
import {Box2} from "../math/Box2.js";

function ResetStencil()
{
	Stencil.call(this);
}

ResetStencil.prototype = Object.create(Stencil.prototype);

