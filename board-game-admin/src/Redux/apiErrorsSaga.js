import { put, takeEvery, all } from 'redux-saga/effects';
import { actionTypes as attendeeActionTypes } from '../Attendees/attendeesActions';
import { actionTypes as collectionActionTypes } from '../Collections/collectionsActions';
import { actionTypes as toastActionTypes } from '../Toasts/toastActions';
import toastTypes from '../Toasts/toastTypes';

const actionTypes = { ...attendeeActionTypes, ...collectionActionTypes, ...toastActionTypes };

function* onApiRequestFailure(action) {
  const errors = action.payload && action.payload.response && action.payload.response.Errors;
  if (!errors) {
    const text =
      'The server could not be reached or did not return any errors. Try again. If it still does not work, get help.';
    yield put({ type: actionTypes.makeToast, text, title: 'Something went wrong', toastType: toastTypes.error });
  }
  if (errors && errors.length) {
    yield all(
      errors.map(err =>
        put({ type: actionTypes.makeToast, text: err, title: 'Something went wrong', toastType: toastTypes.error })
      )
    );
  }
}

function* onUploadSuccess(action) {
  let errors = action.payload && action.payload.Result.Errors;
  if (errors && errors.length) {
    errors = errors.reverse();
    yield onApiRequestFailure({ payload: { response: { Errors: errors } } });
  }
}

export default function* apiErrorsSaga() {
  yield takeEvery(actionTypes.addAttendeeFailure, onApiRequestFailure);
  yield takeEvery(actionTypes.getAttendeesFailure, onApiRequestFailure);
  yield takeEvery(actionTypes.updateAttendeeFailure, onApiRequestFailure);
  yield takeEvery(actionTypes.uploadAttendeesSuccess, onUploadSuccess);
  yield takeEvery(actionTypes.getCollectionsFailure, onApiRequestFailure);
  yield takeEvery(actionTypes.addCopyFailure, onApiRequestFailure);
  yield takeEvery(actionTypes.uploadCopiesSuccess, onUploadSuccess);
}
