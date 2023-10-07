// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { apiMiddleware } from 'redux-api-middleware';
import createSagaMiddleware from 'redux-saga';
import initialState from './initialState';
import apiAuthInjector from './apiAuthInjector';
import sagas from '../sagas/sagas';
import rootReducer from '../reducers/rootReducer';

export default function configureStore() {
  if (!window.store) {
    const sagaMiddleware = createSagaMiddleware();
    const allMiddleware = composeWithDevTools(applyMiddleware(apiAuthInjector, apiMiddleware, sagaMiddleware));
    window.store = createStore(rootReducer, initialState, allMiddleware);
    sagaMiddleware.run(sagas);

    return window.store;
  }

  if (NODE_ENV === 'development') {
    window.store.replaceReducer(rootReducer);
  }

  return window.store;
}
