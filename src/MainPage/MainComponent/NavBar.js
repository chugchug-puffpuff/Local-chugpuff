import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';
import arrow_drop_down_icon from '../../Icon/arrow_drop_down.png';
import arrow_drop_up_icon from '../../Icon/arrow_drop_up.png';
import notification_icon from '../../Icon/notification.png';

const NavBar = ({ authenticate, setAuthenticate }) => {
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [userName, setUserName] = useState('');
  const [alarmModal, setAlarmModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

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
  };

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8080/api/calenders/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const notificationsData = response.data;
      localStorage.setItem('notifications', JSON.stringify(notificationsData));
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0) - now;

      setTimeout(() => {
        localStorage.setItem('notifications', JSON.stringify([])); // 초기화
        fetchNotifications().then(() => {
          const updatedNotifications = JSON.parse(localStorage.getItem('notifications'));
          setNotifications(updatedNotifications);
        });
        setInterval(() => {
          localStorage.setItem('notifications', JSON.stringify([])); // 초기화
          fetchNotifications().then(() => {
            const updatedNotifications = JSON.parse(localStorage.getItem('notifications'));
            setNotifications(updatedNotifications);
          });
        }, 24 * 60 * 60 * 1000); // 24시간마다 실행
      }, msUntilMidnight);
    };

    if (authenticate) {
      fetchUserName();
      fetchNotifications();
      checkMidnight();
    }
  }, [authenticate]);

  const goToMain = () => {
    navigate('/');
  };
  const goToLogin = () => {
    navigate('/login');
  };
  const goToSignUp = () => {
    navigate('/signup');
  };
  const goToAIInterview = () => {
    if (authenticate) {
      navigate('/aiinterview');
    } else {
      navigate('/login', { state: { from: '/aiinterview' } });
    }
  };
  const goToSelfIntroduction = () => {
    if (authenticate) {
      navigate('/selfintroduction');
    } else {
      navigate('/login', { state: { from: '/selfintroduction' } });
    }
  };
  const goToJobPosting = () => {
    if (authenticate) {
      navigate('/jobposting');
    } else {
      navigate('/login', { state: { from: '/jobposting' } });
    }
  };
  const goToCommunity = () => {
    if (authenticate) {
      navigate('/community');
    } else {
      navigate('/login', { state: { from: '/community' } });
    }
  };
  const goToCalendar = () => {
    if (authenticate) {
      navigate('/calender');
    } else {
      navigate('/login', { state: { from: '/calender' } });
    }
  };
  const goToMyActivities = (component) => {
    navigate(`/myactivities/${component}`);
    setShowUserInfo(false);
  };

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
    setAlarmModal(false); // 알람 창이 떠있으면 닫기
  };

  const toggleAlarmInfo = () => {
    if (notifications.length > 0) { // 마감 하루전인 공고가 있을때만 활성화
      setAlarmModal(!alarmModal);
    }
    setShowUserInfo(false); // 정보 창이 떠있으면 닫기
  };

  const handleLogout = async () => {
    try {
      // JWT 토큰 삭제
      localStorage.removeItem("token");
      setAuthenticate(false);
      window.location.href = "/"; // 메인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

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
                    src={showUserInfo ? arrow_drop_up_icon : arrow_drop_down_icon}
                  />
                </button>
                {showUserInfo && (
                  <div className="NavBar-view-2">
                    <div className="NavBar-text-wrapper-3" onClick={() => goToMyActivities('editInformation')}>내 정보 변경</div>
                    <div className="NavBar-text-wrapper-3" onClick={() => goToMyActivities('myScrap')}>스크랩한 공고</div>
                    <div className="NavBar-text-wrapper-3" onClick={() => goToMyActivities('myBoard')}>내가 작성한 게시물</div>
                    <div className="NavBar-text-wrapper-3" onClick={() => goToMyActivities('myComment')}>내가 작성한 댓글</div>
                    <div className="NavBar-text-wrapper-3" onClick={() => goToMyActivities('myLiked')}>좋아요 누른 게시물</div>
                    <div className="NavBar-text-wrapper-3" onClick={handleLogout}>로그아웃</div>
                  </div>
                )}
                <img
                  className="NavBar-notifications"
                  alt="Notifications"
                  src={notification_icon}
                  onClick={toggleAlarmInfo}
                />
                {notifications.length > 0 && <div className="NavBar-notification-badge"/>}
                {alarmModal && (
                  <div className="NavBar-view-5">
                    <div className="NavBar-text-wrapper-16">알람</div>
                    {notifications.map((notification, index) => (
                      <div key={index} className="NavBar-frame-34">
                        <div className="NavBar-text-wrapper-16">일정 하루 전입니다.</div>
                        <p className="NavBar-text-wrapper-17">{notification}</p>
                        {index < notifications.length - 1 && ( 
                          <img
                            className="NavBar-line-4"
                            alt="Line"
                            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2e3b54cbc5fc1778d008d/img/line-20@2x.png"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="NavBar-text-wrapper-4" onClick={goToLogin}>로그인</button>
                <button className="NavBar-text-wrapper-4" onClick={goToSignUp}>회원가입</button>
              </>
            )}
          </div>
          <div className="NavBar-frame-2">
            <div className="NavBar-text-wrapper-4" onClick={goToAIInterview}>AI 모의면접</div>
            <div className="NavBar-text-wrapper-4" onClick={goToSelfIntroduction}>자기소개서 첨삭</div>
            <div className="NavBar-text-wrapper-4" onClick={goToJobPosting}>취업공고</div>
            <div className="NavBar-text-wrapper-4" onClick={goToCommunity}>커뮤니티</div>
            <div className="NavBar-text-wrapper-4" onClick={goToCalendar}>캘린더</div>
          </div>
          <div className="NavBar-view-3">
            <button className="NavBar-view-4" onClick={goToMain}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;