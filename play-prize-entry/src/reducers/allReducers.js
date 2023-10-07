import { combineReducers } from 'redux';
import step from './step';
import user from './user';
import checkouts from './checkouts';
import play from './play';
import playerSearch from './playerSearch';
import * as actionTypes from '../actions/actionTypes';
import getInitialState from '../initialState';

const appReducer = combineReducers({
  step,
  user,
  checkoutsList: checkouts,
  play,
  playerSearch
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.Restart) {
    state = getInitialState();
  }
  return appReducer(state, action);
};

export default rootReducer;
