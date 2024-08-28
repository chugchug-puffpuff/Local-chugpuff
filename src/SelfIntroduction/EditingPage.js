import React from "react";
import { useLocation } from "react-router-dom";
import "./EditingPage.css";
import EditingComponent from "./SelfIntroductionComponent/EditingComponent.js";
import SeHistoryBar from "./SelfIntroductionComponent/SeHistoryBar.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const EditingPage = ({ authenticate, setAuthenticate, userName }) => {
  const location = useLocation();
  const { details, es_feedback } = location.state || { details: [], es_feedback: '' };

  return (
    <div className="EditingPage">
      <EditingComponent details={details} es_feedback={es_feedback} />
      <SeHistoryBar />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default EditingPage;