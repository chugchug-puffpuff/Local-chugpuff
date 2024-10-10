import React, { useState, useEffect } from 'react';
import './InterviewSelect.css';

const InterviewSelect = ({ setCanStartInterview, setSelectedType, setSelectedFeedback }) => {
  const [selectedType, setSelectedTypeState] = useState(null);
  const [selectedFeedback, setSelectedFeedbackState] = useState(null);

  const handleSelectType = (type) => {
    setSelectedTypeState(type);
    setSelectedType(type);
  };

  const handleSelectFeedback = (feedback) => {
    setSelectedFeedbackState(feedback);
    setSelectedFeedback(feedback);
  };

  useEffect(() => {
    if (selectedType && selectedFeedback) {
      setCanStartInterview(true);
    } else {
      setCanStartInterview(false);
    }
  }, [selectedType, selectedFeedback, setCanStartInterview]);

  return (
    <div className="InterviewSelect-frame">
      <div className="InterviewSelect-div">
        <div className="InterviewSelect-frame-2">
          <img
            className="InterviewSelect-img"
            alt="Forum"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668568acabd97e4e12fa0204/img/forum@2x.png"
          />
          <div className="InterviewSelect-text-wrapper">면접 유형</div>
        </div>
        <div className="InterviewSelect-frame-3">
          <div
            className={`InterviewSelect-frame-4 ${selectedType === '자기소개서 면접' ? 'selected' : ''}`}
            onClick={() => handleSelectType('자기소개서 면접')}
          >
            <div className="InterviewSelect-text-wrapper-2">자기소개서 면접</div>
          </div>
          <div
            className={`InterviewSelect-frame-4 ${selectedType === '인성 면접' ? 'selected' : ''}`}
            onClick={() => handleSelectType('인성 면접')}
          >
            <div className="InterviewSelect-text-wrapper-2">인성 면접</div>
          </div>
          <div
            className={`InterviewSelect-frame-4 ${selectedType === '직무 면접' ? 'selected' : ''}`}
            onClick={() => handleSelectType('직무 면접')}
          >
            <div className="InterviewSelect-text-wrapper-2">직무 면접</div>
          </div>
        </div>
      </div>
      <div className="InterviewSelect-frame-5">
        <div className="InterviewSelect-frame-2">
          <img
            className="InterviewSelect-img"
            alt="Business messages"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668568acabd97e4e12fa0204/img/business-messages@2x.png"
          />
          <div className="InterviewSelect-text-wrapper">피드백 방식</div>
        </div>
        <div className="InterviewSelect-frame-6">
          <div
            className={`InterviewSelect-frame-wrapper ${selectedFeedback === '즉시 피드백' ? 'selected' : ''}`}
            onClick={() => handleSelectFeedback('즉시 피드백')}
          >
            <div className="InterviewSelect-frame-7">
              <img
                className="InterviewSelect-img-2"
                alt="Border color"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668568acabd97e4e12fa0204/img/border-color@2x.png"
              />
              <div className="InterviewSelect-frame-8">
                <div className="InterviewSelect-text-wrapper-3">즉시 피드백</div>
                <p className="InterviewSelect-text-wrapper-4">
                  면접 질문에 대답을 한 후 <br />
                  즉시 피드백을 받습니다.
                </p>
              </div>
            </div>
          </div>
          <div
            className={`InterviewSelect-frame-wrapper ${selectedFeedback === '전체 피드백' ? 'selected' : ''}`}
            onClick={() => handleSelectFeedback('전체 피드백')}
          >
            <div className="InterviewSelect-frame-9">
              <img
                className="InterviewSelect-img-2"
                alt="Edit document"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668568acabd97e4e12fa0204/img/edit-document@2x.png"
              />
              <div className="InterviewSelect-frame-10">
                <div className="InterviewSelect-text-wrapper-3">전체 피드백</div>
                <div className="InterviewSelect-text-wrapper-4">
                  면접이 끝나고 전체적인
                  <br />
                  피드백을 받습니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSelect;