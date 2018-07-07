/**
 * Webpack settings
 *
 * @see - https://webpack.js.org/guides/hmr-react/#webpack-config
 */
const { resolve } = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
		/**
		 * Allow all reacts to resolve to one module so npm link works
		 * @see - http://stackoverflow.com/a/31170775/5429686
		 */
		alias: {
			// react: resolve('./node_modules/react'),
			// 'react-router': resolve('./node_modules/react-router'),
		},
	},
	entry: [
		// the entry point of our app
		'./index.jsx',
	],
	output: {
		path: resolve(__dirname, 'dist'),

		// necessary for HMR to know where to load the hot update chunks
		// publicPath: '/',
	},

	context: resolve(__dirname, 'src'),

	devtool: 'inline-source-map',

	devServer: {
		// enable HMR on the server
		hot: true,

		// match the output path
		contentBase: resolve(__dirname, 'dist'),

		// match the output `publicPath`
		// publicPath: '/',

		// Allow for HTML 5 navigation (single page nav without #)
		historyApiFallback: {
			rewrites: [{ to: '/index.html' }],
		},
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: ['babel-loader'],
				include: /src/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			// {
			// 	test: /\.json$/,
			// 	loader: 'json-loader',
			// },
			{
				test: /\.(jpe?g|png|gif|ico)$/i,
				loader: 'file-loader?name=[name].[ext]',
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff',
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
			},
		],
	},
	plugins: [
		// enable HMR globally
		new webpack.HotModuleReplacementPlugin(),

		// Moves the index.html file over and asset folder to the dist folder
		new CopyWebpackPlugin([
			// {output}/dist/file.txt
			{ from: 'index.html' },

			// Copy directory contents to {output}/to/directory/
			{ from: 'assets', to: 'assets' },
		]),
	],
};