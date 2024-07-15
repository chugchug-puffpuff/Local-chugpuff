import React, { useState } from "react";
import "./AIInterviewPage.css";
import InterviewHistory from "./AIComponent/InterviewHistory.js";
import InterviewStart from "./AIComponent/InterviewStart.js";
import InterviewSelect from "./AIComponent/InterviewSelect.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";
import InterviewPlay from "./AIComponent/InterviewPlay.js";

const AIInterviewPage = ({ authenticate, setAuthenticate, userName }) => {
  const [canStartInterview, setCanStartInterview] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  return (
    <div className="AIInterviewPage">
      {isInterviewStarted ? (
        <InterviewPlay selectedType={selectedType} selectedFeedback={selectedFeedback} userName={userName} />
      ) : (
        <div className="AIInterviewPage-view">
          <InterviewStart canStartInterview={canStartInterview} startInterview={() => setIsInterviewStarted(true)} />
          <InterviewSelect setCanStartInterview={setCanStartInterview} setSelectedType={setSelectedType} setSelectedFeedback={setSelectedFeedback} />
        </div>
      )}
      <InterviewHistory />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default AIInterviewPage;