import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as ratesActions from '../../store/actions/rates';
import * as walletsActions from '../../store/actions/wallets';
import AmountInput from '../../components/Input/AmountInput';
import {useRequest} from './useRequest';
import { Icons } from '../../utils';
import './styles.css';

function Exchange({ getRates, poll, pockets, base, setBase, requestId, isFetching }){
    
    console.log("REQUESTID", requestId)

    useEffect(() => {
        getRates(base)
      }, 
      [base, requestId, getRates]);
    

    useRequest(base, 10000, poll, getRates, requestId, isFetching);

    const amount_on_change = (e) => {
        let name = e.target.name;

        if(name === 'base'){
            // setBase(e.target.value)
        }
        else {
            // setConvert(e.target.value)
        }
    }

    const baseOptions = pockets.map(pocket => {
        return {
            label: <span><img src={Icons[pocket.flag] } className='currency-flag' alt={pocket.currency}/> {pocket.shortcode}</span>,
            value: pocket.shortcode,
            shortcode: pocket.shortcode
        }
    });

    const otherOptions = baseOptions.filter(item => item.shortcode !== base);

    const [end, setEnd] = useState(otherOptions[0])


    const baseSelectChange = (item) => {
        setBase(item.shortcode)
    }

    const endSelectChange = (item) => {
        setEnd(item)
    }

    return (
        <div className='exchange__container'>
            <div className='jumbotron'>
                <h1 className='main__header'>Exchange</h1>
                <div className='row'>
                    <div className='col-sm-10 col-sm-push-1 col-lg-push-1 col-lg-5 m-t-2 m-b-0'></div>
                    <div className='col-sm-10 col-sm-push-1 col-lg-push-1 col-lg-5 m-t-2 m-b-0'>
                        <div className='fx-calculator'>
                            <AmountInput
                                value={baseOptions.filter(item => item.shortcode === base)}
                                options={baseOptions}
                                name='base'
                                id="base-input"
                                label='You Send'
                                base={base}
                                selectChange={baseSelectChange}
                                onChange={amount_on_change}
                                placeholder="0"
                                currentIndex={0}
                            />
                            <div className='current-rate'></div>
                            <AmountInput
                                value={end}
                                options={otherOptions}
                                name='convert'
                                label='You Receive'
                                selectChange={endSelectChange}
                                id="convert-input"
                                onChange={amount_on_change}
                                placeholder="0"
                                currentIndex={2}
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
        pockets: wallets.pockets,
        requestId: rates.requestId,
        isFetching: rates.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getRates: ratesActions.getFxRates,
        poll: ratesActions.poll,
        setBase: walletsActions.setBase
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);