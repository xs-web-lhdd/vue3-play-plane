const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './main.js'),
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, './dist')
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [{
      test: /\.(png|jpg|gif)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
        }
      }, ],
      type: 'javascript/auto'
    }, ]
  }
}