require('./check-versions')()

var config = require('../config')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.conf')

if (!process.env.NODE_ENV)
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)

var port = process.env.PORT || config.dev.port

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// Handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// Serve webpack bundle output
app.use(devMiddleware)

// Enable hot-reload and state-preserving compilation error display
app.use(hotMiddleware)

// Serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./assets'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
})
