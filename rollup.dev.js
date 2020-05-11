import serve from "rollup-plugin-serve";

export default {
	input: "source/Escher.js",
	plugins: [
		serve({
			open: true,
			contentBase: '.',
			openPage: '/examples',
			host: 'localhost',
			port: 8080
		})
	],
	output: [
		{
			format: "umd",
			name: "Escher",
			file: "build/escher.js",
			indent: "\t"
		}
	]
};
