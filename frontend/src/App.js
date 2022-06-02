import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Login from './components/user/Login';
import Register from './components/user/Register';
import store from './store'
import { loadUser } from './actions/userActions'
import Products from './components/Products';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import Cart from './components/cart/Cart'
import Delivery from './components/cart/Delivery';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess'
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails'
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/login' element={<Login />} exact />
        <Route path='/register' element={<Register />} exact />
        <Route path='/products' element={<Products />} exact />
        <Route path='/products/search/:keyword' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/delivery' element={
          <ProtectedRoute>
            <Delivery />
          </ProtectedRoute>} exact />
        <Route path='/order/confirm' element={
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>} exact />
        <Route path='/success' element={
          <OrderSuccess />} exact />
        <Route path='/me' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>} exact />
        <Route path='/orders/me' element={
          <ProtectedRoute>
            <ListOrders />
          </ProtectedRoute>} exact />
        <Route path='/order/:id' element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>} exact />
        <Route path='/me/update' element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>} exact />
        <Route path='/password/update' element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>} exact />
        <Route path='/password/forgot' element={<ForgotPassword />} exact />
        {stripeApiKey &&
          <Route path="/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        }
        <Route path='/dashboard' isAdmin={true} element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} exact />
        <Route path='/admin/products' isAdmin={true} element={
          <ProtectedRoute>
            <ProductsList />
          </ProtectedRoute>} exact />
        <Route path='/admin/product' isAdmin={true} element={
          <ProtectedRoute>
            <NewProduct />
          </ProtectedRoute>} exact />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
