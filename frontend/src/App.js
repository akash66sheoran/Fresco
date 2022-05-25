import { useEffect } from 'react';
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

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
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
        <Route path='/me' element={
          <ProtectedRoute>
            <Profile />
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
