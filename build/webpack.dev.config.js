var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = require('./webpack.base.config')

config.entry = (config.entry || []).concat([
  'webpack-hot-middleware/client'
])

config.devtool = 'eval-source-map'

config.devServer = {
  outputPath: '/'
}

config.plugins = (config.plugins || []).concat([
  new HtmlWebpackPlugin({
    template: './web/index.html'
  }),
  new CopyWebpackPlugin([{
    from: './web/images',
    to: 'images'
  }]),
  new ExtractTextPlugin('styles/styles.css', {
    publicPath: '/',
    allChunks: true
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
])

module.exports = config
