import * as types from '../actions/actionTypes';

const step = (state = 1, action) => {
  switch (action.type) {
  case types.IncrementStep:
  case types.PostPlayReceive:
    return state+1;
  case types.DecrementStep:
    return state-1;
  case types.GetCheckoutsReceive:
    if (!action.payload.Result || !action.payload.Result.length) {
      return state;
    }

    return 2;
  case types.Restart:
    return 1;
  default:
    return state;
  }
};

export default step;
