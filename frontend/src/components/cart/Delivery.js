import React, { Fragment, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useDispatch, useSelector } from 'react-redux'
import { saveDeliveryInfo } from '../../actions/cartActions'

const Delivery = () => {

    const { deliveryInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(deliveryInfo.address)
    const [phoneNo, setPhoneNo] = useState(deliveryInfo.phoneNo)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveDeliveryInfo({ address, phoneNo }))
        navigate('/order/confirm')
    }

    return (
        <Fragment>

            <MetaData title={'Delivery Info'} />

            <CheckoutSteps delivery />

            <div className="row mt-lg-5">
                <div className="mx-auto col col-lg-4">
                    <form className="shadow-lg p-3 mx-auto" onSubmit={submitHandler}>
                        <h1 className="mb-4">Delivery Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            id="delivery_btn"
                            type="submit"
                            className="btn btn-primary mt-3 w-100"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Delivery