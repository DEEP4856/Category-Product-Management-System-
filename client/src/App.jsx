import React from 'react';
import Header from './components/header/header';
import Login from './components/register/login';
import SignUp from './components/register/signup';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/dashboard';
import Product from './pages/products/product';
import Category from './pages/category/category';
import Categoryinputs from './components/taskcomponent/categoryinputs';
import Productinput from './components/taskcomponent/productinput';
import Catedit from './components/taskcomponent/catedit';
import Productedit from './components/taskcomponent/productedit';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/Product" element={<Product/>} />
          <Route path="/Category" element={<Category/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/categoryinputs" element={<Categoryinputs/>} />
          <Route path="/productinput" element={<Productinput/>} />
          <Route path="/Catedit/:id" element={<Catedit/>}/>
          <Route path="/Productedit/:id" element={<Productedit/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
