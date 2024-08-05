import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './InterviewHistoryBar.css'
import axios from 'axios'

const InterviewHistoryBar = () => {
  const [sortedInterviewData, setSortedInterviewData] = useState([])
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [selectedInterviewId, setSelectedInterviewId] = useState(null)

  // 서버에서 면접 내역 가져오기
  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/interviews');
        const sortedDate = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setSortedInterviewData(sortedDate);
      } catch (error) {
        console.error('Failed to fetch interview data', error);
      }
    };

    fetchInterviewData();
  }, []);

  const navigate = useNavigate()

  const goToAIInterview = () => {
    navigate('/aiinterview')
  }

  const handleDeleteClick = (interviewId) => {
    setSelectedInterviewId(interviewId)
    setShowDeleteConfirmation(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/interviews/${selectedInterviewId}`) // 백엔드에 삭제 요청
      setSortedInterviewData(prevData => prevData.filter(data => data.id !== selectedInterviewId)) // 삭제된 데이터 필터링
      setShowDeleteConfirmation(false)
    } catch (error) {
      console.error(`Failed to delete interview with id: ${selectedInterviewId}`, error)
    }
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
          <div className="InterviewHistoryBar-frame-5" key={data.id}>
            <div className="InterviewHistoryBar-date-and-icons">
              <div className="InterviewHistoryBar-text-wrapper-3">{data.date}</div>
              <div className="InterviewHistoryBar-frame-13">
                <img
                  className="InterviewHistoryBar-delete"
                  alt="삭제"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6698aa612be89236643e00e3/img/delete-forever@2x.png"
                  onClick={() => handleDeleteClick(data.id)}
                />
              </div>
            </div>
            <div className="InterviewHistoryBar-frame-6">
              <p className="InterviewHistoryBar-text-wrapper-4">{data.interviewHistory[0].question}</p>
            </div>
          </div>
        ))}
        {showDeleteConfirmation && (
          <div>
            <div className="InterviewHistoryBar-frame-78"/>
            <div className="InterviewHistoryBar-frame-79">
              <div className="InterviewHistoryBar-frame-80">
                <div className="InterviewHistoryBar-text-wrapper-60">면접 내역 삭제</div>
                <p className="InterviewHistoryBar-text-wrapper-61">
                  삭제된 내역은 복구할 수 없습니다.<br />
                  삭제하시겠습니까?
                </p>
              </div>
              <div className="InterviewHistoryBar-frame-81">
                <div className="InterviewHistoryBar-frame-82" onClick={() => setShowDeleteConfirmation(false)}>
                  <div className="InterviewHistoryBar-text-wrapper-62">취소</div>
                </div>
                <div className="InterviewHistoryBar-frame-83" onClick={handleDeleteConfirm}>
                  <div className="InterviewHistoryBar-text-wrapper-63">삭제</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewHistoryBar