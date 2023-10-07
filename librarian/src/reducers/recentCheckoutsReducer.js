import initialState from '../redux/initialState';
import actionTypes from '../actions/actionTypes';

const reducer = (state = initialState.recentCheckouts, action) => {
  switch(action.type) {
  case actionTypes.recentCheckouts.getRecentCheckoutsReceive:
    return { ...state, results: action.payload.Result, fetchingInitialResults: false };
  default:
    return state;
  }
};

export default reducer;