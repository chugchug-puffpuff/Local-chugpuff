import React from 'react'
import { useNavigate } from 'react-router-dom'
import './InterviewHistoryBar.css'

const InterviewHistoryBar = () => {
  const navigate = useNavigate()
  const goToAIInterview = () => {
    navigate('/aiinterview')
  }

  return (
    <div className="InterviewHistoryBar-frame">
      <div className="InterviewHistoryBar-frame-2">
        <div className="InterviewHistoryBar-frame-3">
          <div className="InterviewHistoryBar-frame-4">
            <div className="InterviewHistoryBar-text-wrapper" onClick={goToAIInterview}>새로운 면접</div>
            <img
              className="InterviewHistoryBar-add"
              alt="Add"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/add@2x.png"
            />
          </div>
          <div className="InterviewHistoryBar-text-wrapper-2">면접 내역</div>
        </div>
        <div className="InterviewHistoryBar-frame-5">
          <div className="InterviewHistoryBar-text-wrapper-3">2024.05.07</div>
          <div className="InterviewHistoryBar-frame-6">
            <p className="InterviewHistoryBar-text-wrapper-4">자신이 가진 열정을 발휘하여 성취감을</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterviewHistoryBar