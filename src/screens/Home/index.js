import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import Slider from "react-slick";
import Card from '../../components/Card';
import { Icons } from '../../utils';
import Exchange from '../../assets/images/exchange.svg';
import './styles.css';

function Home({ pockets }){
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        // centerPadding: "60px",
        slidesToShow: 2,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 2000,
        cssEase: "linear"
      };

    return (
        <div className='home__container'>
            <div className='jumbotron'>
                <h5 className='main__header'>Wallets</h5>
                <Slider {...settings}>
                    {
                        pockets.map((pocket, index) => (
                             <div key={pocket.currency} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                 <Card currency={pocket.currency} flag={Icons[pocket.flag]} balance={pocket.balance} symbol={pocket.symbol}/>
                             </div>
                         ))
                    }
                </Slider>
            </div>
            <section className='actions'>
                <Link to='/exchange'>
                    <figure>
                        <img src={Exchange} alt="Exchange" />
                    </figure>
                </Link>
                <span>Exchange</span>
            </section>
            <div className='text-center footer'>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    )
}

Home.propTypes = {
    pockets: PropTypes.array.isRequired,
}

const mapStateToProps = ({ wallets }) => {
    return {
        pockets: wallets.pockets
    }
}


export default connect(mapStateToProps)(Home);