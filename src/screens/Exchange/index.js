import React, { useState } from 'react';
import AmountInput from '../../components/Input/AmountInput';
import './styles.css';

function Exchange(){

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
                <AmountInput
                    value={base}
                    name='base'
                    onChange={amount_on_change}
                    placeholder="0"
                    currentIndex={0}
                />

                <AmountInput
                    value={convert}
                    name='convert'
                    onChange={amount_on_change}
                    placeholder="0"
                    currentIndex={2}
                />
            </div>
        </div>
    )
}


export default Exchange;