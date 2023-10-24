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
  updateAttendeeFailure: 'UPDATE_ATTENDEE_FAILURE'
};

export const createGetAttendeesAction = () => ({
  [RSAA]: {
    endpoint: () => `${apiRoot}/attendees`,
    method: 'GET',
    types: [actionTypes.getAttendeesRequest, actionTypes.getAttendeesSuccess, actionTypes.getAttendeesFailure]
  }
});

export const toggleAddAttendeeDialog = () => ({ type: actionTypes.toggleAddAttendeeDialog });
export const toggleUpdateAttendeeDialog = attendee => ({
  type: actionTypes.toggleUpdateAttendeeDialog,
  attendee
});
export const toggleUploadAttendeesDialog = () => ({ type: actionTypes.toggleUploadAttendeesDialog });

export const createAddAttendeeAction = (name, badgeNumber) => {
  return {
    [RSAA]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: () => `${apiRoot}/attendees`,
      body: JSON.stringify({ name, badgeNumber }),
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

export const createUpdateAttendeeAction = (name, oldBadgeNumber, newBadgeNumber) => {
  return {
    [RSAA]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: () => `${apiRoot}/attendees/${oldBadgeNumber}`,
      body: JSON.stringify({ name, badgeNumber: newBadgeNumber }),
      method: 'PUT',
      types: [actionTypes.updateAttendeeRequest, actionTypes.updateAttendeeSuccess, actionTypes.updateAttendeeFailure]
    }
  };
};
