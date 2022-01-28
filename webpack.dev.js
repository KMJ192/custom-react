const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildDir = 'dist';

module.exports = merge(common, {
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, buildDir),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, buildDir),
    },
    open: true,
    port: 3000,
    historyApiFallback: true,
    compress: true,
  },
  mode: 'development',
  devtool: 'eval',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack',
      template: './public/index.html',
      filename: 'index.html',
      minify: false,
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
  ],
});
