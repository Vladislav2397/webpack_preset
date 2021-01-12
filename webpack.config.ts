import * as path from 'path'
import * as webpack from 'webpack'
import { merge } from 'webpack-merge'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const config: webpack.Configuration = {
	mode: "none",
	entry: {
		main: path.resolve(__dirname, 'src', 'index.js'),
	},
	output: {
		filename: 'assets/js/[name].js',
		path: path.resolve(__dirname, "./dist")
	},
	module: {
		rules: [
			{	// =============== BABEL loader ===============
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},
			{	// =============== CSS loader ===============
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false
						}
					},
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' }
				]
			},
			{	// =============== SCSS loader ===============
				test: /\.s[ac]ss$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false
						}
					},
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
					{ loader: 'sass-loader' }
				]
			}
		]
	},
}

const devConfig: webpack.Configuration = {
	plugins: [
		new MiniCssExtractPlugin({
			filename: "assets/css/style.css",
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'html', 'index.html')
		}),
	],
	devServer: {
		port: 8080,
		overlay: true,
	}
}

const prodConfig: webpack.Configuration = {
	plugins: [
		new MiniCssExtractPlugin({
			filename: "assets/css/style.css",
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'html', 'index.html')
		}),
		new CleanWebpackPlugin()
	],
}

let env = 'development'


export default (env, argv) => {
	switch (argv.mode) {
		case 'development':
			return merge(config, devConfig)
		case 'production':
			return merge(config, prodConfig)
		default:
			throw new Error('No match configuration')
	}
}