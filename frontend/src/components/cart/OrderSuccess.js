import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

const OrderSuccess = () => {
    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">

                    <h1>Your Order has been placed successfully.</h1>

                    <Link to="/orders/me" className='h3'>Go to Orders</Link>
                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess