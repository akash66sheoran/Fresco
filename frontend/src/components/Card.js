import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addItemToCart } from '../actions/cartActions'
import { useDispatch } from 'react-redux'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ product }) => {

    const [quantity, setQuantity] = useState(0)

    const dispatch = useDispatch()

    const increaseQty = () => {
        setQuantity(quantity + 1)
    }

    const decreaseQty = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    const addToCart = () => {
        toast.success("Added to cart", {
            position: "top-center",
            theme: "colored"
        })
        dispatch(addItemToCart(product._id, quantity))
    }

    return (
        <div className="col-12 col-md-3">
            <div className="card shadow-lg border-3">
                <img src={product.image.url} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text"><b>&#x20b9;{product.price}</b>/kg</p>
                    <hr />
                    <div className='d-flex justify-content-center'>
                        <Link to="#" className="btn btn-danger px-2 py-0 rounded-0" onClick={decreaseQty}>-</Link>
                        <input type="text" className='w-25 py-0 text-center border-0' value={quantity} readOnly />
                        <Link to="#" className="btn btn-success px-2 py-0 rounded-0" onClick={increaseQty}>+</Link>
                    </div>
                    <button type="button" id="cart_btn" className="mt-3 btn login-btn text-white d-inline w-100" onClick={addToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card