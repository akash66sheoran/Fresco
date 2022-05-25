import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch();

    const { error, loading } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            dispatch(clearErrors());
        }

    }, [dispatch, error])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(forgotPassword(email))
    }

    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />

            <div className="row mt-lg-5">
                <div className="mx-auto col-10 col-lg-5">
                    <form className="shadow-lg p-3" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-primary btn-block my-3"
                            disabled={loading ? true : false} >
                            Send Email
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default ForgotPassword