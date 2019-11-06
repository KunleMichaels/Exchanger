export const ADD_POUNDS = 'ADD_POUNDS';
export const DEDUCT_POUNDS = 'DEDUCT_POUNDS';


export const addPounds = (data) => ({
    type: ADD_POUNDS,
    payload: data
});

export const deductPounds = (data) => ({
    type: DEDUCT_POUNDS,
    payload: data
});
