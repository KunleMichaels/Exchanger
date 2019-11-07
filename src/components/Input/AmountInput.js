import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import * as ratesActions from '../../store/actions/rates';

function AmountInput({getRates, onChange, rates, pockets, currentIndex, ...parentProps}) {

    useEffect(() => {
        getRates();
    }, [getRates])

    const onKeyDownHandler = (e) => {


        let keyCode = e.keyCode;

        //check if CTRL or Meta is pressed
        if (e.ctrlKey || e.metaKey) {

            //check for CTRL + a, c, x
            if (keyCode === 65 || keyCode === 67 || keyCode === 88) {
                return true;
            }

            e.preventDefault();
            e.stopPropagation();
        }

        if (e.shiftKey) {

            //check for CTRL + a, c, x
            if (keyCode === 37 || keyCode === 39) {
                return true;
            }

            e.preventDefault();
            e.stopPropagation();
        }


        //allow numbers, '.', BackSpace, Left Arrow, Right Arrow, DELETE, TAB
        if ((keyCode >= 48 && keyCode <= 57) || keyCode === 190 || keyCode === 8 || keyCode === 37 || keyCode === 39 || keyCode === 46 || keyCode === 9) {
            return true;
        }

        e.preventDefault();
        e.stopPropagation();
    }

    const onChangeHandler = (e) => {
        let newValue = e.target.value;

        let charArray = newValue.split('');

        let periodCount = 0;
        // eslint-disable-next-line
        charArray.map(char => {
            if(char === '.') {
                periodCount++;
            }
        });

        if(periodCount > 1) {
            return;
        }

        let parts = newValue.split('.');
        
        if(parts[1] && parts[1].length > 2) {
            return;
        } 
        onChange(e);
    }
 

    return (
        <div className="input-group">
            <input  {...parentProps} onKeyDown={onKeyDownHandler} onChange={onChangeHandler} className="form-control" /> 
            <div className="input-group-append">
                <select class="custom-select" id="currencies">
                    {
                        pockets.map((pocket, index) => {
                            return <option value={pocket.currency} selected={index === currentIndex}>{pocket.currency}</option>
                        })
                    }
                </select>
            </div>
        </div>
    )


}

AmountInput.propTypes = {
    rates: PropTypes.object.isRequired,
    getRates: PropTypes.func.isRequired
}

const mapStateToProps = ({ rates, wallets }) => {
    console.log("Currently Rates ===: ", rates)
    return {
        rates: rates.rates,
        pockets: wallets.pockets
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getRates: ratesActions.getFxRates
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AmountInput);