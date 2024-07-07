import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import MainPage from './MainPage/MainPage.js';
import LoginPage from './LoginPage/LoginPage.js';
import SignUpPage from './SignUpPage/SignUpPage.js';
import MyPage from './MyPage/MyPage.js';
import PrivateRoute from './Route/PrivateRoute';

function App() {
  const[authenticate, setAuthenticate] = useState(false); //true면 로그인 false면 로그인x
  const [userName, setUserName] = useState(''); // 사용자 이름 상태 추가

  useEffect(() => {
    console.log("로그인 여부", authenticate);
  }, [authenticate]);
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        <Route path="/login" element={<LoginPage setAuthenticate={setAuthenticate} authenticate={authenticate} setUserName={setUserName} userName={userName}/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/aiinterview" element={<PrivateRoute authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;