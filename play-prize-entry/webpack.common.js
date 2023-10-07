const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

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
    ]
  },
  plugins: [cleanWebpackPlugin, htmlWebpackPlugin, faviconPlugin],
};