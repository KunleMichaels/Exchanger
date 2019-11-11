import React, { useEffect, useState } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as ratesActions from '../../store/actions/rates';
import * as walletsActions from '../../store/actions/wallets';
import AmountInput from '../../components/Input/AmountInput';
import {useRequest} from './useRequest';
import { Icons, sign } from '../../utils';
import './styles.css';

function Exchange({ getRates, poll, pockets, base, baseVal, setBaseVal, convertVal, setConvertVal, convert, setBase, setConvert, requestId, rates, isFetching, deduct, add }){

    const [baseInvalid, setBaseInvalid] = useState(false);
    const [invalidText, setInvalidText] = useState(false)

    //custom hook to handle polling
    useRequest(base, 10000, poll, getRates, requestId, isFetching);

    //effect to handle changes to dropdown when dropdown changes changes
    useEffect(() => {
        //convert using current rates and set value of end currency input when base select changes
        if(rates && rates.rates ){
        let newVal = baseVal * rates.rates[convert]
            if(isNaN(newVal))
                newVal = 0;
            setConvertVal(newVal.toFixed(2))
        }
    }, [base, rates, convert, baseVal, setConvertVal])


    //generic onChange Handler
    const amount_on_change = (e) => {

        //destructure properties from object
        const {name, value } = e.target;

        const basePocket = pockets.filter(pocket => pocket.shortcode === base)

        const pocket = basePocket[0];

        //handle base currency iput
        if(name === 'base'){

            if(value > parseFloat(pocket.balance)){
                setInvalidText("You can't exceed your balance")
                setBaseInvalid(true)
            }
            if(value <= parseFloat(pocket.balance)){
                setBaseInvalid(false)
            }
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

            //convert using current rates and set value of base currency input while typing
            let newVal = value / rates.rates[convert]
            //set value of end currency input
            if(isNaN(newVal))
                newVal = 0;
            if(newVal >= parseFloat(pocket.balance)){
                setInvalidText("You can't exceed your balance")
                setBaseInvalid(true)
            }
            if(newVal >= parseFloat(pocket.balance)){
                setBaseInvalid(false)
            }
            setConvertVal(value)
            setBaseVal(newVal.toFixed(2))

        }
    }

    //convert pockets to select format
    const options = pockets.map(pocket => {
        return {
            label: <span><img src={Icons[pocket.flag] } className='currency-flag' alt={pocket.currency}/> {pocket.shortcode}</span>,
            value: pocket.shortcode,
            shortcode: pocket.shortcode,
            balance: pocket.balance
        }
    });

    //base currency input select handler
    const baseSelectChange = (item) => {
        //set a new base currency
        setBase(item.shortcode)
        setBaseInvalid(false)
    }

    //end currency input select handler
    const endSelectChange = (item) => {

        //set a new end currency
        setConvert(item.shortcode)
    }

    const handleExchange = () => {
        deduct(base, baseVal);
        add(convert, convertVal)
    }

    const current_base = options.filter(item => item.shortcode === base)[0]
    const current_convert = options.filter(item => item.shortcode === convert)[0]

    return (
        <div className='exchange__container'>
            <div className='jumbotron'>
                <Link to='/' className='main__header'>Back</Link>
                <div className='row justify-content-center'>
                    <div className='col-sm-10 col-sm-push-1 col-lg-offset-3 col-lg-6 mt-5 m-b-0'>
                        <div className='fx-calculator'>
                            <div className='balance'><p><span>{current_base.shortcode}</span> Balance: <span>{current_base.balance}</span></p></div>
                            <AmountInput
                                value={current_base}
                                options={options}
                                name='base'
                                id="base-input"
                                label='You Send'
                                base={base}
                                selectChange={baseSelectChange}
                                onChange={amount_on_change}
                                invalidText={invalidText}
                                invalid={baseInvalid}
                                inputValue={baseVal}
                            />
                            <div className='current-rate'> <h3>{sign[base]}1 = { rates && rates.rates && `${sign[convert]} ${rates.rates[convert]}`}</h3> </div>

                            <div className='balance'><p><span>{current_convert.shortcode}</span> Balance: <span>{current_convert.balance}</span></p></div>
                            <AmountInput
                                value={current_convert}
                                options={options}
                                name='convert'
                                label='You Receive'
                                selectChange={endSelectChange}
                                id="convert-input"
                                onChange={amount_on_change}
                                inputValue={convertVal}
                            />
                        </div>
                        <div className='exchange-actions'>
                            <button onClick={handleExchange} className='exchange-btn form-control btn-lg' disabled={parseFloat(current_base.balance) < parseFloat(baseVal)}>Exchange</button>
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
        setConvertVal: walletsActions.setConvertVal,
        deduct: walletsActions.deduct,
        add: walletsActions.add
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);