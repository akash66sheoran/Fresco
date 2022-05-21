import React from 'react'
import MetaData from './layout/MetaData'

const Home = () => {
    return (
        <>
            <MetaData title={'Buy fresh fruits and vegitables online'} />
            <div className="hero-image">
                <img src="./images/banner-image.jpg" className='banner' alt="" />
                <div className="hero-text">
                    <h1>Buy fresh fruits and vegetables</h1>
                    <button>Buy Now</button>
                </div>
            </div>
        </>
    )
}

export default Home