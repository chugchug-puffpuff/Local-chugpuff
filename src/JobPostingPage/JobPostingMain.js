import React, { useState } from "react";
import "./JobPostingMain.css";
import PostingRecommend from "./JobPostingComponent/PostingRecommend.js";
import JobPostingSelect from "./JobPostingComponent/JobPostingSelect.js";
import JobPostingList from "./JobPostingComponent/JobPostingList.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const JobPostingMain = ({ authenticate, setAuthenticate, userName }) => {
  const [jobPostingListActive, setJobPostingListActive] = useState(false);
  const [selectedDetailRegion, setSelectedDetailRegion] = useState(null);
  const [selectedJobKeyword, setSelectedJobKeyword] = useState(null);

  return (
    <div className="JobPostingMain">
      <PostingRecommend />
      <img
        className="JobPostingMain-line"
        alt="Line"
        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/line-16.png"
      />
      <div className="JobPostingMain-frame-wrapper">
        <JobPostingSelect 
          setJobPostingListActive={setJobPostingListActive} 
          setSelectedDetailRegion={setSelectedDetailRegion}
          setSelectedJobKeyword={setSelectedJobKeyword}
        />
        {jobPostingListActive && <JobPostingList detailRegion={selectedDetailRegion} jobKeyword={selectedJobKeyword} />}
      </div>
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default JobPostingMain;