import React from "react";
import "./LoginPage.css";
import Login from "./LoginComponents/Login.js";
import LoginImage from "./LoginComponents/LoginImage.js";
import NavBar from "../MainPage/MPComponents/NavBar.js";

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <Login />
      <LoginImage />
      <NavBar />
    </div>
  );
};

export default LoginPage;