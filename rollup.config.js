import strip from "rollup-plugin-strip";

export default {
	input: "source/Trenette.js",
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
			name: "Trenette",
			file: "build/trenette.js",
			indent: "\t"
		},
		{
			format: "es",
			file: "build/trenette.module.js",
			indent: "\t"
		}
	]
};
