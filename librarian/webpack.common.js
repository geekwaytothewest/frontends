const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load .env into process.env up front. API_HOST is read at module-eval time
// (below), which runs before the DefinePlugin's dotenv.config() call further
// down — so without this, API_HOST would always fall back to '' and the app
// would issue relative API URLs against the dev server instead of the backend.
dotenv.config();

// API_URL is no longer baked as a fixed value. Only the API origin is baked
// (API_HOST); the org/{id}/con/{id} path segment is read from the page URL at
// runtime, so a single deployment serves every convention. `deriveApiUrl` is
// inlined wherever the source references `API_URL` (via DefinePlugin below).
const API_HOST = process.env.API_HOST || '';
function deriveApiUrl() {
  var m = (window.location.pathname || '').match(/\/org\/(\d+)\/con\/(\d+)(?:\/|$)/);
  var org = m ? m[1] : '1';
  var con = m ? m[2] : '1';
  return "__API_HOST__" + "/api/legacy/org/" + org + "/con/" + con;
}
const apiUrlExpr = '(' + deriveApiUrl.toString().replace('"__API_HOST__"', JSON.stringify(API_HOST)) + ')()';

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
  title: 'Check In/Out'
});

const faviconPlugin = new FaviconsWebpackPlugin('./src/assets/favicon.png');
module.exports = {
  mode: process.env.WEBPACK_MODE,
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/librarian/'
  },
  devServer: {
    port: 8082,
    hot: true,
    open: ['/librarian/'],
    historyApiFallback: {
      index: '/librarian/'
    },
    client: {
      overlay: true
    },
    watchFiles: ['src/**/*'],
    devMiddleware: {
      publicPath: '/librarian/'
    },
    static: false
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
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(mp3|wav)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'sounds/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    faviconPlugin,
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }),
    new webpack.EnvironmentPlugin(['AUTH_DOMAIN', 'AUTH_CLIENT_ID', 'AUTH_CALLBACK', 'API_IDENTIFIER', 'LOGOUT_RETURN_URL', 'ALWAYS_OVERRIDE_LIMIT']),
    new webpack.DefinePlugin({
      API_URL: apiUrlExpr,
      AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
      AUTH_CLIENT_ID: JSON.stringify(process.env.AUTH_CLIENT_ID),
      AUTH_CALLBACK: JSON.stringify(process.env.AUTH_CALLBACK),
      API_IDENTIFIER: JSON.stringify(process.env.API_IDENTIFIER),
      LOGOUT_RETURN_URL: JSON.stringify(process.env.LOGOUT_RETURN_URL),
      ALWAYS_OVERRIDE_LIMIT: process.env.ALWAYS_OVERRIDE_LIMIT,
    })
  ]
};
