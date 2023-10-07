module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    API_IDENTIFIER: 'readonly',
    API_URL: 'readonly',
    AUTH_DOMAIN: 'readonly',
    AUTH_CLIENT_ID: 'readonly',
    AUTH_CALLBACK: 'readonly',
    LOGOUT_RETURN_URL: 'readonly',
    require: 'readonly',
    module: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/jsx-uses-vars': 1,
    'react/jsx-uses-react': 1,
    'react/react-in-jsx-scope': 1,
    'react/jsx-no-undef': 1,
    'react/jsx-max-props-per-line': [0]
  }
};
