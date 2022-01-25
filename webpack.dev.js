const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  devServer: {
    open: true,
    port: 3000,
    historyApiFallback: true,
    compress: true,
  },
  mode: 'development',
  devtool: 'eval',
  plugins: [new MiniCssExtractPlugin()],
});
