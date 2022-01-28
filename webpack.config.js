const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const LinkTypePlugin =
  require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;

// const isProd = process.env.NODE_ENV === 'PRODUCTION';

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      config: path.resolve(__dirname, 'postcss.config.js'),
    },
  },
};

module.exports = {
  entry: './index.ts',
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@react': path.resolve(__dirname, 'react'),
      '@router': path.resolve(__dirname, 'router'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/i,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        oneOf: [
          {
            test: /\.module\.s[ac]ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                },
              },
              postcssLoader,
              'sass-loader',
            ],
            exclude: /node_modules/,
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              postcssLoader,
              'sass-loader',
            ],
            exclude: /node_modules/,
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { import: true },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new LinkTypePlugin({
      '*.css': 'text/css',
    }),
  ],
};
