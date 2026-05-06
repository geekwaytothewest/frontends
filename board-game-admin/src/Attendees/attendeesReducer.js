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
    case actionTypes.toggleSyncTabletopEventsDialog:
      return { ...state, tteBadgeNumber: action.tteBadgeNumber, tteBadgeId: action.tteBadgeId, updateSyncTabletopEventsDialogOpen: !state.updateSyncTabletopEventsDialogOpen };
    case actionTypes.syncTabletopEventsRequest:
      return { ...state, savingAttendee: true };
    case actionTypes.syncTabletopEventsAttendeeSuccess:
      return { ...state, savingAttendee: false, updateSyncTabletopEventsDialogOpen: false };
    case actionTypes.syncTabletopEventsAttendeeFailure:
      return { ...state, savingAttendee: false, errors: payload.Errors };
    case actionTypes.toggleBadgeReplacementDialog:
      return { ...state, selectedAttendee: action.attendee, badgeReplacementDialogOpen: !state.badgeReplacementDialogOpen };
    case actionTypes.processBadgeReplacementRequest:
      return { ...state, savingAttendee: true };
    case actionTypes.processBadgeReplacementSuccess:
      return { ...state, savingAttendee: false, badgeReplacementDialogOpen: false };
    case actionTypes.processBadgeReplacementFailure:
      return { ...state, savingAttendee: false, errors: payload.Errors };
    case actionTypes.toggleBadgeTransferDialog:
      return { ...state, selectedAttendee: action.attendee, badgeTransferDialogOpen: !state.badgeTransferDialogOpen };
    case actionTypes.processBadgeTransferRequest:
      return { ...state, savingAttendee: true };
    case actionTypes.processBadgeTransferSuccess:
      return { ...state, savingAttendee: false, badgeTransferDialogOpen: false };
    case actionTypes.processBadgeTransferFailure:
      return { ...state, savingAttendee: false, errors: payload.Errors };
    case actionTypes.toggleBadgeHelpDialog:
      return { ...state,  badgeHelpDialogOpen: !state.badgeHelpDialogOpen };
    default:
      return state;
  }
};

export default reducer;
