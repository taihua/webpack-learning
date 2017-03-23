var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var inProduction = process.env.NODE_ENV === 'production'

module.exports = {
	entry: {
		app: './src/main.js'

	},
	output: {
		path: path.resolve(__dirname,'./dist'),
		filename: '[name].js'
	},
	module: {
		rules : [
			{
				test: /\.s[ac]ss$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			},

			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},

	plugins:[
		new ExtractTextPlugin('[name].css')
	]
};

if (inProduction){
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);
}