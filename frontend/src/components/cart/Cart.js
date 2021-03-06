import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'

const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const increaseQty = (id, quantity) => {
        const newQty = quantity + 1;

        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {

        const newQty = quantity - 1;

        if (newQty <= 0) return;

        dispatch(addItemToCart(id, newQty))

    }

    const checkoutHandler = () => {
        navigate('/delivery')
    }

    return (
        <Fragment>
            <MetaData title={'Your Cart'} />
            {!user || cartItems.length === 0 ? <h2 className="ms-5 mt-5">Your Cart is Empty</h2> : (
                <Fragment>
                    <div className="container">
                        <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8">

                                {cartItems.map(item => (
                                    <Fragment>

                                        <div className="cart-item" key={item.product}>
                                            <div className="row">
                                                <div className="col-4 col-lg-3">
                                                    <img src={item.image} alt="" height="90" width="115" />
                                                </div>

                                                <div className="col-5 col-lg-3">
                                                    <p>{item.name}</p>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p id="card_item_price">&#x20b9;{item.price}/kg</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <div className='d-flex justify-content-center'>
                                                        <Link to="#" className="btn btn-danger px-2 py-0 rounded-0" onClick={() => decreaseQty(item.product, item.quantity)}>-</Link>
                                                        <input type="text" className='w-25 py-0 text-center border-0' value={item.quantity} readOnly />
                                                        <Link to="#" className="btn btn-success px-2 py-0 rounded-0" onClick={() => increaseQty(item.product, item.quantity)}>+</Link>
                                                    </div>
                                                </div>

                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)}></i>

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
                                    <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                                    <p>Est. total: <span className="order-summary-values">&#x20b9;{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>

                                    <hr />
                                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart