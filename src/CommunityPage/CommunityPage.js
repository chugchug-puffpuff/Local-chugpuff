import React from "react";
import "./CommunityPage.css";
import PopularPost from "./CommunityComponent/PopularPost.js";
import AllPost from "./CommunityComponent/AllPost.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const CommunityPage = ({ authenticate, setAuthenticate, userName }) => {
  return (
    <div className="CommunityPage">
      <div className="CommunityPage-frame-4">
        <PopularPost />
        <AllPost />
      </div>
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default CommunityPage;