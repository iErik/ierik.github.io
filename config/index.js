var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../index.html'),
    assetsRoot: path.resolve(__dirname, '../assets'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dev: {
    env: require('./dev.env'),
    port: 2000,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    cssSourceMap: true
  }
}
