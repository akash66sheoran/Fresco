import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'

const Navbar = () => {

    const dispatch = useDispatch()

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-color">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Fresco</Link>
                <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link navlink-color" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link navlink-color" aria-current="page" to="/">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link navlink-color" aria-current="page" to="/">Contact Us</Link>
                        </li>
                    </ul>
                    <div className="me-5">
                        <Link to="/cart" style={{ textDecoration: 'none' }} >
                            <span id="cart" className="ms-3">Cart</span>
                            <span className="ms-1" id="cart_count">{cartItems.length}</span>
                        </Link>
                        {user ? (
                            <div className="ms-4 dropdown d-inline">
                                <Link to="#" className="btn dropdown-toggle text-white me-4" role="button" id="dropDownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span>{user && user.name}</span>
                                </Link>

                                <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                    {user && user.role === 'admin' ? (
                                        <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                    ) : (<Link className="dropdown-item" to="/orders/me">Orders</Link>)}

                                    <Link className="dropdown-item" to="/me">Profile</Link>
                                    <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                        Logout
                                    </Link>
                                </div>
                            </div>

                        ) : !loading && <Link to="/login" className="btn btn-success login-btn ms-4">Login</Link>}

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar