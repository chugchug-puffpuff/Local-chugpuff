import React from "react";
import { useLocation } from "react-router-dom";
import "./AIInterviewStart.css";
import InterviewHistory from "./AIComponent/InterviewHistory.js";
import InterviewPlay from "./AIComponent/InterviewPlay.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const AIInterviewExecution = ({ authenticate, setAuthenticate, userName }) => {
  const location = useLocation();
  const { selectedType, selectedFeedback } = location.state || {};

  return (
    <div className="AIInterviewPage">
      <InterviewPlay selectedType={selectedType} selectedFeedback={selectedFeedback} userName={userName} />
      <InterviewHistory />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default AIInterviewExecution;