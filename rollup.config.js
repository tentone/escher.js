import strip from "rollup-plugin-strip";

export default {
	input: "source/Diagram.js",
	plugins: [
		strip(
		{
			functions: ["console.*", "assert.*", "debug", "alert"],
			debugger: false,
			sourceMap: false
		})
	],
	output: [
		{
			format: "umd",
			name: "Diagram",
			file: "build/diagram.js",
			indent: "\t"
		},
		{
			format: "es",
			file: "build/diagram.module.js",
			indent: "\t"
		}
	]
};
