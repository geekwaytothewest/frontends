const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: true
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify('https://myapi.com'),
      AUTH_DOMAIN: JSON.stringify('myauth.auth0.com'),
      AUTH_CLIENT_ID: JSON.stringify('my_auth_client_id'),
      AUTH_CALLBACK: JSON.stringify('root_url_of_this_app/callback'),
      API_IDENTIFIER: JSON.stringify('my_auth_api_identifier'),
      LOGOUT_RETURN_URL: JSON.stringify('root_url_of_this_app'),
    })
  ]
});
