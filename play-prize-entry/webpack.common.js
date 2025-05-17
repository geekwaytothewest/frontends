const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

const cleanWebpackPlugin = new CleanWebpackPlugin();
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  title: 'Play and Win',
  template: 'template.ejs'
});
const faviconPlugin = new FaviconsWebpackPlugin('./src/assets/favicon.png');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/playandwin/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource'
      },
      {
        test: /\.manifest$/,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    cleanWebpackPlugin,
    htmlWebpackPlugin,
    faviconPlugin,
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }),
    new webpack.EnvironmentPlugin(['API_URL', 'AUTH_DOMAIN', 'AUTH_CLIENT_ID', 'AUTH_CALLBACK', 'API_IDENTIFIER']),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL),
      AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
      AUTH_CLIENT_ID: JSON.stringify(process.env.AUTH_CLIENT_ID),
      AUTH_CALLBACK: JSON.stringify(process.env.AUTH_CALLBACK),
      API_IDENTIFIER: JSON.stringify(process.env.API_IDENTIFIER),
    })
  ],
};