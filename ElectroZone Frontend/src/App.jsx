import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import User_Register from "./componants/User_Register";
import Seller_Login from "./componants/Seller_Login ";
import Seller_Register from "./componants/Seller_Register";
import User_Login from "./componants/User_Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Seller_Dashboard from "./pages/Seller_Dashboard";
import Admin_Dashboard from "./pages/Admin_Dashboard";
import AddAddress from "./componants/Add-Address";
import AddProduct from "./componants/Add-Product";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import WishListPage from "./pages/WishListPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import AboutUs from "./pages/AboutUs";
import AdminLogin from "./componants/AdminLogin";
import EditProfilePage from "./pages/EditProfilePage";
import AddressInfoPage from "./pages/AddressInfoPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Admin-Login" element={<AdminLogin />} />
        <Route path="/User-Register" element={<User_Register />} />
        <Route path="/User-Login" element={<User_Login />} />
        <Route path="/Seller-Register" element={<Seller_Register />} />
        <Route path="/Seller-Login" element={<Seller_Login />} />
        <Route path="/Seller-Dashboard" element={<Seller_Dashboard />} />
        <Route path="/Admin-Dashboard" element={<Admin_Dashboard />} />
        <Route path="/Products" element={<ProductPage />} />
        <Route path="/ProductDetails/:id" element={<ProductDetailsPage />} />
        <Route path="/category/:categoryId" element={<ProductPage />} />
        <Route path="/brand/:brandId" element={<ProductPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Add-Address" element={<AddAddress />} />
        <Route path="/Add-Product" element={<AddProduct />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/WishList" element={<WishListPage />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/Orders" element={<OrdersPage />} />
        <Route path="/EditProfile" element={<EditProfilePage />} />
        <Route path="/AddressInfo" element={<AddressInfoPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
