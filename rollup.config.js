import strip from "rollup-plugin-strip";

export default {
	input: "source/Escher.js",
	plugins: [
		strip(
		{
			functions: ["assert.*", "debug", "alert"],
			debugger: false,
			sourceMap: false
		})
	],
	output: [
		{
			format: "umd",
			name: "Escher",
			file: "build/escher.js",
			indent: "\t"
		},
		{
			format: "es",
			file: "build/escher.module.js",
			indent: "\t"
		}
	]
};
