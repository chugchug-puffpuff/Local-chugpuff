import React from 'react'
import './InterviewHistory.css'

const InterviewHistory = () => {
  return (
    <div className="InterviewHistory-frame">
        <div className="InterviewHistory-frame-2">
          <div className="InterviewHistory-frame-3">
            <div className="InterviewHistory-text-wrapper">새로운 면접</div>
            <img
              className="InterviewHistory-add"
              alt="면접 추가 아이콘"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668568acabd97e4e12fa0204/img/add@2x.png"
            />
          </div>
          <div className="InterviewHistory-text-wrapper-2">면접 내역</div>
        </div>
      </div>
  )
}

export default InterviewHistory