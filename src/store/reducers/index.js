import {combineReducers} from 'redux';
import alerts from './alerts';
import rates from './rates';
import wallets from './wallets';

const createReducer = (asyncReducers) =>
    combineReducers({
        alerts,
        wallets,
        rates,
        ...asyncReducers
    });

export default createReducer;
