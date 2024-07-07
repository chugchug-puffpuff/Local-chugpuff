import React from 'react'
import './SignUpPage.css'
import NavBar from '../MainPage/MainComponent/NavBar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignUpPage = ({ authenticate, setAuthenticate }) => {
  return (
    <div className="a">
      <div className="sign-up">
        <div className="content">
          <div className="frame">
            <div className="div">
              <div className="frame-2">
                <div className="text-field">
                  <div className="label-wrapper">
                    <div className="label">이름(실명)</div>
                  </div>
                  <div className="text-field-2" />
                </div>
                <div className="text-field">
                  <div className="label-wrapper">
                    <div className="label">아이디</div>
                  </div>
                  <div className="frame-3">
                    <div className="text-field-3" />
                    <div className="div-wrapper">
                      <div className="text-wrapper">중복 확인</div>
                    </div>
                  </div>
                </div>
                <div className="text-field">
                  <div className="label-wrapper">
                    <div className="label">비밀번호</div>
                  </div>
                  <div className="text-field-2" />
                </div>
              </div>
              <img
                className="line"
                alt="Line"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/line-2.svg"
              />
              <div className="text-field">
                <div className="frame-4">
                  <div className="text-field-wrapper">
                    <div className="text-field-4">
                      <div className="label-2">희망 직무</div>
                      <img
                        className="arrow-drop-down"
                        alt="Arrow drop down"
                        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/arrow-drop-down@2x.png"
                      />
                    </div>
                  </div>
                  <div className="text-field-wrapper">
                    <div className="text-field-4">
                      <div className="label-2">직무 키워드</div>
                      <img
                        className="arrow-drop-down"
                        alt="Arrow drop down"
                        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/arrow-drop-down-1@2x.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <img
                className="line"
                alt="Line"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/line-3.svg"
              />
              <div className="frame-2">
                <div className="text-field">
                  <div className="label-wrapper">
                    <div className="label">이메일 인증</div>
                  </div>
                  <div className="frame-3">
                    <div className="text-field-5" />
                    <div className="div-wrapper">
                      <div className="text-wrapper">인증번호 전송</div>
                    </div>
                  </div>
                </div>
                <div className="text-field">
                  <div className="label-wrapper">
                    <div className="label">인증번호 입력</div>
                  </div>
                  <div className="frame-3">
                    <div className="text-field-5" />
                    <div className="div-wrapper">
                      <div className="text-wrapper">확인</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-5">
              <div className="check-box">
                <p className="p">
                  <span className="span">[필수]</span>
                  <span className="text-wrapper-2"> 만 15세 이상입니다</span>
                </p>
                <img
                  className="img"
                  alt="Check box"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/check-box.svg"
                />
              </div>
              <div className="check-box">
                <p className="p">
                  <span className="span">[필수]</span>
                  <span className="text-wrapper-2"> 이용약관 동의</span>
                </p>
                <img
                  className="img"
                  alt="Check box"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/check-box-1.svg"
                />
              </div>
              <div className="check-box">
                <p className="p">
                  <span className="span">[필수]</span>
                  <span className="text-wrapper-2"> 개인정보 수집 및 이용 동의</span>
                </p>
                <img
                  className="img"
                  alt="Check box"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/check-box-2.svg"
                />
              </div>
              <div className="check-box">
                <p className="p">
                  <span className="span">[필수]</span>
                  <span className="text-wrapper-2"> AI모의면접 진행 시 귀하의 목소리가 녹음됩니다.</span>
                </p>
                <img
                  className="img"
                  alt="Check box"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/check-box-3.svg"
                />
              </div>
            </div>
          </div>
          <div className="frame-6">
            <div className="frame-7">
              <div className="text-wrapper-3">회원가입</div>
            </div>
            <p className="div-2">
              <span className="text-wrapper-2">이미 가입된 회원이신가요? </span>
              <span className="text-wrapper-4">로그인</span>
            </p>
          </div>
        </div>
      </div>
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} />
    </div>
  );
};

export default SignUpPage