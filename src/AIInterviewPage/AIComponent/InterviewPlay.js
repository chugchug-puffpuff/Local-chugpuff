import React, { useState, useEffect } from 'react';
import './InterviewPlay.css';

const InterviewPlay = ({ selectedType, selectedFeedback, userName }) => {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);

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
            <p className="InterviewPlay-p">회사 문화와 가치관이 자신의 것과 다를 경우 어떻게 대처하시겠습니까?</p>
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
            <p className="InterviewPlay-p">
              회사의 문화와 가치관을 이해하고자 노력하겠습니다. 이를 통해 차이점을 파악하고 서로의 입장을 이해하려 할
              것입니다. 회사 문화와 가치관이 자신의 것과 다르더라도, 유연한 자세로 적응하고자 노력하겠습니다. 다만
              근본적인 가치관의 차이가 크다면 솔직하게 의견을 개진하고 서로의 입장을 존중하며 협력하는 방향을
              모색하겠습니다.
            </p>
          </div>
        </div>
        <div className="InterviewPlay-div">
          <div className="InterviewPlay-frame-2">
            <div className="InterviewPlay-frame-3">
              <div className="InterviewPlay-frame-4">
                <div className="InterviewPlay-text-wrapper">{oneLetter}</div>
              </div>
              <div className="InterviewPlay-text-wrapper-2">AI 면접관</div>
            </div>
            <p className="InterviewPlay-p">회사 문화와 가치관이 자신의 것과 다를 경우 어떻게 대처하시겠습니까?</p>
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
            <p className="InterviewPlay-p">
              회사의 문화와 가치관을 이해하고자 노력하겠습니다. 이를 통해 차이점을 파악하고 서로의 입장을 이해하려 할
              것입니다. 회사 문화와 가치관이 자신의 것과 다르더라도, 유연한 자세로 적응하고자 노력하겠습니다. 다만
              근본적인 가치관의 차이가 크다면 솔직하게 의견을 개진하고 서로의 입장을 존중하며 협력하는 방향을
              모색하겠습니다.
            </p>
          </div>
        </div>
        <div className="InterviewPlay-div">
          <div className="InterviewPlay-frame-2">
            <div className="InterviewPlay-frame-3">
              <div className="InterviewPlay-frame-4">
                <div className="InterviewPlay-text-wrapper">{oneLetter}</div>
              </div>
              <div className="InterviewPlay-text-wrapper-2">AI 면접관</div>
            </div>
            <p className="InterviewPlay-p">회사 문화와 가치관이 자신의 것과 다를 경우 어떻게 대처하시겠습니까?</p>
          </div>
          <div className="InterviewPlay-frame-2">
            <div className="InterviewPlay-frame-3">
              <div className="InterviewPlay-image-wrapper">
                <img
                  className="InterviewPlay-account-circle"
                  alt="Account circle"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/account-circle-1.svg"
                />
                <img
                  className="InterviewPlay-ellipse"
                  alt="Ellipse"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6690d46ff1077d330fbfb9e3/img/ellipse-1.svg"
                />
              </div>
              <div className="InterviewPlay-text-wrapper-2">{userName}</div>
            </div>
            <p className="InterviewPlay-p">
              회사의 문화와 가치관을 이해하고자 노력하겠습니다. 이를 통해 차이점을 파악하고 서로의 입장을 이해하려 할
              것입니다. 회사 문화와 가치관이 자신의 것과 다르더라도, 유연한 자세로 적응하고자
            </p>
          </div>
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