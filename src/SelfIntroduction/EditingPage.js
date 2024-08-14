import React from "react";
import { useLocation } from "react-router-dom";
import "./EditingPage.css";
import EditingComponent from "./SelfIntroductionComponent/EditingComponent.js";
import SeHistoryBar from "./SelfIntroductionComponent/SeHistoryBar.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const EditingPage = ({ authenticate, setAuthenticate, userName }) => {
  const location = useLocation();
  const { details } = location.state || { details: [] };

  return (
    <div className="EditingPage">
      <EditingComponent details={details} />
      <SeHistoryBar />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default EditingPage;