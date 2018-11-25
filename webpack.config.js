const path = require('path')
module.exports = {
  entry: {
    index: './src/index.js',
    'test-proxy': './test/proxy.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  }
}