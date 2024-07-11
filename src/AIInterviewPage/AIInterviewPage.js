import React, { useState } from "react";
import "./AIInterviewPage.css";
import InterviewHistory from "./AIComponent/InterviewHistory.js";
import InterviewStart from "./AIComponent/InterviewStart.js";
import InterviewSelect from "./AIComponent/InterviewSelect.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const AIInterviewPage = ({ authenticate, setAuthenticate, userName }) => {
  const [canStartInterview, setCanStartInterview] = useState(false);

  return (
    <div className="AIInterviewPage">
      <div className="AIInterviewPage-view">
        <InterviewStart canStartInterview={canStartInterview} />
        <InterviewSelect setCanStartInterview={setCanStartInterview} />
      </div>
      <InterviewHistory />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default AIInterviewPage;