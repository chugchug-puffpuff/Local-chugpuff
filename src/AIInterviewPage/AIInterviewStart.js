import React from "react";
import { useLocation } from "react-router-dom";
import "./AIInterviewStart.css";
import InterviewHistoryBar from "./AIComponent/InterviewHistoryBar.js";
import ImmInterview from "./AIComponent/ImmInterview.js";
import TotInterview from "./AIComponent/TotInterview.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const AIInterviewStart = ({ authenticate, setAuthenticate, userName }) => {
  const location = useLocation();
  const { selectedType, selectedFeedback } = location.state || {};

  return (
    <div className="AIInterviewStart">
      {selectedFeedback === "전체 피드백" ? (
        <TotInterview selectedType={selectedType} selectedFeedback={selectedFeedback} userName={userName} />
      ) : (
        <ImmInterview selectedType={selectedType} selectedFeedback={selectedFeedback} userName={userName} />
      )}
      <InterviewHistoryBar />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default AIInterviewStart;