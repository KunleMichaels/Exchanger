import {combineReducers} from 'redux';
import dollars from './dollarsReducer';
import euros from './eurosReducer';
import pounds from './poundsReducer';

const wallets = combineReducers({
    dollars,
    euros,
    pounds
});

export default wallets;