import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { apiMiddleware } from 'redux-api-middleware';
import createSagaMiddleware from 'redux-saga';
import initialState from './initialState';
import apiAuthInjector from '../apiAuthInjector';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default function createReduxStore() {
  const sagaMiddleware = createSagaMiddleware();
  const allMiddleware = composeWithDevTools(applyMiddleware(apiAuthInjector, apiMiddleware, sagaMiddleware));
  const store = createStore(rootReducer, initialState, allMiddleware);
  sagaMiddleware.run(rootSaga);

  return store;
}
