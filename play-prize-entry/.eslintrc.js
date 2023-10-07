module.exports = {
  'env': {
    'node': true,
    'browser': true,
    'es6': true
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    'global': 'readonly',
    'require': 'readonly',
    'process': 'readonly',
    'module': 'readonly',
    'API_URL': 'readonly',
    'AUTH_DOMAIN': 'readonly',
    'AUTH_CLIENT_ID': 'readonly',
    'API_IDENTIFIER': 'readonly',
    'AUTH_CALLBACK': 'readonly'
  },
  parser: '@babel/eslint-parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': ['react'],
  'rules': {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'react/prop-types': 'off',
    'no-unused-vars': ['error', { 'ignoreRestSiblings': true, 'varsIgnorePattern': '^_' }]
  }
};