import { useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import OTP from "./pages/OTP";
import Categories from "./pages/Categories";
import ForgotPass from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import PasswordOTP from "./pages/PasswordOtp";
import Sell from "./pages/Sell";
import MyPosts from "./pages/MyPosts";
import AllProducts from "./pages/AllProducts";
import BooksByGenre from "./pages/ProductsByGenre";
import Search from "./components/Search";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/OTP" element={<OTP />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/forgotPassword" element={<ForgotPass />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/passwordOtp" element={<PasswordOTP />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/myPosts" element={<MyPosts />} />
          <Route path="/allPosts" element={<AllProducts />} />
          <Route path="/allPosts/:genre" element={<BooksByGenre />} />
          <Route path="/Search" element={<Search />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
