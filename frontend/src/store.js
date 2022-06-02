import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers'
import { productsReducer, newProductReducer, deleteProductReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { newOrderReducer, myOrdersReducer, orderDetailsReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    deleteProduct: deleteProductReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    orderDetails: orderDetailsReducer,
    myOrders: myOrdersReducer,
    newProduct: newProductReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        deliveryInfo: localStorage.getItem('deliveryInfo')
            ? JSON.parse(localStorage.getItem('deliveryInfo'))
            : {}
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store