var path              = require('path');
var webpack           = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var config = {
    devtool: 'inline-source-map',
    entry  :[
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
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
                use :[{
                    loader : 'url-loader',
                    options:{
                        limit: 100000,
                        name : 'assets/resources/[name].[ext]'
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
        new webpack.optimize.UglifyJsPlugin(), //minify everything
        new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
        new CompressionPlugin({
              asset: "[path].gz[query]",
              algorithm: "gzip",
              test: /\.js$|\.css$|\.html$/,
              threshold: 10240,
              minRatio: 0.8
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;
