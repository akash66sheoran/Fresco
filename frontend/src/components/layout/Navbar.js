import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-color">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">Navbar</Link>
                <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link navlink-color" aria-current="page" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link navlink-color" aria-current="page" to="/">About</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link navlink-color" aria-current="page" to="/">Contact Us</Link>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <button class="btn btn-success login-btn mx-2">Login</button>
                        <button class="btn btn-success login-btn mx-2">Sign Up</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar