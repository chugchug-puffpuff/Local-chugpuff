import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ImmInterview.css';
import interviewData from '../../TestData/interviewData.json';

// 타이핑 효과
const TypingEffect = ({ text = '', speed, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayedText((prevTitleValue) => {
        let result = prevTitleValue + (text[count] || '');
        setCount((prevCount) => prevCount + 1);

        if (count >= text.length - 1) {
          clearInterval(intervalId);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 0);
        }
        return result;
      });
    }, speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [count, text, speed, onComplete]);

  return <div className="InterviewPlay-p">{displayedText}</div>;
};

const InterviewPlay = ({ selectedType, selectedFeedback, userName }) => {
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

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        setIsSpeaking(true);
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
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

  useEffect(() => {
    if (isQuestionTypingComplete && !isRecording && recognitionRef.current) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  }, [isQuestionTypingComplete, isRecording]);

  const handleCompleteAnswer = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsSpeaking(false);
    setIsAnswerCompleted(true);
  };

  useEffect(() => {
    if (timeLeft > 0 ) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}초`;
  };

  const oneLetter = selectedType === '형식 없음' ? '없' : selectedType.charAt(0);

  useEffect(() => {
    if (isFeedbackComplete) {
      setInterviewHistory(prevHistory => [
        ...prevHistory,
        {
          question: interviewData[0]?.questions[currentQuestionIndex],
          answer: userAnswer,
          feedback: interviewData[0]?.feedback[currentQuestionIndex]
        }
      ]);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTypingComplete(false);
      setUserAnswer('');
      setIsAnswerCompleted(false);
      setIsFeedbackComplete(false);
      setIsQuestionTypingComplete(false);
    }
  }, [isFeedbackComplete, currentQuestionIndex, userAnswer]);

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

  useEffect(() => {
    if (currentQuestionIndex > 0 && isFeedbackComplete) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [currentQuestionIndex, isFeedbackComplete, scrollToBottom]);

  const handleEndInterview = () => {
    setIsInterviewEnded(true);
    // 여기에 인터뷰 종료와 관련된 추가 로직을 넣을 수 있습니다.
    // 예: 음성 인식 중지, 결과 저장 등
  };

  return (
    <div className="InterviewPlay-overlap-group">
      <div className="InterviewPlay-frame" ref={containerRef}>
        <div className="InterviewPlay-div">
          {interviewHistory.map((item, index) => (
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
              <div className="frame-72">
                <div className="frame-73">
                  <div className="frame-75">
                    <div className="text-wrapper-59">3</div>
                  </div>
                  <div className="text-wrapper-57">치치폭폭 피드백 AI</div>
                </div>
                <p className="InterviewPlay-p">{item.feedback}</p>
              </div>
              <img
                className="line-3"
                alt="Line"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/line-2.svg"
              />
            </div>
          ))}
          {!isInterviewEnded && currentQuestionIndex < interviewData[0]?.questions.length && (
            <>
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
                {!typingComplete && (
                  <TypingEffect 
                    text={interviewData[0]?.questions[currentQuestionIndex]} 
                    speed={100} 
                    onComplete={() => {
                      setTypingComplete(true);
                      setIsQuestionTypingComplete(true);
                    }} 
                  />
                )}
                {typingComplete && (
                  <p className="InterviewPlay-p">{interviewData[0]?.questions[currentQuestionIndex]}</p>
                )}
              </div>
              {typingComplete && (
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
                    <>
                      <img
                        className="line-3"
                        alt="Line"
                        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/line-2.svg"
                      />
                      <div className="frame-72">
                        <div className="frame-73">
                          <div className="frame-75">
                            <div className="text-wrapper-59">3</div>
                          </div>
                          <div className="text-wrapper-57">치치폭폭 피드백 AI</div>
                        </div>
                        <TypingEffect 
                          text={interviewData[0]?.feedback[currentQuestionIndex]} 
                          speed={100} 
                          onComplete={() => {
                            setIsFeedbackComplete(true);
                          }} 
                        />
                      </div>
                      <img
                        className="line-3"
                        alt="Line"
                        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/line-2.svg"
                      />
                    </>
                  )}
                </div>
              )}
            </>
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
            <div className="text-wrapper-62">인터뷰가 종료되었습니다.</div>
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

export default InterviewPlay;