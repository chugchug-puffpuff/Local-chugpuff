import React from 'react';
import './Login.css';
import userData from '../../TestData/userData.json';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Login = ({ setAuthenticate, setUserName }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(userData);
  }, []);

  const loginUser = (event) => {
    event.preventDefault(); // 기본 이벤트 방지
    const user = users.find(user => user.id === userId && user.password === password);
    if (user) {
      setAuthenticate(true); // 로그인 성공 시 인증 상태를 true로 변경
      setUserName(user.name);
      navigate('/'); // 메인 페이지로 이동
    } else {
      setIsInvalid(true);
    }
  }

  const handleUserIdChange = (e) => { // 아이디 입력 시 경고문구 제거
    setUserId(e.target.value);
    setIsInvalid(false);
  };

  const handlePasswordChange = (e) => { // 비밀번호 입력 시 경고문구 제거
    setPassword(e.target.value);
    setIsInvalid(false);
  };

  const goToSignUp = () => {
    navigate('/signup')
  }

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
                  value={userId}
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
  )
}

export default Login;