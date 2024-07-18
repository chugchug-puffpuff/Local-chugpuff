import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./AIInterviewStart.css";
import InterviewHistoryBar from "./AIComponent/InterviewHistoryBar.js";
import InterviewPlay from "./AIComponent/InterviewPlay.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const AIInterviewStart = ({ authenticate, setAuthenticate, userName }) => {
  const location = useLocation();
  const { selectedType, selectedFeedback } = location.state || {};
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <div className="AIInterviewStart">
      <InterviewPlay selectedType={selectedType} selectedFeedback={selectedFeedback} userName={userName} />
      <InterviewHistoryBar setShowDeleteConfirmation={setShowDeleteConfirmation}/>
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
      {showDeleteConfirmation && (
        <div>
          <div className="AIInterviewStart-frame-78" />
          <div className="AIInterviewStart-frame-79">
            <div className="AIInterviewStart-frame-80">
              <div className="AIInterviewStart-text-wrapper-60">면접 내역 삭제</div>
              <p className="AIInterviewStart-text-wrapper-61">
                삭제된 내역은 복구할 수 없습니다.
                <br />
                삭제하시겠습니까?
              </p>
            </div>
            <div className="AIInterviewStart-frame-81">
              <div className="AIInterviewStart-frame-82" onClick={() => setShowDeleteConfirmation(false)}>
                <div className="AIInterviewStart-text-wrapper-62">취소</div>
              </div>
              <div className="AIInterviewStart-frame-83">
                <div className="AIInterviewStart-text-wrapper-63">삭제</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInterviewStart;