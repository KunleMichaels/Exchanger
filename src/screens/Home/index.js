import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import Card from '../../components/Card';
import UnitedStates from '../../assets/images/united-states.svg';
import UnitedKingdom from '../../assets/images/united-kingdom.svg';
import EuropeanUnion from '../../assets/images/european-union.svg';
import Exchange from '../../assets/images/exchange.svg';
import './styles.css';

function Home({ dollars, euros, pounds }){

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
                        <div className="carousel-item active">
                            <Card currency='Dollar' flag={UnitedStates} balance={dollars} symbol={'$'}/>
                        </div>
                        <div className="carousel-item">
                            <Card currency='Euro' flag={EuropeanUnion} balance={euros} symbol={'€'}/>
                        </div>
                        <div className="carousel-item">
                            <Card currency='Pound' flag={UnitedKingdom} balance={pounds} symbol={'£'}/>
                        </div>
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
    dollars: PropTypes.string.isRequired,
    euros: PropTypes.string.isRequired,
    pounds: PropTypes.string.isRequired
}

const mapStateToProps = ({ wallets }) => {
    return {
        dollars: wallets.dollars.balance,
        euros: wallets.euros.balance,
        pounds: wallets.pounds.balance
    }
}


export default connect(mapStateToProps)(Home);