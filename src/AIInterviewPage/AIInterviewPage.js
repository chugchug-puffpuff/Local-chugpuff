import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AIInterviewPage.css";
import InterviewHistoryBar from "./AIComponent/InterviewHistoryBar.js";
import InterviewButton from "./AIComponent/InterviewButton.js";
import InterviewSelect from "./AIComponent/InterviewSelect.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const AIInterviewPage = ({ authenticate, setAuthenticate, userName }) => {
  const [canStartInterview, setCanStartInterview] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <div className="AIInterviewPage">
      <div className="AIInterviewPage-view">
        <InterviewButton
          canStartInterview={canStartInterview}
          startInterview={() => navigate('/aiinterview/start', { state: { selectedType, selectedFeedback } })}
        />
        <InterviewSelect
          setCanStartInterview={setCanStartInterview}
          setSelectedType={setSelectedType}
          setSelectedFeedback={setSelectedFeedback}
        />
      </div>
      <InterviewHistoryBar setShowDeleteConfirmation={setShowDeleteConfirmation} />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
      {showDeleteConfirmation && (
        <div>
          <div className="AIInterviewPage-frame-78" />
          <div className="AIInterviewPage-frame-79">
            <div className="AIInterviewPage-frame-80">
              <div className="AIInterviewPage-text-wrapper-60">면접 내역 삭제</div>
              <p className="AIInterviewPage-text-wrapper-61">
                삭제된 내역은 복구할 수 없습니다.
                <br />
                삭제하시겠습니까?
              </p>
            </div>
            <div className="AIInterviewPage-frame-81">
              <div className="AIInterviewPage-frame-82" onClick={() => setShowDeleteConfirmation(false)}>
                <div className="AIInterviewPage-text-wrapper-62">취소</div>
              </div>
              <div className="AIInterviewPage-frame-83">
                <div className="AIInterviewPage-text-wrapper-63">삭제</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInterviewPage;