import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import App from './components/app';
import configureStore from './redux/configureStore';
import types from './actions/actionTypes';
import EnsureAuthenticated from './components/auth/ensureAuthenticated';
import history from './history';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../node_modules/toastr/build/toastr.min.css';
import './style.css';

const store = configureStore();

// The convention is encoded in the URL (/org/{id}/con/{id}/librarian/...) so a
// single deployment serves every convention. Build the router basename from it,
// falling back to plain /librarian for local dev or the bare prefix.
const conMatch = (window.location.pathname || '').match(/\/org\/(\d+)\/con\/(\d+)(?:\/|$)/);
const basename = (conMatch ? `/org/${conMatch[1]}/con/${conMatch[2]}` : '') + '/librarian';

// Local-dev convenience: deployed environments serve the app under a convention
// prefix (/org/{id}/con/{id}/librarian/...) injected at the edge, which is what
// the router basename and deriveApiUrl key off of. The dev server serves a bare
// /librarian/, so without a prefix both fall back to org=1/con=1 and the URL
// never reflects the convention. Redirect bare /librarian entries to the default
// convention so local dev mirrors the prefixed routing. The Auth0 callback
// (?code=...) is excluded so handleAuthentication can finish the token exchange
// and navigate to the stashed returnTo itself. Scoped to localhost so deployed
// bare-/librarian hits are left alone (defaulting them to a convention is wrong).
const DEFAULT_ORG = 1;
const DEFAULT_CON = 1;
const { pathname, search, hash, hostname } = window.location;
const isLocalhost = ['localhost', '127.0.0.1'].includes(hostname);
const isAuthCallback = new URLSearchParams(search).has('code');

if (isLocalhost && !conMatch && !isAuthCallback && pathname.startsWith('/librarian')) {
  const rest = pathname.slice('/librarian'.length); // '', '/', '/something', ...
  window.location.replace(`/org/${DEFAULT_ORG}/con/${DEFAULT_CON}/librarian${rest}${search}${hash}`);
} else {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} basename={basename}>
        <React.Fragment>
          <Route
            path='/'
            render={props => (
              <EnsureAuthenticated {...props}>
                <App />
              </EnsureAuthenticated>
            )}
          />
        </React.Fragment>
      </Router>
    </Provider>,
    document.getElementById('root')
  );

  store.dispatch({ type: types.initialize });
}
