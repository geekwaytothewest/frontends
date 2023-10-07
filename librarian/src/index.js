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

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
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
