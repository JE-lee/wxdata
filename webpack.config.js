const path = require('path')
module.exports = {
  entry: './test/proxy.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'test.js',
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  }
}