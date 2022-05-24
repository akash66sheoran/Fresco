import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'

import Loader from '../layout/Loader'
import { useSelector, useDispatch } from 'react-redux'

import { login, clearErrors } from '../../actions/userActions'

const Login = ({ history, location }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if (error) {
            setErrorMessage(error)
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate('/')
        }

    }, [dispatch, isAuthenticated, error, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />

                    <div className="row mt-lg-5">
                        <div className="mx-auto col col-lg-4">
                            <form className="shadow-lg p-3" onSubmit={submitHandler}>
                                {errorMessage && (
                                    <p className="error"> {errorMessage} </p>
                                )}
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group my-3">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group my-3">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className='d-flex flex-column'>
                                    <Link to="/password/forgot" className="ms-auto mb-4">Forgot Password?</Link>

                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        LOGIN
                                    </button>

                                    <Link to="/register" className="ms-auto mt-3">New User?</Link>
                                </div>
                            </form>
                        </div>
                    </div>


                </Fragment>
            )}
        </Fragment>
    )
}

export default Login