export const ADD = 'ADD';
export const DEDUCT = 'DEDUCT';


export const add = (data) => ({
    type: ADD,
    payload: data
});

export const deduct = (data) => ({
    type: DEDUCT,
    payload: data
});
