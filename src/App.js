import './App.css';
import MainPage from './MainPage/MainPage.js';
import LoginPage from './LoginPage/LoginPage.js';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PrivateRoute from './Route/PrivateRoute';

function App() {
  const[authenticate, setAuthenticate] = useState(false); //true면 로그인 false면 로그인x
  useEffect(() => {
    console.log("사용자의 로그인 상태는", authenticate);
  }, [authenticate]);
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage authenticate={authenticate} setAuthenticate={setAuthenticate} />} />
        <Route path="/login" element={<LoginPage setAuthenticate={setAuthenticate} authenticate={authenticate}/>} />
        <Route path="/aiinterview" element={<PrivateRoute authenticate={authenticate} setAuthenticate={setAuthenticate} />} />
      </Routes>
    </div>
  );
}

export default App;