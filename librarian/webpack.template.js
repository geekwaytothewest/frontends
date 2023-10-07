const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      API_URL: 'api_url',
      API_IDENTIFIER: 'api_id',
      AUTH_CALLBACK: 'callback_url',
      AUTH_CLIENT_ID: 'auth_client_id',
      AUTH_DOMAIN: 'foo.auth0.com',
      LOGOUT_RETURN_URL: 'logout_return_url',
      ALWAYS_OVERRIDE_LIMIT: false,
    })
  ]
});