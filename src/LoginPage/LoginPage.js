import React from "react";
import "./LoginPage.css";
import Login from "./LoginComponents/Login.js";
import LoginImage from "./LoginComponents/LoginImage.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const LoginPage = ({setAuthenticate}) => {
  return (
    <div className="LoginPage">
      <Login setAuthenticate={setAuthenticate} />
      <LoginImage />
      <NavBar />
    </div>
  );
};

export default LoginPage;