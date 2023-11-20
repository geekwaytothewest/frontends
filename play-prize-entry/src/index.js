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

const render = () => {
  root.render(
    <Provider store={store}>
      <BrowserRouter basename='/playandwin'>
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

render();
