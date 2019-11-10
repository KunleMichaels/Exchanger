import * as Actions from '../../actions';

const initialState = {
    pockets: [
        {
            currency: 'dollars',
            symbol: '$',
            shortcode: 'USD',
            balance: '10000.00',
            flag: 'UnitedStates'
        },
        {
            currency: 'euros',
            symbol: '€',
            shortcode: 'EUR',
            balance: '1000.00',
            flag: 'Europe'
        },
        {
            currency: 'pounds',
            symbol: '£',
            shortcode: 'GBP',
            balance: '1000.00',
            flag: 'UnitedKingdom'
        }
    ],
    base: 'USD'
};

const wallets = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.ADD:
        {
            return {
                ...state,
                balance: state.balance + action.payload
            };
        }
        case Actions.DEDUCT:
        {
            return {
                ...state,
                balance: state.balance - action.payload
            };
        }
        case Actions.SET_BASE:
        {
            return {
                ...state,
                base: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default wallets;
