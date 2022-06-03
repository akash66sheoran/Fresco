import React, { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'

const ProductsList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, products } = useSelector(state => state.products);
    const { deleteError, isDeleted } = useSelector(state => state.deleteProduct)

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            toast.error(error, {
                position: "top-center",
                theme: "colored"
            })
            dispatch(clearErrors())
        }

        if (deleteError) {
            toast.success("Order deleted successfully", {
                position: "top-center",
                theme: "colored"
            })
            dispatch(clearErrors())
        }

        if (isDeleted) {
            navigate('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch, error, deleteError, isDeleted, navigate])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `${product.price}`,
                actions: <Fragment>
                    <button className="btn btn-danger py-1 px-2 ms-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProductsList