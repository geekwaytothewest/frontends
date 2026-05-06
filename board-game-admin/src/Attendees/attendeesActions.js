import { RSAA } from 'redux-api-middleware';
import env from '../App/environmentVariables';

const apiRoot = env.apiUrl;

export const actionTypes = {
  getAttendeesRequest: 'GET_ATTENDEES_REQUEST',
  getAttendeesSuccess: 'GET_ATTENDEES_SUCCESSS',
  getAttendeesFailure: 'GET_ATTENDEES_FAILURE',
  toggleAddAttendeeDialog: 'TOGGLE_ADD_ATTENDEE_DIALOG',
  addAttendeeRequest: 'ADD_ATTENDEE_REQUEST',
  addAttendeeSuccess: 'ADD_ATTENDEE_SUCCESS',
  addAttendeeFailure: 'ADD_ATTENDEE_FAILURE',
  toggleUploadAttendeesDialog: 'TOGGLE_UPLOAD_ATTENDEES_DIALOG',
  uploadAttendeesRequest: 'UPLOAD_ATTENDEES_REQUEST',
  uploadAttendeesSuccess: 'UPLOAD_ATTENDEES_SUCCESS',
  uploadAttendeesFailure: 'UPLOAD_ATTENDEES_FAILURE',
  toggleUpdateAttendeeDialog: 'TOGGLE_UPDATE_ATTENDEE_DIALOG',
  updateAttendeeRequest: 'UPDATE_ATTENDEE_REQUEST',
  updateAttendeeSuccess: 'UPDATE_ATTENDEE_SUCCESS',
  updateAttendeeFailure: 'UPDATE_ATTENDEE_FAILURE',
  toggleSyncTabletopEventsDialog: 'TOGGLE_SYNCTTE_DIALOG',
  syncTabletopEventsRequest: 'SYNC_TTE_REQUEST',
  syncTabletopEventsAttendeeSuccess: 'SYNC_TTE_SUCCESS',
  syncTabletopEventsAttendeeFailure: 'SYNC_TTE_FAILURE',
  toggleBadgeReplacementDialog: 'TOGGLE_BADGE_REPLACEMENT_DIALOG',
  processBadgeReplacementRequest: 'PROCESS_BADGE_REPLACEMENT_REQUEST',
  processBadgeReplacementSuccess: 'PROCESS_BADGE_REPLACEMENT_SUCCESS',
  processBadgeReplacementFailure: 'PROCESS_BADGE_REPLACEMENT_FAILURE',
  toggleBadgeTransferDialog: 'TOGGLE_BADGE_TRANSFER_DIALOG',
  processBadgeTransferRequest: 'PROCESS_BADGE_TRANSFER_REQUEST',
  processBadgeTransferSuccess: 'PROCESS_BADGE_TRANSFER_SUCCESS',
  processBadgeTransferFailure: 'PROCESS_BADGE_TRANSFER_FAILURE',
  toggleBadgeHelpDialog: 'TOGGLE_BADGE_HELP_DIALOG'
};

export const createGetAttendeesAction = () => ({
  [RSAA]: {
    endpoint: () => `${apiRoot}/attendees`,
    method: 'GET',
    types: [actionTypes.getAttendeesRequest, actionTypes.getAttendeesSuccess, actionTypes.getAttendeesFailure]
  }
});

export const toggleAddAttendeeDialog = () => ({ type: actionTypes.toggleAddAttendeeDialog });
export const toggleSyncTabletopEventsDialog = (tteBadgeNumber, tteBadgeId) => ({ type: actionTypes.toggleSyncTabletopEventsDialog, tteBadgeNumber: tteBadgeNumber, tteBadgeId: tteBadgeId });
export const toggleUpdateAttendeeDialog = attendee => ({
  type: actionTypes.toggleUpdateAttendeeDialog,
  attendee
});
export const toggleUploadAttendeesDialog = () => ({ type: actionTypes.toggleUploadAttendeesDialog });
export const toggleBadgeReplacementDialog = attendee => ({ type: actionTypes.toggleBadgeReplacementDialog, attendee });
export const toggleBadgeTransferDialog = attendee => ({ type: actionTypes.toggleBadgeTransferDialog, attendee });
export const toggleBadgeHelpDialog = () => ({ type: actionTypes.toggleBadgeHelpDialog });

export const createAddAttendeeAction = (name, badgeNumber, pronouns) => {
  return {
    [RSAA]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: () => `${apiRoot}/attendees`,
      body: JSON.stringify({ name: name, badgeNumber: badgeNumber, pronouns: pronouns }),
      method: 'POST',
      types: [actionTypes.addAttendeeRequest, actionTypes.addAttendeeSuccess, actionTypes.addAttendeeFailure]
    }
  };
};

export const createUploadAttendeesAction = files => {
  const formData = new FormData();
  formData.append('file', files[0], files[0].name);

  return {
    [RSAA]: {
      endpoint: () => `${apiRoot}/attendees/upload`,
      body: formData,
      method: 'POST',
      types: [
        actionTypes.uploadAttendeesRequest,
        actionTypes.uploadAttendeesSuccess,
        actionTypes.uploadAttendeesFailure
      ]
    }
  };
};

export const createUpdateAttendeeAction = (name, oldBadgeNumber, newBadgeNumber, pronouns) => {
  return {
    [RSAA]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: () => `${apiRoot}/attendees/${oldBadgeNumber}`,
      body: JSON.stringify({ name: name, badgeNumber: newBadgeNumber, pronouns: pronouns }),
      method: 'PUT',
      types: [actionTypes.updateAttendeeRequest, actionTypes.updateAttendeeSuccess, actionTypes.updateAttendeeFailure]
    }
  };
};

export const createSyncTabletopEventsAction = (userName, password, apiKey, tteBadgeNumber, tteBadgeId) => {
  return {
    [RSAA]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: () => `${apiRoot}/attendees/sync/tabletopEvents`,
      body: JSON.stringify({ userName: userName, password: password, apiKey: apiKey, tteBadgeNumber: tteBadgeNumber, tteBadgeId: tteBadgeId }),
      method: 'PUT',
      types: [actionTypes.syncTabletopEventsRequest, actionTypes.syncTabletopEventsAttendeeSuccess, actionTypes.syncTabletopEventsAttendeeFailure]
    }
  };
};

export const createReplacementBadgeAction = (oldBadgeNumber, newBadgeNumber) => {
  return {
    [RSAA]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: () => `${apiRoot}/attendees/badgeReplacement`,
      body: JSON.stringify({ fromBadgeNumber: oldBadgeNumber, toBadgeNumber: newBadgeNumber }),
      method: 'PUT',
      types: [actionTypes.processBadgeReplacementRequest, actionTypes.processBadgeReplacementSuccess, actionTypes.processBadgeReplacementFailure]
    }
  };
}

export const createBadgeTransferAction = (newBadgeFirstName, newBadgeLastName, newBadgePronouns, oldBadgeNumber) => {
  return {
    [RSAA]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: () => `${apiRoot}/attendees/badgeTransfer`,
      body: JSON.stringify({ fromBadgeNumber: oldBadgeNumber, newBadgeFirstName: newBadgeFirstName, newBadgeLastName: newBadgeLastName, newBadgePronouns: newBadgePronouns }),
      method: 'PUT',
      types: [actionTypes.processBadgeTransferRequest, actionTypes.processBadgeTransferSuccess, actionTypes.processBadgeTransferFailure]
    }
  };
}