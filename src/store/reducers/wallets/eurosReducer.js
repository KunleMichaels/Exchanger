import * as Actions from '../../actions';

const initialState = {
    balance  : '100.00',
};

const euros = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.ADD_EUROS:
        {
            return {
                balance: state.balance + action.payload
            };
        }
        case Actions.DEDUCT_EUROS:
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

export default euros;
