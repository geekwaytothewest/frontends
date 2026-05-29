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
import getInitialState from './initialState';
import './main.scss';
import allReducers from './reducers/allReducers';

const EnsureAuthWrapper = props => (
  <EnsureAuthenticated {...props}>
    <App />
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

// The convention is encoded in the URL (/org/{id}/con/{id}/playandwin/...) so a
// single deployment serves every convention. Build the router basename from it,
// falling back to plain /playandwin for local dev or the bare prefix.
const conMatch = (window.location.pathname || '').match(/\/org\/(\d+)\/con\/(\d+)(?:\/|$)/);
const basename = (conMatch ? `/org/${conMatch[1]}/con/${conMatch[2]}` : '') + '/playandwin';

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
// prefix (/org/{id}/con/{id}/playandwin/...) injected at the edge, which is what
// the router basename and deriveApiUrl key off of. The dev server serves a bare
// /playandwin/, so without a prefix both fall back to org=1/con=1 and the URL
// never reflects the convention. Redirect bare /playandwin entries to the default
// convention so local dev mirrors the prefixed routing. The Auth0 callback
// (?code=...) is excluded so handleAuthentication can finish the token exchange
// and navigate to the stashed returnTo itself. Scoped to localhost so deployed
// bare-/playandwin hits are left alone (defaulting them to a convention is wrong).
const DEFAULT_ORG = 1;
const DEFAULT_CON = 1;
const { pathname, search, hash, hostname } = window.location;
const isLocalhost = ['localhost', '127.0.0.1'].includes(hostname);
const isAuthCallback = new URLSearchParams(search).has('code');

if (isLocalhost && !conMatch && !isAuthCallback && pathname.startsWith('/playandwin')) {
  const rest = pathname.slice('/playandwin'.length); // '', '/', '/something', ...
  window.location.replace(`/org/${DEFAULT_ORG}/con/${DEFAULT_CON}/playandwin${rest}${search}${hash}`);
} else {
  render();
}
