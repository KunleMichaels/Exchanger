import {put, takeEvery, call } from 'redux-saga/effects';
import fxService from "../../../services/fxServices";
import {
    GET_FX_RATES,
    GET_FX_RATES_ERROR,
    GET_FX_RATES_SUCCESS
}
    from "../../actions/rates/getFxActions";
import {
    SET_BASE
}
    from "../../actions/wallets";

// function delay(duration) {
//     const promise = new Promise(resolve => {
//         setTimeout(() => resolve(true), duration)
//     })
//     return promise
//       }

function* getFxRatesSaga(action) {
        try {
            const data = yield call(fxService.getAllRates, action.payload);
            yield put({
                type: GET_FX_RATES_SUCCESS,
                payload: data
            });

        } catch (error) {
            yield put({
                type: GET_FX_RATES_ERROR, 
                payload: error
            });
        }
}


export function* getFxRatesSagaWatcher() {
    yield takeEvery([SET_BASE, GET_FX_RATES], getFxRatesSaga);
}