import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Your Profile'} />

                    <h2 className="my-5 ms-5">My Profile</h2>
                    <div className='container'>

                        <div>
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>
                            <div>
                                {user.role !== 'admin' && (
                                    <Link to="/orders/me" className="btn btn-primary btn-block me-3">
                                        My Orders
                                    </Link>
                                )}
                                <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block me-3">
                                    Edit Profile
                                </Link>

                                <Link to="/password/update" className="btn btn-primary btn-block me-3">
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile