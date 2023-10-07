const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify('https://myapi.com'),
      AUTH_DOMAIN: JSON.stringify('myauth.auth0.com'),
      AUTH_CLIENT_ID: JSON.stringify('my_auth_client_id'),
      AUTH_CALLBACK: JSON.stringify('root_url_of_this_app'),
      API_IDENTIFIER: JSON.stringify('my_auth_api_identifier')
    })
  ]
});
