import React, { useState, useEffect, useRef } from 'react';
import './InterviewPlay.css';
import interviewData from '../../TestData/interviewData.json';

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
            if (onComplete) onComplete(); // setTimeout을 사용하여 상태 업데이트를 지연시킴
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
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [typingComplete, setTypingComplete] = useState(false);
  const recognitionRef = useRef(null);
  const speechTimeoutRef = useRef(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnswerCompleted, setIsAnswerCompleted] = useState(false);

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

        // 음성이 감지될 때마다 isSpeaking을 true로 설정하고 타이머를 재설정
        setIsSpeaking(true);
        if (speechTimeoutRef.current) {
          clearTimeout(speechTimeoutRef.current);
        }
        speechTimeoutRef.current = setTimeout(() => {
          setIsSpeaking(false);
        }, 1000); // 1초 동안 음성이 감지되지 않으면 isSpeaking을 false로 설정
      };

      recognitionRef.current.onend = () => {
        if (isRecording) {
          recognitionRef.current.start();
        }
      };
    }

    return () => {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
    };
  }, [isRecording]);

  useEffect(() => {
    if (typingComplete && recognitionRef.current) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [typingComplete]);

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

  let oneLetter;
  if (selectedType === '형식 없음') {
    oneLetter = '없';
  } else if (selectedType) {
    oneLetter = selectedType.charAt(0);
  } else {
    oneLetter = '';
  }

  return (
    <div className="InterviewPlay-overlap-group">
      <div className="InterviewPlay-frame">
        <div className="InterviewPlay-div">
          <div className="InterviewPlay-frame-2">
            <div className="InterviewPlay-frame-3">
              <div className="InterviewPlay-frame-4">
                <div className="InterviewPlay-text-wrapper">{oneLetter}</div>
              </div>
              <div className="InterviewPlay-text-wrapper-2">AI 면접관</div>
            </div>
            <TypingEffect text={interviewData[0]?.questions[0]} speed={100} onComplete={() => setTypingComplete(true)} />
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
                    <TypingEffect text={interviewData[0]?.feedback[0]} speed={100} onComplete={() => setTypingComplete(true)} />
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
        <div className="InterviewPlay-frame-wrapper">
          <div className="InterviewPlay-frame-7">
            <div className="InterviewPlay-frame-8">
              <div className="InterviewPlay-text-wrapper-4">남은 시간</div>
              <div className="InterviewPlay-text-wrapper-5">{formatTime(timeLeft)}</div>
            </div>
            <div className="InterviewPlay-div-2">
              <div className="InterviewPlay-view">
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
      </div>
    </div>
  );
};

export default InterviewPlay;