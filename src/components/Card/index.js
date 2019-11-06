import React from 'react';
import './styles.css';

function Card({ currency, balance, flag,symbol}){

    return (
        <section className='wallet__card'>
            <section className='card__box'>
                <section className='card__title'>{currency}</section>
                <span className='card__symbol'><img src={flag} alt={`${currency} Flag`}/></span>
                <section className='clearfix card__balance'>{ `${symbol}${balance}`}</section>
            </section>
        </section>
    );
}

export default Card;