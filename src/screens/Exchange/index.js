import React, { useState } from 'react';
import AmountInput from '../../components/Input/AmountInput';
import {connect} from "react-redux";
import './styles.css';

function Exchange({ baseCurrency }){

    const [base, setBase] = useState(0);
    const [convert, setConvert] = useState(0)

    const amount_on_change = (e) => {
        let name = e.target.name;

        if(name === 'base'){
            setBase(e.target.value)
        }
        else {
            setConvert(e.target.value)
        }
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
                                value={base}
                                name='base'
                                id="base-input"
                                label='You Send'
                                base={baseCurrency}
                                onChange={amount_on_change}
                                placeholder="0"
                                currentIndex={0}
                            />
                            <div className='current-rate'></div>
                            <AmountInput
                                value={convert}
                                name='convert'
                                label='You Receive'
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

const mapStateToProps = ({ wallets }) => {
    return {
        baseCurrency: wallets.base
    }
}

export default connect(mapStateToProps)(Exchange);