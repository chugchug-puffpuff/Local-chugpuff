import React from "react";
import "./AIInterviewPage.css";
import InterviewHistory from "./AIComponent/InterviewHistory.js";
import InterviewStart from "./AIComponent/InterviewStart.js";
import InterviewSelect from "./AIComponent/InterviewSelect.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const AIInterviewPage = ({ authenticate, setAuthenticate }) => {
  return (
    <div className="AIInterviewPage">
      <div className="AIInterviewPage-view">
        <InterviewStart />
        <InterviewSelect />
      </div>
      <InterviewHistory />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} />
    </div>
  );
};

export default AIInterviewPage;