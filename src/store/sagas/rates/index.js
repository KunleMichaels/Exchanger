import { all } from 'redux-saga/effects';
import { getFxRatesSagaWatcher } from './getFxSaga';

export default function* categoriesSaga() {
    yield all([
        getFxRatesSagaWatcher(),
    ]);
}