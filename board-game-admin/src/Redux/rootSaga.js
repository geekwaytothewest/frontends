import { all } from 'redux-saga/effects';
import apiErrorsSaga from './apiErrorsSaga';
import collectionsSaga from '../Collections/collectionsSaga';
import attendeesSaga from '../Attendees/attendeesSaga';
import toastSaga from '../Toasts/toastSaga';

export default function* rootSaga() {
  yield all([collectionsSaga(), attendeesSaga(), apiErrorsSaga(), toastSaga()]);
}
