import * as Actions from '../../actions';

const initialState = {
    balance  : '100.00',
};

const pounds = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.ADD_POUNDS:
        {
            return {
                balance: state.balance + action.payload
            };
        }
        case Actions.DEDUCT_POUNDS:
        {
            return {
                balance: state.balance - action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default pounds;
