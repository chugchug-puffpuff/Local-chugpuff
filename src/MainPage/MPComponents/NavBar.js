import React from 'react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate()

  const goToMain = () => {
    navigate('/')
  }
  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <div>
      <div className="NavBar-view-wrapper">
        <div className="NavBar-view">
          <div className="NavBar-element">
            <button className="NavBar-text-wrapper" onClick={goToLogin}>로그인</button>
            <div className="NavBar-text-wrapper">회원가입</div>
          </div>
          <div className="NavBar-frame">
            <div className="NavBar-text-wrapper">AI 모의면접</div>
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