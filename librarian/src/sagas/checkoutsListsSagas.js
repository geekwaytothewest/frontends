import { put, takeLatest, delay } from 'redux-saga/effects';
import { getLongestCheckouts } from '../actions/longestCheckoutsActions';
import { getRecentCheckouts } from '../actions/recentCheckoutsActions';
import types from '../actions/actionTypes';

function* pollLongestCheckouts() {
  while (true) {
    yield delay(3000);
    yield put(getLongestCheckouts());
    yield delay(27000);
  }
}

function* pollRecentCheckouts() {
  while (true) {
    yield delay(3000);
    yield put(getRecentCheckouts());
  }
}

export default function* checkoutsListsSaga() {
  yield takeLatest(types.initialize, pollLongestCheckouts);
  yield takeLatest(types.initialize, pollRecentCheckouts);
}
