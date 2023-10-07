import initialState from '../redux/initialState';
import actionTypes from '../actions/actionTypes';

const reducer = (state = initialState.longestCheckouts, action) => {
  switch(action.type) {
  case actionTypes.longestCheckouts.getLongestCheckoutsReceive:
    return { ...state, results: action.payload.Result, fetchingInitialResults: false };
  default:
    return state;
  }
};

export default reducer;