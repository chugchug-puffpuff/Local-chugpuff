import React from "react";
import { Route, Routes } from "react-router-dom";
import "./CommunityPage.css";
import PopularPost from "./CommunityComponent/PopularPost.js";
import AllPost from "./CommunityComponent/AllPost.js";
import CommunityPost from "./CommunityPost.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const CommunityPage = ({ authenticate, setAuthenticate, userName }) => {
  return (
    <div className="CommunityPage">
      <Routes>
        <Route path="/" element={
          <div className="CommunityPage-frame-4">
            <PopularPost />
            <AllPost />
          </div>
        } />
        <Route path="/communitypost/:boardNo" element={
          <CommunityPost authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
        } />
      </Routes>
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default CommunityPage;