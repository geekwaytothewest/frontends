import { takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import toastTypes from '../toastTypes';
import types from '../actions/actionTypes';
import SoundFX from 'sound-fx';
import failedInputSound from '../content/taters.wav';

const sfx = new SoundFX();
sfx.load(failedInputSound, failedInputSound);

toastr.options = {
  closeButton: true,
  preventDuplicates: true,
  positionClass: 'toast-top-center',
  timeOut: 5000,
  extendedTimeOut: 2000,
  progressBar: true
};

// eslint-disable-next-line require-yield
function* makeToast({ title, text, toastType = toastTypes.success }) {
  toastr[toastType](text, title);

  if ([toastTypes.error, toastTypes.warning].includes(toastType)) {
    sfx.play(failedInputSound);
  }
}

export default function* toastSaga() {
  yield takeEvery(types.makeToast, makeToast);
}
