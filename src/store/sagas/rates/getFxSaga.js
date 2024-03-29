import {put, takeEvery, call } from 'redux-saga/effects';
import fxService from "../../../services/fxServices";
import {
    GET_FX_RATES,
    GET_FX_RATES_ERROR,
    GET_FX_RATES_SUCCESS
} from "../../actions/rates/getFxActions";

function* getFxRatesSaga(action) {
        try {
            const data = yield call(fxService.getAllRates, action.payload);
            if(data.base === 'EUR')
                data.rates = {...data.rates, "EUR": 1.0}
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
    yield takeEvery([GET_FX_RATES], getFxRatesSaga);
}