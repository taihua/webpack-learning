var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
let PurifyCSSPlugin = require('purifycss-webpack');
var inProduction = process.env.NODE_ENV === 'production'
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: [
            './src/main.js',
            './src/main10.scss'
            ],
        vendor:[
            'jquery'
        ]

    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules : [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: [ 'css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options:{
                    name: 'images/[name].[hash].[ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },

    plugins:[
        new ExtractTextPlugin('[name].css'),
        new CleanWebpackPlugin(['dist'], {
          root: __dirname,
          verbose: true,
          dry: false
        }),
        // Make sure this is after ExtractTextPlugin!
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: inProduction
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: inProduction
        })
    ]
};

if (inProduction){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}