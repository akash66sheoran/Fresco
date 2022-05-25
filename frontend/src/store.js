import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers'
import { productsReducer } from './reducers/productReducers'

const reducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
})

let initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store