import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useSelector } from 'react-redux'

const ConfirmOrder = () => {

    const { cartItems, deliveryInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    const navigate = useNavigate()

    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const deliveryPrice = itemsPrice > 100 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + deliveryPrice + taxPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            deliveryPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }

    return (
        <Fragment>

            <MetaData title={'Confirm Order'} />

            <CheckoutSteps delivery confirmOrder />

            <div className="container row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Delivery Info</h4>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Phone:</b> {deliveryInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b> {`${deliveryInfo.address}`}</p>

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {cartItems.map(item => (
                        <Fragment>
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        {/* <img src={item.images} alt={item.name} height="45" width="65" /> */}
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <p>{item.name}</p>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x &#x20b9;{item.price} = <b>&#x20b9;{(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}



                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">&#x20b9;{itemsPrice}</span></p>
                        <p>delivery: <span className="order-summary-values">&#x20b9;{deliveryPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">&#x20b9;{taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">&#x20b9;{totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Proceed to Payment</button>
                    </div>
                </div>


            </div>

        </Fragment>
    )
}

export default ConfirmOrder