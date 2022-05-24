import React from 'react'
import MetaData from './layout/MetaData'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <MetaData title={'Buy fresh fruits and vegitables online'} />
            <div className="hero-image">
                <img src="./images/banner-image.jpg" className='banner' alt="" />
                <div className="hero-text">
                    <h1>Buy fresh fruits and vegetables</h1>
                    <Link to="/products" className="btn btn-success login-btn ms-4">Buy Now</Link>
                </div>
            </div>
        </>
    )
}

export default Home