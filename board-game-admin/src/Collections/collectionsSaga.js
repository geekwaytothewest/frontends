import { takeEvery, put } from 'redux-saga/effects';
import { actionTypes, createGetCollectionsAction } from './collectionsActions';

function* onCopiesChange() {
  yield put(createGetCollectionsAction());
}

export default function* collectionsSaga() {
  yield takeEvery(actionTypes.addCopySuccess, onCopiesChange);
  yield takeEvery(actionTypes.updateCopySuccess, onCopiesChange);
  yield takeEvery(actionTypes.uploadCopiesSuccess, onCopiesChange);
}
