import React, { useState, useEffect, useRef, useCallback } from 'react';
import './TotInterview.css';
import interviewData from '../../TestData/interviewData.json';
import axios from 'axios';

// 타이핑 효과
const TypingEffect = ({ text = '', speed, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
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

const TotInterview = ({ selectedType, selectedFeedback, userName }) => {
  const [timeLeft, setTimeLeft] = useState(1800);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const recognitionRef = useRef(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnswerCompleted, setIsAnswerCompleted] = useState(false);
  const [isFeedbackComplete, setIsFeedbackComplete] = useState(false);
  const [isQuestionTypingComplete, setIsQuestionTypingComplete] = useState(false);
  const [interviewHistory, setInterviewHistory] = useState([]);
  const containerRef = useRef(null);
  const frame5Ref = useRef(null);
  const latestQuestionRef = useRef(null);
  const [isInterviewEnded, setIsInterviewEnded] = useState(false);

  // 음성 인식 초기화(현재 사용하는 음성인식은 딜레이가 있음)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        setIsSpeaking(true);
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setUserAnswer(transcript);
      };

      recognitionRef.current.onend = () => {
        if (isRecording) {
          recognitionRef.current.start();
        }
      };
    }
  }, [isRecording]);

  // 질문 타이핑 완료 후 음성 인식 시작
  useEffect(() => {
    if (isQuestionTypingComplete && !isRecording && recognitionRef.current) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  }, [isQuestionTypingComplete, isRecording]);

  // 답변 완료 처리
  const handleCompleteAnswer = useCallback(() => {
    setIsRecording(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setTimeout(() => {
        setIsSpeaking(false);
        setIsAnswerCompleted(true);
      }, 500);
    }
  }, []);

  // 타이머 설정
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else {
      handleEndInterview(); // 시간이 0이 되면 handleEndInterview 실행
    }
  }, [timeLeft]);

  // 시간 포맷
  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}초`;
  }, []);

  const oneLetter = selectedType === '형식 없음' ? '없' : selectedType.charAt(0);

  // 답변 완료 후 다음 질문으로 이동
  useEffect(() => {
    if (isAnswerCompleted) {
      setInterviewHistory(prev => [
        ...prev,
        {
          question: interviewData[1]?.questions[currentQuestionIndex],
          answer: userAnswer,
        }
      ]);
      setCurrentQuestionIndex(prev => prev + 1);
      setTypingComplete(false);
      setUserAnswer('');
      setIsAnswerCompleted(false);
      setIsQuestionTypingComplete(false);
    }
  }, [isAnswerCompleted, currentQuestionIndex, userAnswer]);

  // 스크롤을 최하단으로 이동
  const scrollToBottom = useCallback(() => {
    if (containerRef.current && frame5Ref.current && latestQuestionRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const frame5Rect = frame5Ref.current.getBoundingClientRect();
      const questionRect = latestQuestionRef.current.getBoundingClientRect();
      
      const scrollTop = questionRect.top - containerRect.top - frame5Rect.height;
      
      containerRef.current.scrollTo({
        top: containerRef.current.scrollTop + scrollTop,
        behavior: 'smooth'
      });
    }
  }, []);

  // 새 질문이 추가될 때 스크롤 조정
  useEffect(() => {
    if (currentQuestionIndex > 0 && isFeedbackComplete) {
      setTimeout(scrollToBottom, 100);
    }
  }, [currentQuestionIndex, isFeedbackComplete, scrollToBottom]);

  // 현재 시간을 yyyy.mm.dd 00:00:00 형식으로 포맷하는 함수
  const getCurrentFormattedTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  };

  // 인터뷰 종료 처리
  const handleEndInterview = useCallback(async () => {
    setIsInterviewEnded(true);

    const interviewDetails = {
      userName,
      selectedType,
      selectedFeedback,
      interviewHistory,
      endTime: getCurrentFormattedTime(),
      currentQuestionIndex,
    };

    try {
      await axios.post('http://localhost:8080/api/interviews/save', interviewDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Mock interview details sent successfully');
    } catch (error) {
      console.error('Failed to send mock interview details', error);
    }

    // AI 피드백 제공
    if (currentQuestionIndex > 0) {
      setIsFeedbackComplete(true);
    }
  }, [userName, selectedType, selectedFeedback, interviewHistory, currentQuestionIndex]);

  // 인터뷰 히스토리 아이템 렌더링 함수
  const renderHistoryItem = useCallback((item, index) => (
    <div key={index} className="InterviewPlay-history-item">
      <div className="InterviewPlay-frame-2">
        <div className="InterviewPlay-frame-3">
          <div className="InterviewPlay-frame-4">
            <div className="InterviewPlay-text-wrapper">{oneLetter}</div>
          </div>
          <div className="InterviewPlay-text-wrapper-2">AI 면접관</div>
        </div>
        <p className="InterviewPlay-p">{item.question}</p>
      </div>
      <div className="InterviewPlay-frame-2">
        <div className="InterviewPlay-frame-3">
          <img
            className="InterviewPlay-account-circle"
            alt="Account circle"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/account-circle-1.svg"
          />
          <div className="InterviewPlay-text-wrapper-2">{userName}</div>
        </div>
        <p className="InterviewPlay-p">{item.answer}</p>
      </div>
      <img
        className="line-3"
        alt="Line"
        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/line-2.svg"
      />
    </div>
  ), [oneLetter, userName]);

  // 현재 질문 렌더링 함수
  const renderCurrentQuestion = useCallback(() => (
    <div 
      ref={latestQuestionRef}
      className={`InterviewPlay-frame-2 InterviewPlay-question-section ${
        currentQuestionIndex === 0 ? 'InterviewPlay-first-question' : ''
      }`}
    >
      <div className="InterviewPlay-frame-3">
        <div className="InterviewPlay-frame-4">
          <div className="InterviewPlay-text-wrapper">{oneLetter}</div>
        </div>
        <div className="InterviewPlay-text-wrapper-2">AI 면접관</div>
      </div>
      {!typingComplete ? (
        <TypingEffect 
          text={interviewData[1]?.questions[currentQuestionIndex]} 
          speed={100} 
          onComplete={() => {
            setTypingComplete(true);
            setIsQuestionTypingComplete(true);
          }} 
        />
      ) : (
        <p className="InterviewPlay-p">{interviewData[1]?.questions[currentQuestionIndex]}</p>
      )}
    </div>
  ), [currentQuestionIndex, oneLetter, typingComplete]);

  // 사용자 답변 렌더링 함수
  const renderUserAnswer = useCallback(() => (
    <div className="InterviewPlay-frame-2">
      <div className="InterviewPlay-frame-3">
        {isSpeaking && (
          <img
            className="InterviewPlay-ellipse"
            alt="Ellipse"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6690d46ff1077d330fbfb9e3/img/ellipse-1.svg"
          />
        )}
        <img
          className="InterviewPlay-account-circle"
          alt="Account circle"
          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/account-circle-1.svg"
        />
        <div className="InterviewPlay-text-wrapper-2">{userName}</div>
      </div>
      <p className="InterviewPlay-p">{userAnswer}</p>
      {!isAnswerCompleted ? (
        <button onClick={handleCompleteAnswer} className="InterviewPlay-complete">답변 완료</button>
      ) : (
        <img
          className="line-3"
          alt="Line"
          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/line-2.svg"
        />
      )}
    </div>
  ), [isSpeaking, userName, userAnswer, isAnswerCompleted, handleCompleteAnswer]);

  // 메인 렌더링
  return (
    <div className="InterviewPlay-overlap-group">
      <div className="InterviewPlay-frame" ref={containerRef}>
        <div className="InterviewPlay-div">
          {interviewHistory.map(renderHistoryItem)}
          {!isInterviewEnded && currentQuestionIndex < interviewData[1]?.questions.length && (
            <>
              {renderCurrentQuestion()}
              {typingComplete && renderUserAnswer()}
            </>
          )}
          {isInterviewEnded && isFeedbackComplete && (
            <div className="frame-72">
              <div className="frame-73">
                <div className="frame-75">
                  <div className="text-wrapper-59">3</div>
                </div>
                <div className="text-wrapper-57">치치폭폭 피드백 AI</div>
              </div>
              <p className="InterviewPlay-p">{interviewData[1]?.feedback}</p>
            </div>
          )}
        </div>
      </div>
      <div className="InterviewPlay-frame-5" ref={frame5Ref}>
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
                <div className="InterviewPlay-text-wrapper-5">{formatTime(timeLeft)}</div>
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
};

export default TotInterview;