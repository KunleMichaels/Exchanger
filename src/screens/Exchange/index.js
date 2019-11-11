import React, { useEffect } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as ratesActions from '../../store/actions/rates';
import * as walletsActions from '../../store/actions/wallets';
import AmountInput from '../../components/Input/AmountInput';
import {useRequest} from './useRequest';
import { Icons, sign } from '../../utils';
import './styles.css';

function Exchange({ getRates, poll, pockets, base, baseVal, setBaseVal, convertVal, setConvertVal, convert, setBase, setConvert, requestId, rates, isFetching }){

    //custom hook to handle polling
    useRequest(base, 10000, poll, getRates, requestId, isFetching);

    //effect to handle changes to dropdown when base changes
    useEffect(() => {
        //convert using current rates and set value of end currency input when base select changes
        if(rates && rates.rates ){
        let newVal = baseVal / rates.rates[convert]
            if(isNaN(newVal))
                newVal = 0;
            setConvertVal(newVal.toFixed(2))
        }
    }, [base, rates])

    //effect to handle changes to dropdown when convert changes
    useEffect(() => {
        //convert using current rates and set value of end currency input when end select changes
        if(rates && rates.rates ){
          let newVal = baseVal * rates.rates[convert]
          if(isNaN(newVal))
              newVal = 0;

          setConvertVal(newVal.toFixed(2))
        }
    }, [convert])
    

    //generic onChange Handler
    const amount_on_change = (e) => {

        //destructure properties from object
        const {name, value } = e.target;

        //handle base currency iput
        if(name === 'base'){

            //set value of base currency input
            setBaseVal(value)

            //convert using current rates and set value of end currency input while typing
            let newVal = value * rates.rates[convert]
            if(isNaN(newVal))
                newVal = 0;
            setConvertVal(newVal.toFixed(2))
        }

        //handle end currency iput
        if(name === 'convert') {

            //set value of end currency input
            setConvertVal(value)

            //convert using current rates and set value of base currency input while typing
            let newVal = value / rates.rates[convert]
            if(isNaN(newVal))
                newVal = 0;
            setBaseVal(newVal.toFixed(2))
        }
    }

    //convert pockets to select format
    const options = pockets.map(pocket => {
        return {
            label: <span><img src={Icons[pocket.flag] } className='currency-flag' alt={pocket.currency}/> {pocket.shortcode}</span>,
            value: pocket.shortcode,
            shortcode: pocket.shortcode
        }
    });

    //base currency input select handler
    const baseSelectChange = (item) => {
        //set a new base currency
        setBase(item.shortcode)

    }

    //end currency input select handler
    const endSelectChange = (item) => {

        //set a new end currency
        setConvert(item.shortcode)
    }

    return (
        <div className='exchange__container'>
            <div className='jumbotron'>
                <Link to='/' className='main__header'>Exchange</Link>
                <div className='row justify-content-center'>
                    <div className='col-sm-10 col-sm-push-1 col-lg-offset-3 col-lg-6 mt-5 m-b-0'>
                        <div className='fx-calculator'>
                            <AmountInput
                                value={options.filter(item => item.shortcode === base)}
                                options={options}
                                name='base'
                                id="base-input"
                                label='You Send'
                                base={base}
                                selectChange={baseSelectChange}
                                onChange={amount_on_change}
                                placeholder="0"
                                inputValue={baseVal}
                            />
                            <div className='current-rate'> <h3>{sign[base]}1 = { rates && rates.rates && `${sign[convert]} ${rates.rates[convert]}`}</h3> </div>
                            <AmountInput
                                value={options.filter(item => item.shortcode === convert)}
                                options={options}
                                name='convert'
                                label='You Receive'
                                selectChange={endSelectChange}
                                id="convert-input"
                                onChange={amount_on_change}
                                placeholder="0"
                                inputValue={convertVal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ wallets, rates }) => {
    return {
        base: wallets.base,
        convert: wallets.convert,
        baseVal: wallets.baseVal,
        convertVal: wallets.convertVal,
        pockets: wallets.pockets,
        requestId: rates.requestId,
        isFetching: rates.isFetching,
        rates: rates.rates
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getRates: ratesActions.getFxRates,
        poll: ratesActions.poll,
        setBase: walletsActions.setBase,
        setConvert: walletsActions.setConvert,
        setBaseVal: walletsActions.setBaseVal,
        setConvertVal: walletsActions.setConvertVal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);