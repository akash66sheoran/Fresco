import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const UpdateProfile = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
        }

        if (error) {
            toast.error(error, {
                position: "top-center",
                theme: "colored"
            })
            dispatch(clearErrors());
        }

        if (isUpdated) {

            toast.success("Profile updated successfully", {
                position: "top-center",
                theme: "colored"
            })
            dispatch(loadUser());

            navigate('/me')

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, error, isUpdated, navigate, user])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateProfile(name, email))
    }

    return (
        <Fragment>
            <MetaData title={'Update Profile'} />

            <div className="row mt-lg-5">
                <div className="mx-auto col col-lg-4">
                    <form className="shadow-lg p-3" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-3">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control mt-2"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field" className='mt-3'>Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control mt-2"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mt-4 mb-3" disabled={loading ? true : false} >Update</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    )
}

export default UpdateProfile