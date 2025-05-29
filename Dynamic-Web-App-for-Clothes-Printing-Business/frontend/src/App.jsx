import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";
import Customize from "./pages/Customize";
import SearchBar from "./components/SearchBar";

import CartWithErrorBoundary from "./pages/Cart";


import Toast from "./components/Toast";
import Verify from "./pages/Verify";


const App = () => {
  return (
    <div className="px-4 sm:px-[-5vw] md:px-[7vw] lg:px-[9vw]">
      <Toast />

      <Navbar />

      <SearchBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customize" element={<Customize />} />

        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />

        {/* <Route path='/cart' element={<Cart/>} /> */}
        <Route path="/cart" element={<CartWithErrorBoundary />} />

        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
