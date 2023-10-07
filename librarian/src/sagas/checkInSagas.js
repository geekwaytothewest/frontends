import { put, takeEvery } from 'redux-saga/effects';
import types from '../actions/actionTypes';
import { checkIn } from '../actions/checkInOutActions';

function* tryCheckIn(action) {
  if (action.payload.Result.IsCheckedOut) {
    yield put(checkIn(action.payload.Result.ID));
  }
}

function* handleCheckInSuccess(action) {
  const responseCopy = action.payload.Result.Copy;
  const collection = responseCopy.Collection;
  const message = `
    ${responseCopy.Game.Name} was checked in <br /><br />
    <div style='text-align: center; width: 90%; font-weight: bold; background-color: ${collection.Color};'>
        <span style='margin-right: 1em; font-size: 14pt;'>
          ${collection.Name}
        </span>
    </div>`;
  yield put({ type: types.makeToast, text: message, title: 'Success' });
}

export default function*() {
  yield takeEvery(types.checkInOut.getCopyStatusReceive, tryCheckIn);
  yield takeEvery(types.checkInOut.checkInReceive, handleCheckInSuccess);
}
