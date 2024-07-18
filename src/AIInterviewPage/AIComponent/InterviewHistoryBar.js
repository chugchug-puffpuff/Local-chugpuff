import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import interviewData from '../../TestData/interviewData.json'
import './InterviewHistoryBar.css'

const InterviewHistoryBar = ({ setShowDeleteConfirmation }) => {
  const [sortedInterviewData, setSortedInterviewData] = useState([])

  useEffect(() => { // 최근 내역 순으로 정렬 
    const sortedDate = interviewData.sort((a, b) => new Date(b.date) - new Date(a.date))
    setSortedInterviewData(sortedDate)
  }, [])

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
        {sortedInterviewData.map(data => (
          <div className="InterviewHistoryBar-frame-5">
            <div className="InterviewHistoryBar-date-and-icons">
              <div className="InterviewHistoryBar-text-wrapper-3">{data.date}</div>
              <div className="InterviewHistoryBar-frame-13">
                {/* <img
                  className="InterviewHistoryBar-edit"
                  alt="편집"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6698aa612be89236643e00e3/img/edit@2x.png"
                /> */}
                <img
                  className="InterviewHistoryBar-delete"
                  alt="삭제"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6698aa612be89236643e00e3/img/delete-forever@2x.png"
                  onClick={() => setShowDeleteConfirmation(true)}
                />
              </div>
            </div>
            <div className="InterviewHistoryBar-frame-6">
              <p className="InterviewHistoryBar-text-wrapper-4">{data.questions[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InterviewHistoryBar