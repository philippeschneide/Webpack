const path = require('path');

// to import external plugins / dependency like jquery
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
	filename: 'main.css'
});

module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'bundle.min.js',
		publicPath: '/dist'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: extractPlugin.extract({
					use: ['css-loader','sass-loader']
				})
			}
		]
	},
	plugins: [
		
		// for external plugins like jquery
		new webpack.ProvidePlugin({
			// map $ and jQuery to jquery
			$: 'jquery',
			jQuery: 'jquery'
		}),

		extractPlugin
	]
};