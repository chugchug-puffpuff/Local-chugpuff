import React from 'react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom'

const NavBar = ({ authenticate, setAuthenticate }) => {
  const navigate = useNavigate()

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
    navigate('/aiinterview')
  }

  return (
    <div>
      <div className="NavBar-view-wrapper">
        <div className="NavBar-view">
          <div className="NavBar-element">
            {authenticate ? (
              <button className="NavBar-text-wrapper" onClick={() => { setAuthenticate(false); navigate('/'); }}>로그아웃</button>
            ) : (
              <>
                <button className="NavBar-text-wrapper" onClick={goToLogin}>로그인</button>
                <button className="NavBar-text-wrapper" onClick={goToSignUp}>회원가입</button>
              </>
            )}
          </div>
          <div className="NavBar-frame">
            <button className="NavBar-text-wrapper" onClick={goToAIInterview}>AI 모의면접</button>
            <div className="NavBar-text-wrapper">자기소개서 첨삭</div>
            <div className="NavBar-text-wrapper">취업공고</div>
            <div className="NavBar-text-wrapper">커뮤니티</div>
            <div className="NavBar-text-wrapper">캘린더</div>
          </div>
          <div className="NavBar-view-2">
            <button className="NavBar-view-3" onClick={goToMain}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar;