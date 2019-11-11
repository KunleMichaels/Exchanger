import * as Actions from '../../actions';

const initialState = {
    pockets: [
        {
            currency: 'dollars',
            symbol: '$',
            shortcode: 'USD',
            balance: 10000.00,
            flag: 'UnitedStates'
        },
        {
            currency: 'euros',
            symbol: '€',
            shortcode: 'EUR',
            balance: 1000.00,
            flag: 'Europe'
        },
        {
            currency: 'pounds',
            symbol: '£',
            shortcode: 'GBP',
            balance: 1000.00,
            flag: 'UnitedKingdom'
        }
    ],
    base: 'USD',
    convert: 'USD',
    baseVal: 0,
    convertVal: 0
};

const wallets = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.ADD:
        {
            // let foundIndex = state.pockets.findIndex(x => x.code === action.payload.code);

            return {
                ...state,
                pockets: state.pockets.map(pocket => {
                    if(pocket.shortcode === action.payload.code){
                        let balance = parseFloat(pocket.balance) + parseFloat(action.payload.amount)
                        pocket.balance = balance.toFixed(2)
                    }
                    return pocket
                })
            };
        }
        case Actions.DEDUCT:
        {
            // let foundIndex = state.pockets.findIndex(x => x.code === action.payload.code);

            return {
                ...state,
                pockets: state.pockets.map(pocket => {
                    if(pocket.shortcode === action.payload.code){
                        let balance = parseFloat(pocket.balance) - parseFloat(action.payload.amount)
                        pocket.balance = balance.toFixed(2)
                    }
                    return pocket
                })
            };
        }
        case Actions.SET_BASE:
        {
            return {
                ...state,
                base: action.payload
            };
        }
        case Actions.SET_CONVERT:
        {
            return {
                ...state,
                convert: action.payload
            };
        }
        case Actions.SET_BASE_VAL:
        {
            return {
                ...state,
                baseVal: action.payload
            };
        }
        case Actions.UPDATE_BASE_VAL:
        {
            return {
                ...state,
                baseVal: state.convertVal / action.payload
            };
        }
        case Actions.SET_CONVERT_VAL:
        {
            return {
                ...state,
                convertVal: action.payload
            };
        }
        case Actions.UPDATE_CONVERT_VAL:
        {
            return {
                ...state,
                convertVal: state.baseVal * action.payload[state.convert]
            };
        }
        default:
        {
            return state;
        }
    }
};

export default wallets;
