import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className="Login-content-wrapper">
      <div className="Login-content">
        <div className="Login-frame">
          <div className="Login-frame-wrapper">
            <div className="Login-frame">
              <div className="Login-text-field">
                <div className="Login-frame-2">
                  <div className="Login-label">이메일</div>
                </div>
                <div className="Login-text-field-2" />
              </div>
              <div className="Login-text-field">
                <div className="Login-frame-2">
                  <div className="Login-label">비밀번호</div>
                </div>
                <div className="Login-text-field-3">
                  <img
                    className="Login-visibility-off"
                    alt="Visibility off"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/667bde01f255dfa018f22f1a/img/visibility-off@2x.png"
                  />
                </div>
              </div>
            </div>
          </div>
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
          <div className="Login-frame-4">
            <div className="Login-sign-up">로그인</div>
          </div>
          <p className="Login-div">
            <span className="Login-text-wrapper">아직 치치폭폭 회원이 아니신가요? </span>
            <span className="Login-text-wrapper-2">회원가입</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login