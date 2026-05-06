import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './index.scss';
import '../node_modules/toastr/build/toastr.min.css';
import '@babel/polyfill';
import { Icons, getIconPaths } from '@blueprintjs/icons';

// Blueprint 5.x lazy-loads icon SVG paths via webpack dynamic chunks, which
// fails with the /admin/ publicPath dev server setup. Using getIconPaths as a
// custom loader statically bundles all paths and avoids the chunk loading issue.
Icons.setLoaderOptions({ loader: (name, size) => Promise.resolve(getIconPaths(name, size)) });

ReactDOM.render(<App />, document.getElementById('index'));
