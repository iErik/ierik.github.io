var path = require('path');
var config = require('../config');
var utils = require('./utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extendOwn = require('underscore').extendOwn;
var env = config.build.env;

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  vue: {
    loaders: extendOwn(
      utils.cssLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true
      }),
      { coffee: 'babel-loader!coffee-loader'
      }
    )
  },
  plugins: [
    // The DefinePlugin allows you to create global constants which can be
    // configured at compile time.
    new webpack.DefinePlugin({
      'process.env': env
    }),

    // Minimize all JavaScript output of chunks. Loaders are switched into
    // minimizing mode. You can pass an object containing UglifyJS options.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // Assign the module and chunk ids by occurrence count. Ids that are
    // used often get lower (shorter) ids. This make ids predictable,
    // reduces total file size and is recommended.
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // Any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),

    // Extract webpack runtime and module manifest to it's own file in
    // order to prevent vendor hash from being updated whenever app bundle
    // is updated.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    // It moves every require("style.css") in entry chunks into a separate
    // css output file. So your styles are no longer inlined into the
    // javascript, but separate in a css bundle file (styles.css)
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),


    // Generates an HTML5 file for you that includes all your webpack
    // bundles in the body/head using script/link tags.
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // More options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // Necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  ]
})
