import React, { useState, useEffect, useCallback } from 'react';
import './ImmInterview.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// 타이핑 효과
const TypingEffect = ({ text = '', speed, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    // text가 변경될 때마다 상태 초기화
    setDisplayedText('');
    setCount(0);
  }, [text]);

  useEffect(() => {
    if (!text) return;

    if (count >= text.length) {
      onComplete?.();
      return;
    }

    const timeoutId = setTimeout(() => {
      setDisplayedText(prev => prev + text[count]);
      setCount(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timeoutId);
  }, [count, text, speed, onComplete]);

  return <div className="InterviewPlay-p">{displayedText}</div>;
};

const ImmInterview = ({ selectedType, selectedFeedback, userName }) => {
  const location = useLocation();
  const { aiinterviewNo } = location.state || {};

  const [isInterviewEnded, setIsInterviewEnded] = useState(false); // 인터뷰 종료 상태

  // 시간 포맷
  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}초`;
  }, []);

  // 모의면접 세션 초기화 및 첫 질문 생성
  const fetchFirstQuestion = async () => {
    try {
      const firstQuestionResponse = await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/start`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      const { question, ttsAudioUrl } = firstQuestionResponse.data;
      console.log('첫 질문:', firstQuestionResponse.data)
      
    } catch (error) {
      console.error('Failed to fetch first question', error);
    }
  }
  // 다음 질문 요청

  const fetchNextQuestion = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/next-question`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const { question, ttsAudioUrl } = response.data;
      console.log('Fetched question:', response.data); // 응답 질문 로그
    } catch (error) {
      console.error('다음 질문 요청 중 오류가 발생했습니다:', error);
    }
  };

  // 질문 타이핑이 완료되면 녹음 시작 
  const sendAnswerStartRequest = async () => {
    try {
      await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/answer-start`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('답변 시작 요청이 성공적으로 전송되었습니다.');
    } catch (error) {
      console.error('답변 시작 요청 중 오류가 발생했습니다:', error);
    }
  };

  // 답변 완료
  const handleCompleteAnswer = async () => {
    try {
      const completeResponse = await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/answer-complete?timestamp=${new Date().getTime()}`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Cache-Control': 'no-cache'  // 캐시 방지 헤더 추가
        }
      });
      const { captured_audio_url } = completeResponse.data;
      console.log('data:', completeResponse.data)
    } catch (error) {
      console.error('답변완료 중 오류가 발생했습니다:', error);
    }
  };

  const convertAnswer = async () => {
    // captured_audio_url을 사용하여 오디오 파일 가져오기
    // const response = await fetch(`/${captured_audio_url}`);
    const filePath = '/captured_audio.wav';
    const response = await fetch(filePath);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('audioFile', blob, 'captured_audio_20241014_005111.wav'); // Blob을 FormData에 추가
  
    // 전송할 데이터를 콘솔에 출력
    console.log('FormData to be sent:', formData);
    try {
      // 사용자의 답변을 변환하는 요청 보내기
      const convertResponse = await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/convert-answer`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const { answer } = convertResponse.data;
      console.log('answer', convertResponse.data)
    } catch (error) {
      console.error('답변 변환 중 오류가 발생했습니다:', error);
    }
  };

  const answerFeedback = async () => {
    try {
      // 피드백 생성 요청 보내기
      const feedbackResponse = await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/generate-feedback`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      const { feedback, ttsAudioUrl } = feedbackResponse.data;
      console.log('피드백:', feedbackResponse.data)
    } catch (error) {
      console.error('Failed to complete answer process', error);
    }
  };

  // 면접 종료
  const handleEndInterview = useCallback(async () => {
    try {
      await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/end`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('인터뷰 종료 요청이 성공적으로 전송되었습니다.');
      setIsInterviewEnded(true);
    } catch (error) {
      console.error('인터뷰 종료 요청 중 오류가 발생했습니다:', error);
    }
  }, [aiinterviewNo]);

  // 메인 렌더링
  return (
    <div className="InterviewPlay-overlap-group">
      <div className="InterviewPlay-frame">
        <div className="InterviewPlay-div">
          <button onClick={fetchFirstQuestion}>첫 질문 생성</button>
          <button onClick={sendAnswerStartRequest}>녹음 시작</button>
          <button onClick={handleCompleteAnswer}>녹음 완료-음성파일 받기</button>
          <button onClick={convertAnswer}>변환 요청</button>
          <button onClick={answerFeedback}>피드백 요청</button>
          <button onClick={fetchNextQuestion}>다음 질문 생성</button>
          <button onClick={handleEndInterview}>면접 종료</button>
        </div>
      </div>
      <div className="InterviewPlay-frame-5">
        <div className="InterviewPlay-div-2">
          <div className="InterviewPlay-frame-6">
            <img
              className="InterviewPlay-check"
              alt="Check"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/check.svg"
            />
            <div className="InterviewPlay-text-wrapper-3">{selectedType}</div>
          </div>
          <div className="InterviewPlay-frame-6">
            <img
              className="InterviewPlay-check"
              alt="Check"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/check-1.svg"
            />
            <div className="InterviewPlay-text-wrapper-3">{selectedFeedback}</div>
          </div>
        </div>
        {isInterviewEnded ? (
          <div className="frame-79">
            <div className="text-wrapper-62">면접이 종료되었습니다.</div>
          </div>
        ) : (
          <div className="InterviewPlay-frame-wrapper">
            <div className="InterviewPlay-frame-7">
              <div className="InterviewPlay-frame-8">
                <div className="InterviewPlay-text-wrapper-4">남은 시간</div>
                <div className="InterviewPlay-text-wrapper-5">00초</div>
              </div>
              <div className="InterviewPlay-div-2">
                <div className="InterviewPlay-view" onClick={handleEndInterview}>
                  <img
                    className="InterviewPlay-img"
                    alt="Stop circle"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6690d46ff1077d330fbfb9e3/img/stop-circle.svg"
                  />
                  <div className="InterviewPlay-text-wrapper-7">종료</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImmInterview;