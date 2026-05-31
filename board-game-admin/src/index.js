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

// Local-dev convenience: deployed environments serve the app under a convention
// prefix (/legacy/admin/org/{id}/con/{id}/...) injected at the edge, which is what
// App.js's basename and deriveApiUrl key off of. The dev server serves a bare
// /legacy/admin/, so without a prefix both fall back to org=1/con=1 and the URL
// never reflects the convention. Redirect bare /legacy/admin entries to the
// default convention so local dev mirrors the prefixed routing. The Auth0 callback
// is excluded — rewriting /legacy/admin/callback would drop the code/state and
// break the token exchange. Scoped to localhost so deployed bare hits are left
// alone (defaulting them to a convention would be wrong).
const DEFAULT_ORG = 1;
const DEFAULT_CON = 1;
const { pathname, search, hash, hostname } = window.location;
const isLocalhost = ['localhost', '127.0.0.1'].includes(hostname);
const hasConventionPrefix = /\/org\/(\d+)\/con\/(\d+)(?:\/|$)/.test(pathname);
const isCallback = pathname.startsWith('/legacy/admin/callback');

if (isLocalhost && !hasConventionPrefix && !isCallback && pathname.startsWith('/legacy/admin')) {
  const rest = pathname.slice('/legacy/admin'.length); // '', '/', '/collections', ...
  window.location.replace(`/legacy/admin/org/${DEFAULT_ORG}/con/${DEFAULT_CON}${rest}${search}${hash}`);
} else {
  ReactDOM.render(<App />, document.getElementById('index'));
}
