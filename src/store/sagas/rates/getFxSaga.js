import {put, takeEvery, call } from 'redux-saga/effects';
import fxService from "../../../services/fxServices";
import {
    GET_FX_RATES,
    GET_FX_RATES_ERROR,
    GET_FX_RATES_SUCCESS
}
    from "../../actions/rates/getFxActions";

function delay(duration) {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(true), duration)
    })
    return promise
      }

function* getFxRatesSaga(action) {
    while(true){
        try {
            // console.log("We here now")
            const data = yield call(fxService.getAllRates, action.payload);
            yield put({
                type: GET_FX_RATES_SUCCESS,
                payload: data
            });
            yield call(delay, 10000)

        } catch (error) {
            yield put({
                type: GET_FX_RATES_ERROR, 
                payload: error
            });
            yield call(delay, 5000)
        }
    }
}


export function* getFxRatesSagaWatcher() {
    yield takeEvery([GET_FX_RATES], getFxRatesSaga);
}