export const GET_FX_RATES = 'GET_FX_RATES';
export const GET_FX_RATES_ERROR = 'GET_FX_RATES_ERROR';
export const GET_FX_RATES_SUCCESS = 'GET_FX_RATES_SUCCESS';


export const getFxRates = (data) => ({
    type: GET_FX_RATES,
    payload: data
});
