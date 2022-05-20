import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home';
import Footer from './components/layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} exact />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
