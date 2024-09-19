import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import MainPage from './MainPage/MainPage.js';
import LoginPage from './LoginPage/LoginPage.js';
import SignUpPage from './SignUpPage/SignUpPage.js';
import MyPage from './MyPage/MyPage.js';
import PrivateRoute from './Route/PrivateRoute';
import ScrollToTop from './Route/ScrollToTop.js';
import AIInterviewPage from './AIInterviewPage/AIInterviewPage.js';
import AIInterviewExecution from './AIInterviewPage/AIInterviewStart.js';
import AIInterviewHistory from './AIInterviewPage/AIInterviewHistory.js';
import SelfIntroductionPage from './SelfIntroduction/SelfIntroductionPage.js';
import SeHistoryPage from './SelfIntroduction/SeHistoryPage.js';
import EditingPage from './SelfIntroduction/EditingPage.js';
import JobPostingMain from './JobPostingPage/JobPostingMain.js';
import RecruitInfoPage from './JobPostingPage/RecruitInfoPage.js';
import CommunityPage from './CommunityPage/CommunityPage.js';
import PostRegister from './CommunityPage/PostRegister.js';
import PostModify from './CommunityPage/PostModify.js';
import CommunityPost from './CommunityPage/CommunityPost.js';
import CalendarMain from './CalendarPage/CalendarMain.js';

function App() {
  const [authenticate, setAuthenticate] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('id');
    const storedUserName = localStorage.getItem('name');
    if (token && storedUserId && storedUserName) {
      setAuthenticate(true);
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        {authenticate && <Route path="/:userId" element={<MainPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />}
        <Route path="/login" element={<LoginPage setAuthenticate={setAuthenticate} authenticate={authenticate} setUserName={setUserName} userName={userName}/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/aiinterview" element={<PrivateRoute authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName}>
          <AIInterviewPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
        </PrivateRoute>} />
        <Route path="/aiinterview/start" element={<AIInterviewExecution authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        <Route path="/aiinterviewhistory/:interviewId" element={<AIInterviewHistory authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        <Route path="/selfintroduction" element={<PrivateRoute authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName}>
          <SelfIntroductionPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
        </PrivateRoute>} />
        <Route path="/editing-page" element={<EditingPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        <Route path="/selfintroductionhistory/:es_no" element={<SeHistoryPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        <Route path="/jobposting" element={<PrivateRoute authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName}>
          <JobPostingMain authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
        </PrivateRoute>} />
        <Route path="/recruitinfo/:jobId" element={<RecruitInfoPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        <Route path="/community" element={<PrivateRoute authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName}>
          <CommunityPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
        </PrivateRoute>} />
        <Route path="/postregister" element={<PostRegister authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        <Route path="/postmodify/:boardNo" element={<PostModify authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        <Route path="/communitypost/:boardNo" element={<CommunityPost authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
        <Route path="/calender" element={<PrivateRoute authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName}>
          <CalendarMain authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
        </PrivateRoute>} />
        <Route path="/myactivities/:component" element={<MyPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />} />
      </Routes>
    </div>
  );
}

export default App;