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
  const [isPaused, setIsPaused] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const recognitionRef = useRef(null);
  const silenceTimeoutRef = useRef(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        clearTimeout(silenceTimeoutRef.current);
        setIsSpeaking(true);
        silenceTimeoutRef.current = setTimeout(() => {
          recognitionRef.current.stop();
          setIsSpeaking(false);
        }, 5000);

        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setUserAnswer(transcript);
      };

      recognitionRef.current.onend = () => {
        if (!isPaused) {
          recognitionRef.current.start();
        }
      };
    }
  }, [isPaused]);

  useEffect(() => {
    if (typingComplete && recognitionRef.current) {
      recognitionRef.current.start();
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [typingComplete]);

  useEffect(() => {
    if (timeLeft > 0 && !isPaused) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft, isPaused]);

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
              <div className="InterviewPlay-view" onClick={() => setIsPaused(!isPaused)}>
                <img
                  className="InterviewPlay-img"
                  alt="Pause circle"
                  src={isPaused ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66962e4acda28174913bd1a3/img/play-circle.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6690d46ff1077d330fbfb9e3/img/pause-circle.svg"}
                />
                <div className="InterviewPlay-text-wrapper-6">{isPaused ? '다시시작' : '일시중지'}</div>
              </div>
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