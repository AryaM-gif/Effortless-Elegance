
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import Like from './components/Like';
import Addp from './components/Addp';
import LoginUser from './components/Login';
import DisplayBag from './components/Display';
import Bag from './components/Bag';
import ViewBrandwise from './components/ViewBrandwise';
import AdminLogin from "./components/AdminLogin";
import CreateUser from './components/Register';
import Admin from './components/Admin';
import UserInfo from "./components/UserInfo";
import UserProfile from "./components/UserProfile"
import { myContext } from './components/context';
import Payment from './components/Payment';
import './App.css';

import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);


   const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/get");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const val = { products, setProducts, getProducts };
 return (
    <div className="App">
      <myContext.Provider value={val}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/like" element={<Like />} />
            <Route path="/addproducts" element={<Addp />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/bag" element={<Bag />} />
            <Route path="/display/:id" element={<DisplayBag />} />
            <Route path='/create' element={<CreateUser />} />
            <Route path='/admin' element={<Admin/>}/>
            <Route path="/products/:brand" element={<ViewBrandwise />} />
            <Route path="/UserInfo" element={<UserInfo />} />
            <Route path="/adlogin" element={<AdminLogin />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </Router>
      </myContext.Provider>
    </div>
  );
};

export default App;
