import React from "react";
import "./JobPostingMain.css";
import PostingRecommend from "./JobPostingComponent/PostingRecommend.js";
import JobPostingSelect from "./JobPostingComponent/JobPostingSelect.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const JobPostingMain = ({ authenticate, setAuthenticate, userName }) => {
  return (
    <div className="JobPostingMain">
      <PostingRecommend />
      <img
        className="JobPostingMain-line"
        alt="Line"
        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/line-16.png"
      />
      <JobPostingSelect />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default JobPostingMain;