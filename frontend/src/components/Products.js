import React, { useEffect } from 'react'
import MetaData from './layout/MetaData'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Loader from './layout/Loader'
import Search from './layout/Search'
import Card from './Card'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {

    const dispatch = useDispatch()
    const params = useParams()

    const { loading, products, error } = useSelector(state => state.products)

    const keyword = params.keyword

    useEffect(() => {

        if (error) {
            toast.error(error, {
                position: "top-center",
                theme: "colored"
            })
        }

        dispatch(getProducts(keyword))

    }, [dispatch, keyword, error])

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={'Buy fresh fruits and vegitables online'} />
                    <div className="container col-12 col-md-6 mt-3">
                        <Search />
                    </div>
                    <div className="container mt-5">
                        <h1 className="mb-4">Fruits 'n' Vegetables</h1>
                        <div className="row g-3">
                            {products && products.map(product => (
                                <Card key={product._id} product={product} />
                            ))}

                        </div>
                    </div>
                </>
            )
            }
            <ToastContainer />
        </>
    )
}

export default Products