const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
});
const faviconPlugin = new FaviconsWebpackPlugin('./src/Assets/favicon.png');
module.exports = {
  mode: process.env.WEBPACK_MODE,
  devServer: {
    historyApiFallback: true
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/admin/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!@auth0\/auth0-spa-js)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', { loader: 'sass-loader', options: { api: 'modern' } }]
      }
    ]
  },
  plugins: [
    htmlPlugin,
    faviconPlugin,
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }),
    new webpack.EnvironmentPlugin(['API_URL', 'AUTH_DOMAIN', 'AUTH_CLIENT_ID', 'AUTH_CALLBACK', 'API_IDENTIFIER', 'LOGOUT_RETURN_URL']),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL),
      AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
      AUTH_CLIENT_ID: JSON.stringify(process.env.AUTH_CLIENT_ID),
      AUTH_CALLBACK: JSON.stringify(process.env.AUTH_CALLBACK),
      API_IDENTIFIER: JSON.stringify(process.env.API_IDENTIFIER),
      LOGOUT_RETURN_URL: JSON.stringify(process.env.LOGOUT_RETURN_URL),
    })
  ]
};
