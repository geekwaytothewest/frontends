import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './index.scss';
import '../node_modules/toastr/build/toastr.min.css';
import '@babel/polyfill';

ReactDOM.render(<App />, document.getElementById('index'));
