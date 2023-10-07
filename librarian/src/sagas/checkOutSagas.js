import { put, takeEvery } from 'redux-saga/effects';
import types from '../actions/actionTypes';

function* handleCheckOutSuccess(action) {
  const text = `${action.payload.Result.Copy.Game.Name} was checked out`;
  yield put({ type: types.makeToast, text, title: 'Success' });
}

export default function* checkoutSaga() {
  yield takeEvery(types.checkInOut.checkOutReceive, handleCheckOutSuccess);
}
