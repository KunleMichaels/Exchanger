export const ADD_EUROS = 'ADD_EUROS';
export const DEDUCT_EUROS = 'DEDUCT_EUROS';


export const addEuros = (data) => ({
    type: ADD_EUROS,
    payload: data
});

export const deductEuros = (data) => ({
    type: DEDUCT_EUROS,
    payload: data
});
