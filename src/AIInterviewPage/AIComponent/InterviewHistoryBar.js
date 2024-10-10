import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InterviewHistoryBar.css';
import axios from 'axios';

// 날짜 형식을 0000-00-00 00:00:00으로 변환
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const datePart = date.toISOString().split('T')[0];
  const timePart = date.toTimeString().split(' ')[0];

  return `${datePart} ${timePart}`;
};

const InterviewHistoryBar = () => {
  const [sortedInterviewData, setSortedInterviewData] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedInterviewId, setSelectedInterviewId] = useState(null);
  const [questions, setQuestions] = useState({});

  // 서버에서 면접 내역 가져오기
  const fetchInterviewData = async () => {
    const id = localStorage.getItem('id');
    try {
      const response = await axios.get(`http://localhost:8080/api/aiinterview/id/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const sortedDate = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setSortedInterviewData(sortedDate);

      // 각 인터뷰에 대한 질문 가져오기
      sortedDate.forEach(async (interview) => {
        const interviewResponse = await axios.get(`http://localhost:8080/api/aiinterview/${interview.aiinterviewNo}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const interviewData = interviewResponse.data;
        const question = interviewData.immediateFeedbacks.length > 0
          ? interviewData.immediateFeedbacks[0].i_question
          : interviewData.overallFeedbacks.length > 0
          ? interviewData.overallFeedbacks[0].f_question
          : 'No question available';
        setQuestions(prev => ({ ...prev, [interview.aiinterviewNo]: question }));
      });
    } catch (error) {
      console.error('Failed to fetch interview data', error);
    }
  };

  useEffect(() => {
    fetchInterviewData();
  }, []);

  const navigate = useNavigate();

  const goToAIInterview = () => {
    navigate('/aiinterview');
  };

  const handleDeleteClick = (interviewId) => {
    setSelectedInterviewId(interviewId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/aiinterview/${selectedInterviewId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setShowDeleteConfirmation(false);
      fetchInterviewData(); // 삭제 후 데이터 새로 고침
    } catch (error) {
      console.error(`Failed to delete interview with id: ${selectedInterviewId}`, error);
    }
  };

  const goToAIInterviewHistory = (interviewId) => {
    navigate(`/aiinterviewhistory/${interviewId}`, { state: { interviewId } });
  };

  return (
    <div className="InterviewHistoryBar-frame">
      <div className="InterviewHistoryBar-frame-2">
        <div className="InterviewHistoryBar-frame-3">
          <div className="InterviewHistoryBar-frame-4" onClick={goToAIInterview}>
            <div className="InterviewHistoryBar-text-wrapper">새로운 면접</div>
            <img
              className="InterviewHistoryBar-add"
              alt="Add"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/add@2x.png"
            />
          </div>
          <div className="InterviewHistoryBar-text-wrapper-2">면접 내역</div>
        </div>
        <div className="InterviewHistoryBar-list">
          {sortedInterviewData.map(data => (
            <div className="InterviewHistoryBar-frame-5" key={data.aiinterviewNo}>
              <div className="InterviewHistoryBar-date-and-icons">
                <div className="InterviewHistoryBar-text-wrapper-3">{formatDate(data.aiInterviewDate)}</div>
                <div className="InterviewHistoryBar-frame-13">
                  <img
                    className="InterviewHistoryBar-delete"
                    alt="삭제"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6698aa612be89236643e00e3/img/delete-forever@2x.png"
                    onClick={() => handleDeleteClick(data.aiinterviewNo)}
                  />
                </div>
              </div>
              <div className="InterviewHistoryBar-frame-6" onClick={() => goToAIInterviewHistory(data.aiinterviewNo)}>
                <p className="InterviewHistoryBar-text-wrapper-4">
                  {questions[data.aiinterviewNo] || data.interviewType}
                </p>
              </div>
            </div>
          ))}
        </div>
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
  );
};

export default InterviewHistoryBar;