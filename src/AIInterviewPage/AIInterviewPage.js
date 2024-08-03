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
      <InterviewHistoryBar />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default AIInterviewPage;