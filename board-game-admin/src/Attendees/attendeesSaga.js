import { takeEvery, put } from 'redux-saga/effects';
import { actionTypes, createGetAttendeesAction } from './attendeesActions';

function* onAttendeeChangeSuccess() {
  yield put(createGetAttendeesAction());
}

export default function* attendeesSaga() {
  yield takeEvery(actionTypes.addAttendeeSuccess, onAttendeeChangeSuccess);
  yield takeEvery(actionTypes.updateAttendeeSuccess, onAttendeeChangeSuccess);
  yield takeEvery(actionTypes.uploadAttendeesSuccess, onAttendeeChangeSuccess);
  yield takeEvery(actionTypes.syncTabletopEventsAttendeeSuccess, onAttendeeChangeSuccess);
}
