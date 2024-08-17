import React from "react";
import "./SelfIntroductionPage.css";
import EnterSelfIntroduction from "./SelfIntroductionComponent/EnterSelfIntroduction.js";
import SeHistoryBar from "./SelfIntroductionComponent/SeHistoryBar.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

export const SelfIntroductionPage = ({ authenticate, setAuthenticate, userName }) => {
  return (
    <div className="SelfIntroductionPage">
      <EnterSelfIntroduction />
      <SeHistoryBar />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default SelfIntroductionPage;
