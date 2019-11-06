import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import Card from '../../components/Card';
import { Icons } from '../../utils';
import Exchange from '../../assets/images/exchange.svg';
import './styles.css';

function Home({ pockets }){

    return (
        <div className='home__container'>
            <div className='jumbotron'>
                <h5 className='main__header'>Wallets</h5>
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        {
                            pockets.map((pocket, index) => (
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <Card currency={pocket.currency} flag={Icons[pocket.flag]} balance={pocket.balance} symbol={pocket.symbol}/>
                                </div>
                            ))
                        }
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
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