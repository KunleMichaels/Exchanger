export const ADD = 'ADD';
export const DEDUCT = 'DEDUCT';
export const SET_BASE = 'SET_BASE'


export const add = (data) => ({
    type: ADD,
    payload: data
});

export const deduct = (data) => ({
    type: DEDUCT,
    payload: data
});

export const setBase = (data) => {
    console.log("DATA", data)
    return {
        type: SET_BASE,
        payload: data
    }    
};
