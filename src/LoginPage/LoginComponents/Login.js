import React from 'react'
import './Login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = ({setAuthenticate}) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  // 테스트하기 위한 임시 유저 정보
  const dummyUser = {
    name: '아무개',
    id: 'asdf',
    password: '1234'
  };

  const loginUser = (event) => {
    event.preventDefault(); // 기본 이벤트 방지
    if (userId === dummyUser.id && password === dummyUser.password) {
      setAuthenticate(true); // 로그인 성공 시 인증 상태를 true로 변경
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

  return (
    <Form onSubmit={(event)=>loginUser(event)} className="Login-content-wrapper">
      <div className="Login-content">
        <div className="Login-frame">
          <div className="Login-frame-wrapper">
            <div className="Login-frame">
              <div className="Login-text-field">
                <div className="Login-frame-2">
                  <div className="Login-label">아이디</div>
                </div>
                <Form.Control 
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
                <Form.Control
                  type="password"
                  className={`Login-text-field-2 ${isInvalid ? 'Login-text-field-invalid' : ''}`}
                  value={password}
                  onChange={handlePasswordChange}
                />
                  {/* <img
                    className="Login-visibility-off"
                    alt="Visibility off"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/667bde01f255dfa018f22f1a/img/visibility-off@2x.png"
                  /> */}
              </div>
            </div>
          </div>
          {isInvalid && <p className="Login-error-message">가입되어 있지 않은 계정이거나, 아이디 또는 비밀번호가 일치하지 않습니다.</p>}
          {/* <div className="Login-check-box">
            <img
              className="Login-check-box-2"
              alt="Check box"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/667bde01f255dfa018f22f1a/img/check-box.svg"
            />
            <div className="Login-i-want-to-receive">로그인 유지</div>
          </div> */}
        </div>
        <div className="Login-frame-3">
          <Button className="Login-frame-4" type="submit">
            <div className="Login-sign-up">로그인</div>
          </Button>
          <p className="Login-div">
            <span className="Login-text-wrapper">아직 치치폭폭 회원이 아니신가요? </span>
            <span className="Login-text-wrapper-2">회원가입</span>
          </p>
        </div>
      </div>
    </Form>
  )
}

export default Login