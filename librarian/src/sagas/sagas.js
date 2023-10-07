import { all } from 'redux-saga/effects';
import checkInSaga from './checkInSagas';
import checkOutSaga from './checkOutSagas';
import checkoutsListsSaga from './checkoutsListsSagas';
import toastSaga from './toastSagas';
import errorSaga from './errorSagas';

export default function* rootSaga() {
  yield all([checkOutSaga(), checkInSaga(), checkoutsListsSaga(), errorSaga(), toastSaga()]);
}
