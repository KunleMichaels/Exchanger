import * as Actions from '../../actions';

const initialState = {
    rates : [],
    requestId: 1,
    isFetching: false,
    error: null
};

const rates = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_FX_RATES_SUCCESS:
        {
            return {
                ...state,
                isFetching: false,
                rates: action.payload
            };
        }
        case Actions.GET_FX_RATES_ERROR:
        {
            return {
                ...state,
                isFetching: false,
               error: action.payload
            };
        }
        case Actions.POLL:
        {
            return {
                ...state,
                requestId: state.requestId + 1,
                isFetching: true
            };
        }
        default:
        {
            return state;
        }
    }
};

export default rates;
