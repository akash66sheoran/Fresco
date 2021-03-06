import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (error) {
            toast.error(error, {
                position: "top-center",
                theme: "colored"
            })
            dispatch(clearErrors());
        }

        if (isUpdated) {

            toast.success("Password updated successfully", {
                position: "top-center",
                theme: "colored"
            })

            navigate('/me')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, error, navigate, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updatePassword(oldPassword, password))
    }

    return (
        <Fragment>
            <MetaData title={'Change Password'} />

            <div className="row mt-lg-5">
                <div className="mx-auto col col-lg-4">
                    <form className="shadow-lg p-3" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-4">Update Password</h1>
                        <div className="form-group mb-3">
                            <label for="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label for="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mt-4 mb-3" disabled={loading ? true : false} >Update Password</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    )
}

export default UpdatePassword