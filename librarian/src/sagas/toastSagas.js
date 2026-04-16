import { takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import toastTypes from '../toastTypes';
import types from '../actions/actionTypes';
import SoundFX from 'sound-fx';
import failedInputSound from '../content/holdon.wav';
import scan11Sound from '../content/scan11.wav';
import scan12Sound from '../content/scan12.wav';
import scan13Sound from '../content/scan13.wav';
import scan21Sound from '../content/scan21.wav';
import scan22Sound from '../content/scan22.wav';
import scan23Sound from '../content/scan23.wav';

const sfx = new SoundFX();
sfx.load(failedInputSound, failedInputSound);
sfx.load(scan11Sound, scan11Sound);
sfx.load(scan12Sound, scan12Sound);
sfx.load(scan13Sound, scan13Sound);
sfx.load(scan21Sound, scan21Sound);
sfx.load(scan22Sound, scan22Sound);
sfx.load(scan23Sound, scan23Sound);

toastr.options = {
  closeButton: true,
  preventDuplicates: true,
  positionClass: 'toast-top-center',
  timeOut: 5000,
  extendedTimeOut: 2000,
  progressBar: true
};

// eslint-disable-next-line require-yield
function* makeToast({ title, text, toastType = toastTypes.success, toastSound}) {
  toastr[toastType](text, title);

  playSound(toastSound);

  if ([toastTypes.error, toastTypes.warning].includes(toastType)) {
    sfx.play(failedInputSound);
  }
}

export function playSound(toastSound) {
  if (toastSound === 1 && localStorage.getItem('scanSound') === '1') {
    sfx.play(scan11Sound);
  }

  if (toastSound === 2 && localStorage.getItem('scanSound') === '1') {
    sfx.play(scan12Sound);
  }

  if (toastSound === 3 && localStorage.getItem('scanSound') === '1') {
    sfx.play(scan13Sound);
  }

  if (toastSound === 1 && localStorage.getItem('scanSound') === '2') {
    sfx.play(scan21Sound);
  }

  if (toastSound === 2 && localStorage.getItem('scanSound') === '2') {
    sfx.play(scan22Sound);
  }

  if (toastSound === 3 && localStorage.getItem('scanSound') === '2') {
    sfx.play(scan23Sound);
  }
}

export default function* toastSaga() {
  yield takeEvery(types.makeToast, makeToast);
}
