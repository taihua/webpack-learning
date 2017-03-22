var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname,'./dist'),
		filename: 'bundle.js'
	},
	module: {
		rules : [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},

	plugins:[]
};

if (process.env.NODE_ENV === 'production'){
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);
}