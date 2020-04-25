var path = require('path');
var webpack = require('webpack');

var config = {
    devtool: 'inline-source-map',
	entry:[
		'webpack-hot-middleware/client',
		'./src/main.jsx'
	],
	output:{
		path    :path.join(__dirname,'vistas'),
		filename:'bundle.js',
	},
	module:{
		rules:[
			{
				test   : /\.jsx$/,
				exclude:/node_modules/,
				use    :[
					'react-hot-loader',
					'babel-loader'
				]
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
				use:[{
					loader: 'url-loader',
					options:{
						limit: 100000,
						name: 'assets/resources/[name].[ext]'
					}
				}]
			},
			{
				test: /\.scss$/,
				use:[
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
            {
                test: /\.css$/,
                include: /node_modules/,
                loader: 'style-loader!css-loader'
            }
		]
	},
	resolve:{
		modules:[
			path.join(__dirname,'node_modules')
		],
		extensions:['.jsx','.js']
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.LoaderOptionsPlugin({
		  minimize: true,
		  debug: true,
		  options: {
		    context: __dirname
		  }
		})
	]
};

module.exports = config;
