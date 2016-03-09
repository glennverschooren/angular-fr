var path = require('path');
var webpack = require('webpack');

var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

var metadata = {
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
};

module.exports = {
    devtool: 'source-map', // debug with source map, use eval for more speed
    debug: true,
    entry: ['./src/main.ts' ],
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    output: {
        path: root('dist'), // output path
        filename: 'bundle.js',
        sourceMapFileName: '.map'
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint'
            }
        ],
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new ForkCheckerPlugin(), // do type checking in a separete process, so webpack don't need to wait
        //new webpack.optimize.CommonsChunckPlugin('shared.js')
    ],
    tslint: {
        emitErrors: false, // errors are displayed as warnings
        failOnHint: false, // don't interrupt the compilation 
    },
    devServer: {
        port: metadata.port,
        host: metadata.host,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
};