import { takeEvery, put } from 'redux-saga/effects';
import { actionTypes, createGetGamesAction } from './gamesActions';

function* onGamesChange() {
  yield put(createGetGamesAction());
}

export default function* collectionsSaga() {
  yield takeEvery(actionTypes.addGameSuccess, onGamesChange);
  yield takeEvery(actionTypes.updateGameSuccess, onGamesChange);
  yield takeEvery(actionTypes.uploadGamesSuccess, onGamesChange);
}
