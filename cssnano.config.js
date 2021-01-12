module.exports = {
	preset: [require('cssnano-preset-default')],
	plugins: [
		require("autoprefixer"),
		require("postcss-preset-env")
	]
}