import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
// import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
// import AddProduct from "./components/AddProduct";

function App() {
  // let [isLoggedIn, setIsLoggedIn] = useState<boolean>(
  //   sessionStorage.getItem("isLoggedIn") === "true" ? true : false
  // );
  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { email: false, isAdmin: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );
  return (
    <div className="App ">
      <ToastContainer theme="dark" />
      <Router>
        <Navbar userInfo={userInfo} setUserInfo={setUserInfo} />
        <Routes>
          <Route path="/" element={<Login setUserInfo={setUserInfo} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products userInfo={userInfo} />} />
          {/* <Route path="/add-product" element={<AddProduct />} /> */}
          <Route
            path="/register"
            element={<Register setUserInfo={setUserInfo} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
