import * as Actions from '../../actions';

const initialState = {
    pockets: [
        {
            currency: 'dollars',
            symbol: '$',
            balance: '100000000.00',
            flag: 'UnitedStates'
        },
        {
            currency: 'euros',
            symbol: '€',
            balance: '100.00',
            flag: 'Europe'
        },
        {
            currency: 'pounds',
            symbol: '£',
            balance: '100.00',
            flag: 'UnitedKingdom'
        }
    ]
};

const wallets = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.ADD:
        {
            return {
                balance: state.balance + action.payload
            };
        }
        case Actions.DEDUCT:
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

export default wallets;
