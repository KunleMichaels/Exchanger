import * as Actions from '../../actions';

const initialState = {
    rates : null,
    error: null
};

const rates = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_FX_RATES_SUCCESS:
        {
            return {
                rates: action.payload
            };
        }
        case Actions.GET_FX_RATES_ERROR:
        {
            return {
               error: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default rates;
