const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = process.env

const isProduction = () => {
  return env === 'production'
}

const paths = {
  base: (...args) => path.resolve(__dirname, ...args),
  source: (...args) => path.resolve(__dirname, 'src', ...args),
  build: (...args) => path.resolve(__dirname, 'build', ...args)
}

module.exports = {
  entry: paths.source('main.js'),
  output: {
    path: paths.build(),
    filename: '[name].[hash].js'
  },
  target: 'web',
  devtool: isProduction() ? false : 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: path.resolve(__dirname, './node_modules/')
      }, {
        test: /\.(jpe?g|png|gif|svg|tga|gltf|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
        use: 'file-loader',
        exclude: path.resolve(__dirname, './node_modules/')
      }, {
        test: /\.(vert|frag|glsl|shader|txt)$/i,
        use: 'raw-loader',
        exclude: path.resolve(__dirname, './node_modules/')
      }, {
        type: 'javascript/auto',
        test: /\.(json)/,
        exclude: path.resolve(__dirname, './node_modules/'),
        use: [{
          loader: 'file-loader'
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([{
      from: paths.base('static'),
      to: paths.build()
    }]),
    new webpack.ProvidePlugin({
      THREE: 'three'
    })
  ]
}
