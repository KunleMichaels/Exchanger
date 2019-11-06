import * as Actions from '../../actions';

const initialState = {
    balance  : '100.00',
};

const dollars = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.ADD_DOLLARS:
        {
            return {
                balance: state.balance + action.payload
            };
        }
        case Actions.DEDUCT_DOLLARS:
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

export default dollars;
