import { call, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import toastTypes from './toastTypes';
import { actionTypes } from './toastActions';

toastr.options = {
  closeButton: true,
  preventDuplicates: true,
  positionClass: 'toast-top-center',
  timeOut: 0,
  extendedTimeOut: 0
};

const makeToast = (toastType, text, title) => toastr[toastType](text, title);

function* onToastRequest({ title, text, toastType = toastTypes.success }) {
  yield call(makeToast, toastType, text, title);
}

export default function* toastSaga() {
  yield takeEvery(actionTypes.makeToast, onToastRequest);
}
