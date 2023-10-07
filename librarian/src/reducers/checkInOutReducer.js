import initialState from '../redux/initialState';
import actionTypes from '../actions/actionTypes';

const reducer = (state = initialState.checkInOut, action) => {
  const payload = action.payload;

  switch (action.type) {
  case actionTypes.checkInOut.updateCopyId:
    return { ...state, copyId: action.copyId };

  case actionTypes.checkInOut.updateAttendeeId:
    return { ...state, attendeeId: action.attendeeId };

  case actionTypes.checkInOut.toggleOverrideLimit:
    return { ...state, overrideLimit: !state.overrideLimit };

  case actionTypes.checkInOut.reset:
    return { ...initialState.checkInOut };

  case actionTypes.checkInOut.getCopyStatusRequest:
    return { ...state, checkingStatus: true };

  case actionTypes.checkInOut.getCopyStatusReceive: {
    const isCheckedOut = payload.Result.IsCheckedOut;
    const gameTitle = payload.Result.Game.Name;
    return { ...state, gameTitle, isCheckedOut, checkingStatus: false, checkingIn: isCheckedOut };
  }

  case actionTypes.checkInOut.getCopyStatusFailure:
    return { ...state, copyId: '', checkingStatus: false };

  case actionTypes.checkInOut.checkOutRequest:
    return { ...state, checkingOut: true };

  case actionTypes.checkInOut.checkOutReceive:
    return { ...initialState.checkInOut };

  case actionTypes.checkInOut.checkOutFailure:
    return { ...state, errors: payload.Errors, checkingOut: false, attendeeId: '' };

  case actionTypes.checkInOut.checkInRequest:
    return { ...state, checkingIn: true };

  case actionTypes.checkInOut.checkInReceive:
    return { ...initialState.checkInOut };

  case actionTypes.checkInOut.checkInFailure:
    return { ...state, errors: payload.Errors, checkingIn: false, gameTitle: '' };

  default:
    return state;
  }
};

export default reducer;
