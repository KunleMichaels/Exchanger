export const ADD = 'ADD';
export const DEDUCT = 'DEDUCT';
export const SET_BASE = 'SET_BASE';
export const SET_BASE_VAL = 'SET_BASE_VAL';
export const UPDATE_BASE_VAL = 'UPDATE_BASE_VAL';
export const SET_CONVERT = 'SET_CONVERT';
export const SET_CONVERT_VAL = 'SET_CONVERT_VAL';
export const UPDATE_CONVERT_VAL = 'UPDATE_CONVERT_VAL';


export const add = (data) => ({
    type: ADD,
    payload: data
});

export const deduct = (data) => ({
    type: DEDUCT,
    payload: data
});

export const setBase = (data) => {
    return {
        type: SET_BASE,
        payload: data
    }    
};

export const setBaseVal = (data) => {
    return {
        type: SET_BASE_VAL,
        payload: data
    }    
};

export const updateBaseVal = (rates) => {
    return {
        type: UPDATE_BASE_VAL,
        payload: rates
    }    
};

export const setConvert = (data) => {
    return {
        type: SET_CONVERT,
        payload: data
    }    
};

export const setConvertVal = (data) => {
    return {
        type: SET_CONVERT_VAL,
        payload: data
    }    
};

export const updateConvertVal = (rates) => {
    return {
        type: UPDATE_CONVERT_VAL,
        payload: rates
    }    
};
