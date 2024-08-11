import React from 'react'
import './NavBar.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = ({ authenticate  }) => {
  const navigate = useNavigate()
  const [showUserInfo, setShowUserInfo] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (authenticate) {
      fetchUserName()
    }
  }, [authenticate])

  const fetchUserName = async () => {
    try {
      const token = localStorage.getItem('token'); // 토큰 가져오기
      const userId = localStorage.getItem('id'); // 사용자 ID 가져오기

      if (!userId) {
        throw new Error('User ID not found in local storage');
      }

      const response = await fetch(`http://localhost:8080/api/members/username/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}` // 토큰을 헤더에 포함
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserName(data.name);
    } catch (error) {
      console.error('Failed to fetch user name:', error);
    }
  }

  const goToMain = () => {
    navigate('/')
  }
  const goToLogin = () => {
    navigate('/login')
  }
  const goToSignUp = () => {
    navigate('/signup')
  }
  const goToAIInterview = () => {
    if (authenticate) {
      navigate('/aiinterview');
    } else {
      navigate('/login', { state: { from: '/aiinterview' } });
    }
  }
  const goToSelfIntroduction = () => {
    if (authenticate) {
      navigate('/selfintroduction');
    } else {
      navigate('/login', { state: { from: '/selfintroduction' } });
    }
  };
  const goToMyActivities = () => {
    navigate('/myactivities')
  }

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo)
  }

  return (
      <div>
        <div className="NavBar-view-wrapper">
          <div className="NavBar-view">
            <div className="NavBar-element">
              {authenticate ? (
                  <div className="NavBar-div">
                    <button className="NavBar-frame" onClick={toggleUserInfo}>
                      <p className="NavBar-div-2">
                        <span className="NavBar-span">{userName}</span>
                        <span className="NavBar-text-wrapper"> 님</span>
                      </p>
                      <img
                          className="NavBar-arrow-drop"
                          alt={showUserInfo ? "Arrow drop up" : "Arrow drop down"}
                          src={showUserInfo ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccfaca48cce45c95d9d30/img/arrow-drop-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/arrow-drop-down@2x.png"}
                      />
                    </button>
                    {showUserInfo && (
                        <div className="NavBar-view-2">
                          <div className="NavBar-text-wrapper-3">내 정보 변경</div>
                          <div className="NavBar-text-wrapper-3">스크랩한 공고</div>
                          <div className="NavBar-text-wrapper-3" onClick={goToMyActivities}>내가 작성한 게시물</div>
                          <div className="NavBar-text-wrapper-3">내가 작성한 댓글</div>
                          <div className="NavBar-text-wrapper-3">좋아요 누른 게시물</div>
                        </div>
                    )}
                    <img
                        className="NavBar-notifications"
                        alt="Notifications"
                        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/notifications@2x.png"
                    />
                  </div>
              ) : (
                  <>
                    <button className="NavBar-text-wrapper-4" onClick={goToLogin}>로그인</button>
                    <button className="NavBar-text-wrapper-4" onClick={goToSignUp}>회원가입</button>
                  </>
              )}
            </div>
            <div className="NavBar-frame-2">
              <button className="NavBar-text-wrapper-4" onClick={goToAIInterview}>AI 모의면접</button>
              <button className="NavBar-text-wrapper-4" onClick={goToSelfIntroduction}>자기소개서 첨삭</button>
              <div className="NavBar-text-wrapper-4">취업공고</div>
              <div className="NavBar-text-wrapper-4">커뮤니티</div>
              <div className="NavBar-text-wrapper-4">캘린더</div>
            </div>
            <div className="NavBar-view-3">
              <button className="NavBar-view-4" onClick={goToMain}/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default NavBar;