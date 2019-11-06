export const ADD_DOLLARS = 'ADD_DOLLARS';
export const DEDUCT_DOLLARS = 'DEDUCT_DOLLARS';


export const addDollars = (data) => ({
    type: ADD_DOLLARS,
    payload: data
});

export const deductDollars = (data) => ({
    type: DEDUCT_DOLLARS,
    payload: data
});
