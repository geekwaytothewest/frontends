import { put, takeEvery, all } from 'redux-saga/effects';
import types from '../actions/actionTypes';
import toastTypes from '../toastTypes';

function* toastErrorsCollection(action) {
  const errors = action.payload && action.payload.response && action.payload.response.Errors;
  if (errors.length) {
    yield all(
      errors.map(err =>
        put({ type: types.makeToast, text: err, title: 'Something went wrong', toastType: toastTypes.error })
      )
    );
  }
}

export default function* errorSaga() {
  yield takeEvery(types.checkInOut.getCopyStatusFailure, toastErrorsCollection);
  yield takeEvery(types.checkInOut.checkInFailure, toastErrorsCollection);
  yield takeEvery(types.checkInOut.checkOutFailure, toastErrorsCollection);
}
