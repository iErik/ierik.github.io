var path = require('path');
var config = require('../config');
var utils = require('./utils');
var autoprefixer = require('autoprefixer');
var extendOwn = require('underscore').extendOwn;

var projectRoot = path.resolve(__dirname, '../');
var env = process.env.NODE_ENV;

// Check env & config/index.js to decide wheter to enable CSS
// source maps for the various preporcessor loaders added to
// vue-loader at the end of this file.
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap);
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

module.exports =
{ entry: { app: './src/main.coffee' }
, output:
    { path: config.build.assetsRoot
    , publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
    , filename: '[name].js'
    }

, resolve:
  { extensions: ['', '.js', '.coffee', '.vue', '.scss', '.sass', '.json', '.yml', '.md', '.svg']
  , fallback: [path.join(__dirname, '../node_modules')]
  , alias:
    { vue$: 'vue/dist/vue.common.js'

    , 'src': path.resolve(__dirname, '../src')
    , 'config': path.resolve(__dirname, '../src/config')
    , 'utils': path.resolve(__dirname, '../src/utils')
    , 'layouts': path.resolve(__dirname, '../src/layouts')
    , 'pages': path.resolve(__dirname, '../src/pages')
    , 'components': path.resolve(__dirname, '../src/components')
    , 'transitions': path.resolve(__dirname, '../src/transitions')

    , 'styles': path.resolve(__dirname, '../src/styles')
    , 'markdown': path.resolve(__dirname, '../src/assets/markdown')
    , 'images': path.resolve(__dirname, '../src/assets/img')
    , 'fonts': path.resolve(__dirname, '../src/assets/fonts')
    ,
    }
  }
, resolveLoader:
  { fallback: [path.join(__dirname, '../node_modules')]
  }

, module:
  { loaders:
    [
      { test: /\.vue$/
      , loader: 'vue'
      }
      ,
      { test: /\.js$/
      , loader: 'babel'
      , include: [ path.join(projectRoot, 'src') ]
      , exclude: /node_modules/
      }
      ,
      { test: /\.coffee$/
      , loaders: ['babel-loader', 'coffee-loader']
      , include: [ path.join(projectRoot, 'src') ]
      , exclude: /node_modules/
      }
      ,
      { test: /\.md$/
      , loader: 'markdown-with-front-matter-loader'
      }
      ,
      { test: /\.json$/
      , loader: 'json'
      }
      ,
      { test: /\.yml$/
      , loaders: ['json-loader', 'yaml-loader']
      }
      ,
      { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/
      , loader: 'url'
      , query:
        { limit: 10000
        , name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
      ,
      { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/
      , loader: 'url'
      , query:
        { limit: 10000
        , name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }

, vue:
  { loaders: extendOwn(utils.cssLoaders({ sourceMap: useCssSourceMap }), {
      coffee: 'babel-loader!coffee-loader',
    })
  , postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
  },
}
