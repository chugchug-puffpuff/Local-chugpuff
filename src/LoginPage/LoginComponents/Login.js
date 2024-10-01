import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthenticate, setUserName }) => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const loginUser = async (event) => {
    event.preventDefault(); // 기본 이벤트 방지
    try {  // 로그인 엔드포인트
      const response = await axios.post('http://localhost:8080/api/login', { id, password });
      const { token, name } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('id', id); // 사용자 ID를 로컬 스토리지에 저장
      localStorage.setItem('userName', name); // 사용자 이름을 로컬 스토리지에 저장
      localStorage.setItem('password', password); // 사용자 비밀번호를 로컬 스토리지에 저장
      
      // 사용자 정보를 가져오는 엔드포인트
      const userResponse = await axios.get(`http://localhost:8080/api/members/username/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { user_id, job, jobKeyword } = userResponse.data;
      localStorage.setItem('user_id', user_id); // user_id를 로컬 스토리지에 저장
      localStorage.setItem('job', job); // 직무를 로컬 스토리지에 저장
      localStorage.setItem('jobKeyword', jobKeyword); // 직무키워드를 로컬 스토리지에 저장

      // 알림 정보를 가져오는 엔드포인트
      const notificationsResponse = await axios.get('http://localhost:8080/api/calenders/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.setItem('notifications', JSON.stringify(notificationsResponse.data)); // 알림 데이터를 로컬 스토리지에 저장
      
      setAuthenticate(true); // 로그인 성공 시 인증 상태를 true로 변경
      setUserName(name);
      navigate(`/${id}`, { replace: true }); // 메인 페이지로 이동
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      setIsInvalid(true);
    }
  };

  // 아이디 입력 시 경고문구 제거
  const handleUserIdChange = (e) => {
    setId(e.target.value);
    setIsInvalid(false);
  };

  // 비밀번호 입력 시 경고문구 제거
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsInvalid(false);
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
      <form onSubmit={loginUser} className="Login-content-wrapper">
        <div className="Login-content">
          <div className="Login-frame">
            <div className="Login-frame-wrapper">
              <div className="Login-frame">
                <div className="Login-text-field">
                  <div className="Login-frame-2">
                    <div className="Login-label">아이디</div>
                  </div>
                  <input
                      type="text"
                      className={`Login-text-field-2 ${isInvalid ? 'Login-text-field-invalid' : ''}`}
                      value={id}
                      onChange={handleUserIdChange}
                  />
                </div>
                <div className="Login-text-field">
                  <div className="Login-frame-2">
                    <div className="Login-label">비밀번호</div>
                  </div>
                  <input
                      type="password"
                      className={`Login-text-field-2 ${isInvalid ? 'Login-text-field-invalid' : ''}`}
                      value={password}
                      onChange={handlePasswordChange}
                  />
                </div>
              </div>
            </div>
            {isInvalid && <p className="Login-error-message">가입되어 있지 않은 계정이거나, 아이디 또는 비밀번호가 일치하지 않습니다.</p>}
          </div>
          <div className="Login-frame-3">
            <button className="Login-frame-4" type="submit">
              <div className="Login-sign-up">로그인</div>
            </button>
            <p className="Login-div">
              <span className="Login-text-wrapper">아직 치치폭폭 회원이 아니신가요? </span>
              <button className="Login-text-wrapper-2" onClick={goToSignUp}>회원가입</button>
            </p>
          </div>
        </div>
      </form>
  );
};

export default Login;
