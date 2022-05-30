import axios from 'axios'
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_DELIVERY_INFO } from '../constants/cartConstants'

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/product/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image.url,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const saveDeliveryInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_DELIVERY_INFO,
        payload: data
    })

    localStorage.setItem('deliveryInfo', JSON.stringify(data))

}