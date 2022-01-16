const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  devServer: {
    open: true,
    port: 3000,
    historyApiFallback: true,
    compress: true,
  },
  mode: 'development',
  devtool: 'eval',
});
