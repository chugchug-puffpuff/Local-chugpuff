import React from 'react';
import './InterviewButton.css';

const InterviewButton = ({ canStartInterview, startInterview }) => {  
  return (
    <div className="InterviewStart-frame">
      <div className="InterviewStart-div">
        <div className="InterviewStart-text-wrapper">치치폭폭 AI 모의면접 안내</div>
        <div className="InterviewStart-frame-2">
          <p className="InterviewStart-p">🗣️&nbsp;&nbsp;음성 면접으로 실제 면접처럼 몰입할 수 있도록 합니다.</p>
          <div className="InterviewStart-text-wrapper-2">⏰&nbsp;&nbsp;질의응답 시간은 최대 30분입니다.</div>
          <p className="InterviewStart-text-wrapper-3">✅&nbsp;&nbsp;면접 유형과 피드백 방식을 선택하고 면접을 시작합니다.</p>
          <p className="InterviewStart-text-wrapper-6">🖱️&nbsp;&nbsp;면접 시작 시 우측 버튼을 통해 면접을 진행합니다.</p>
        </div>
      </div>
      <div className="InterviewStart-frame-3">
        <div className={`InterviewStart-div-wrapper ${canStartInterview ? 'active' : ''}`} onClick={startInterview}>
          <div className="InterviewStart-text-wrapper-4">면접 시작하기</div>
        </div>
        <p className="InterviewStart-text-wrapper-5">면접 유형과 피드백 방식을 선택해주세요.</p>
      </div>
    </div>
  );
};

export default InterviewButton;