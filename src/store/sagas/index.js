import {all} from 'redux-saga/effects';
import ratesSaga from './rates';

export default function* rootSaga() {
    yield all([
        ratesSaga(),
    ]);
}
