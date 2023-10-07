import initialState from '../Redux/initialState';
import { actionTypes } from './attendeesActions';

const reducer = (state = initialState.attendees, action) => {
  const payload = action.payload;

  switch (action.type) {
  case actionTypes.getAttendeesRequest:
    return { ...state, loading: true };
  case actionTypes.getAttendeesSuccess:
    return {
      ...state,
      loading: false,
      items: payload.Result.Attendees
    };
  case actionTypes.getAttendeesFailure:
    return { ...state, loading: false, errors: payload.Errors };
  case actionTypes.setSelectedAttendee:
    return { ...state, selectedAttendee: action.attendee };
  case actionTypes.toggleAddAttendeeDialog:
    return { ...state, addAttendeeDialogOpen: !state.addAttendeeDialogOpen };
  case actionTypes.addAttendeeRequest:
    return { ...state, savingAttendee: true };
  case actionTypes.addAttendeeSuccess:
    return { ...state, savingAttendee: false, addAttendeeDialogOpen: false };
  case actionTypes.addAttendeeFailure:
    return { ...state, savingAttendee: false, errors: payload.Errors };
  case actionTypes.toggleUploadAttendeesDialog:
    return { ...state, uploadAttendeesDialogOpen: !state.uploadAttendeesDialogOpen };
  case actionTypes.uploadAttendeesRequest:
    return { ...state, savingAttendee: true };
  case actionTypes.uploadAttendeesSuccess:
    return { ...state, savingAttendee: false, uploadAttendeesDialogOpen: false };
  case actionTypes.uploadAttendeesFailure:
    return { ...state, savingAttendee: false, errors: payload.response.Errors };
  case actionTypes.toggleUpdateAttendeeDialog:
    return { ...state, selectedAttendee: action.attendee, updateAttendeeDialogOpen: !state.updateAttendeeDialogOpen };
  case actionTypes.updateAttendeeRequest:
    return { ...state, savingAttendee: true };
  case actionTypes.updateAttendeeSuccess:
    return { ...state, savingAttendee: false, updateAttendeeDialogOpen: false };
  case actionTypes.updateAttendeeFailure:
    return { ...state, savingAttendee: false, errors: payload.Errors };
  default:
    return state;
  }
};

export default reducer;
