import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import MainPage from './MainPage/MainPage.js';
import LoginPage from './LoginPage/LoginPage.js';
import SignUpPage from './SignUpPage/SignUpPage.js';
import MyPage from './MyPage/MyPage.js';
import PrivateRoute from './Route/PrivateRoute';
import ScrollToTop from './Route/ScrollToTop.js';
import AIInterviewExecution from './AIInterviewPage/AIInterviewStart.js';

function App() {
  const [authenticate, setAuthenticate] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    console.log("로그인 여부", authenticate);
  }, [authenticate]);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        <Route path="/login" element={<LoginPage setAuthenticate={setAuthenticate} authenticate={authenticate} setUserName={setUserName} userName={userName}/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/aiinterview" element={<PrivateRoute authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        <Route path="/aiinterview/start" element={<AIInterviewExecution authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        <Route path="/myactivities" element={<MyPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        {authenticate && <Route path="/:userId" element={<MainPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />}
      </Routes>
    </div>
  );
}

export default App;