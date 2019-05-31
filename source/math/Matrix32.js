
const Matrix32 = (() =>
{
	// private
	let self;
	let m = [1, 0, 0, 1, 0, 0];

	const reset = () =>
	{
		const m = [1,0,0,1,0,0];
	};

	const multiply = mat =>
	{
		const m0=m[0]*mat[0]+m[2]*mat[1];
		const m1=m[1]*mat[0]+m[3]*mat[1];
		const m2=m[0]*mat[2]+m[2]*mat[3];
		const m3=m[1]*mat[2]+m[3]*mat[3];
		const m4=m[0]*mat[4]+m[2]*mat[5]+m[4];
		const m5=m[1]*mat[4]+m[3]*mat[5]+m[5];
		m=[m0,m1,m2,m3,m4,m5];
	};

	const screenPoint=(transformedX, transformedY) =>
	{
		// invert
		const d =1/(m[0]*m[3]-m[1]*m[2]);
		im = [ m[3]*d, -m[1]*d, -m[2]*d, m[0]*d, d*(m[2]*m[5]-m[3]*m[4]), d*(m[1]*m[4]-m[0]*m[5]) ];

		// point
		return(
		{
			x:transformedX*im[0]+transformedY*im[2]+im[4],
			y:transformedX*im[1]+transformedY*im[3]+im[5]
		});
	};

	const transformedPoint=(screenX, screenY) => ({
		x:screenX*m[0] + screenY*m[2] + m[4],
		y:screenX*m[1] + screenY*m[3] + m[5]
	});

	// public
	class Matrix32
	{
		constructor()
		{
			self = this;
		}

		// shared methods
		translate(x, y)
		{
			const mat = [1, 0, 0, 1, x, y];
			multiply(mat);
		}

		rotate(rAngle)
		{
			const c = Math.cos(rAngle);
			const s = Math.sin(rAngle);
			const mat = [c, s, -s, c, 0, 0];    
			multiply(mat);
		}

		scale(x, y)
		{
			const mat = [x, 0, 0, y, 0, 0];        
			multiply(mat);
		}

		skew(radianX, radianY)
		{
			const mat=[ 1, Math.tan(radianY), Math.tan(radianX), 1, 0, 0 ];
			multiply(mat);
		}

		reset()
		{
			reset();
		}

		setContextTransform(ctx)
		{
			ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
		}

		resetContextTransform(ctx)
		{
			ctx.setTransform(1,0,0,1,0,0);
		}

		getTransformedPoint(screenX, screenY)
		{
			return transformedPoint(screenX, screenY);
		}

		getScreenPoint(transformedX, transformedY)
		{
			return screenPoint(transformedX, transformedY);
		}

		getMatrix()
		{
			const clone = [m[0], m[1], m[2], m[3], m[4], m[5]];
			return(clone);
		}
	}

	return(Matrix32);
})();