import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'
import { Link, useNavigate } from 'react-router-dom'

const Register = ({ history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { isAuthenticated, error } = useSelector(state => state.auth);

    useEffect(() => {

        if (isAuthenticated) {
            navigate('/')
        }

        if (error) {
            setErrorMessage(error)
            dispatch(clearErrors());
        }

    }, [dispatch, isAuthenticated, error, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password))
    }

    return (
        <Fragment>

            <MetaData title={'Register User'} />

            <div className="row mt-lg-5">
                <div className="mx-auto col col-lg-4">
                    <form className="shadow-lg p-3" onSubmit={submitHandler} encType='multipart/form-data'>
                        {errorMessage && (
                            <p className="error"> {errorMessage} </p>
                        )}
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group my-3">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group my-3">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
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
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='d-flex flex-column'>
                            <button
                                id="register_button"
                                type="submit"
                                className="btn btn-primary"
                            >
                                REGISTER
                            </button>
                            <Link to="/login" className="ms-auto mt-3">Already a User?</Link>
                        </div>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Register