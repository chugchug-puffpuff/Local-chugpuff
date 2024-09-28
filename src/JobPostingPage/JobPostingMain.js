import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./JobPostingMain.css";
import PostingRecommend from "./JobPostingComponent/PostingRecommend.js";
import JobPostingSelect from "./JobPostingComponent/JobPostingSelect.js";
import JobPostingList from "./JobPostingComponent/JobPostingList.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";
import RecruitInfoPage from "./RecruitInfoPage.js";

const JobPostingMain = ({ authenticate, setAuthenticate, userName }) => {
  const [selectedDetailRegion, setSelectedDetailRegion] = useState(null);
  const [selectedJobMidname, setSelectedJobMidname] = useState(null);
  const [selectedJobKeyword, setSelectedJobKeyword] = useState(null);

  return (
    <div className="JobPostingMain">
      <Routes>
        <Route path="/" element={
          <div>
            <PostingRecommend />
            <img
              className="JobPostingMain-line"
              alt="Line"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/line-16.png"
            />
            <div className="JobPostingMain-frame-wrapper">
              <JobPostingSelect 
                setSelectedDetailRegion={setSelectedDetailRegion}
                setSelectedJobMidname={setSelectedJobMidname}
                setSelectedJobKeyword={setSelectedJobKeyword}
              />
              <JobPostingList 
                detailRegion={selectedDetailRegion} 
                jobMidname={selectedJobMidname}
                jobKeyword={selectedJobKeyword} 
              />
            </div>
          </div>
        } />
        <Route path="/recruitinfo/:jobId" element={
          <RecruitInfoPage 
            authenticate={authenticate} 
            setAuthenticate={setAuthenticate} 
            userName={userName}
          />
        } />
      </Routes>
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default JobPostingMain;