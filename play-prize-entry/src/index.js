import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { composeWithDevTools } from '@redux-devtools/extension';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import apiAuthInjector from './apiAuthInjector';
import App from './app/app';
import EnsureAuthenticated from './auth/ensureAuthenticated';
import ResolveConvention from './app/resolveConvention';
import getInitialState from './initialState';
import './main.scss';
import allReducers from './reducers/allReducers';

// The PWA installs once with a convention-agnostic start_url (see the favicons
// plugin in webpack.common.js); ResolveConvention runs after auth and, when the
// URL has no /org/{id}/con/{id} prefix, redirects to the user's current
// convention or shows a picker. The convention is encoded in the URL, so
// resolution happens via a full-page navigate (below) and the app then re-evals
// with the right basename / API base.
const EnsureAuthWrapper = props => (
  <EnsureAuthenticated {...props}>
    <ResolveConvention>
      <App />
    </ResolveConvention>
  </EnsureAuthenticated>
);

const reduxStateWindow = document.createElement('div');
const rootElementId = 'root';
reduxStateWindow.id = rootElementId;
document.body.appendChild(reduxStateWindow);
const domNode = document.getElementById('root');
const root = createRoot(domNode);
let store = createStore(
  allReducers,
  getInitialState(),
  composeWithDevTools(applyMiddleware(apiAuthInjector, apiMiddleware))
);

// The convention is encoded in the URL (/legacy/playandwin/org/{id}/con/{id}/...)
// so a single deployment serves every convention. Build the router basename from
// it, falling back to plain /legacy/playandwin for local dev or the bare prefix.
const conMatch = (window.location.pathname || '').match(/\/org\/(\d+)\/con\/(\d+)(?:\/|$)/);
const basename = '/legacy/playandwin' + (conMatch ? `/org/${conMatch[1]}/con/${conMatch[2]}` : '');

const render = () => {
  root.render(
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route
            path='/'
            element={<EnsureAuthWrapper />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

// Local-dev convenience: deployed environments serve the app under a convention
// prefix (/legacy/playandwin/org/{id}/con/{id}/...) injected at the edge, which is
// what the router basename and deriveApiUrl key off of. The dev server serves a
// bare /legacy/playandwin/, so without a prefix both fall back to org=1/con=1 and
// the URL never reflects the convention. Redirect bare /legacy/playandwin entries
// to the default convention so local dev mirrors the prefixed routing. The Auth0
// callback (?code=...) is excluded so handleAuthentication can finish the token
// exchange and navigate to the stashed returnTo itself. Scoped to localhost so
// deployed bare hits are left alone — there, ResolveConvention picks the
// convention from the user's permissions instead.
const DEFAULT_ORG = 1;
const DEFAULT_CON = 1;
const { pathname, search, hash, hostname } = window.location;
const isLocalhost = ['localhost', '127.0.0.1'].includes(hostname);
const isAuthCallback = new URLSearchParams(search).has('code');

if (isLocalhost && !conMatch && !isAuthCallback && pathname.startsWith('/legacy/playandwin')) {
  const rest = pathname.slice('/legacy/playandwin'.length); // '', '/', '/something', ...
  window.location.replace(`/legacy/playandwin/org/${DEFAULT_ORG}/con/${DEFAULT_CON}${rest}${search}${hash}`);
} else {
  render();
}
