import React, { useEffect } from 'react'
import MetaData from './layout/MetaData'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Loader from './layout/Loader'
import Search from './layout/Search'

const Products = () => {

    const dispatch = useDispatch()
    const params = useParams()

    const { loading, products } = useSelector(state => state.products)

    const keyword = params.keyword

    useEffect(() => {

        dispatch(getProducts(keyword))

    }, [dispatch, keyword])

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
                                <div key={product._id} className="col-12 col-md-3">
                                    <div className="card">
                                        <img src={product.image.url} className="card-img-top" alt="" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <p className="card-text"><b>&#x20b9;{product.price}</b>/kg</p>

                                            <Link to="#" className="btn btn-primary">Go somewhere</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Products