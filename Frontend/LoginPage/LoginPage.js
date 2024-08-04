import React from "react";
import "./LoginPage.css";
import Login from "./LoginComponents/Login.js";
import LoginImage from "./LoginComponents/LoginImage.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const LoginPage = ({setAuthenticate, authenticate, setUserName, userName }) => {
  return (
    <div className="LoginPage">
      <Login setAuthenticate={setAuthenticate} setUserName={setUserName} />
      <LoginImage />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default LoginPage;