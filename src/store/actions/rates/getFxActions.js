export const GET_FX_RATES = 'GET_FX_RATES';
export const GET_FX_RATES_ERROR = 'GET_FX_RATES_ERROR';
export const GET_FX_RATES_SUCCESS = 'GET_FX_RATES_SUCCESS';
export const POLL = 'POLL';


export const getFxRates = (data) => ({
    type: GET_FX_RATES,
    payload: data
});

export const getFxRatesSuccess = (data) => ({
    type: GET_FX_RATES_SUCCESS,
    payload: data
});

export const getFxRatesError = (data) => ({
    type: GET_FX_RATES_ERROR,
    payload: data
});

export const poll = () => ({
    type: POLL
})
