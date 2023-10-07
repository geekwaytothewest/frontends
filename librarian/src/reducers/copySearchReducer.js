import initialState from '../redux/initialState';
import actionTypes from '../actions/actionTypes';

const reducer = (state = initialState.copySearch, action) => {
  switch(action.type) {
  case actionTypes.copySearch.updateCopySearchText:
    return { ...state, searchText: action.text };
  case actionTypes.copySearch.searchRequest:
    return { ...state, results: [], loading: true, searchCompleted: false };
  case actionTypes.copySearch.searchReceive:
    return { ...state, results: action.payload.Result, loading: false, searchText: '', searchCompleted: true };
  case actionTypes.copySearch.searchFailure:
    return { ...state, results: [], loading: false, searchCompleted: true, errors: [] };
  default:
    return state;
  }
};

export default reducer;