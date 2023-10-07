import { combineReducers } from 'redux';
import copySearch from './copySearchReducer';
import checkInOut from './checkInOutReducer';
import longestCheckouts from './longestCheckoutsReducer';
import recentCheckouts from './recentCheckoutsReducer';

export default combineReducers({
  checkInOut,
  copySearch,
  longestCheckouts,
  recentCheckouts
});