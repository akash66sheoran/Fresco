import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from '../layout/Loader'
import { useSelector, useDispatch } from 'react-redux'

import { login, clearErrors } from '../../actions/userActions'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {

        if (error) {
            toast.error(error, {
                position: "top-center",
                theme: "colored"
            })
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate('/')
        }

    }, [dispatch, isAuthenticated, error, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        toast.success("Logged in successfully", {
            position: "top-center",
            theme: "colored"
        })
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
                    <ToastContainer />

                </Fragment>
            )}
        </Fragment>
    )
}

export default Login