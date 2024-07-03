import React from "react";
import "./MainPage.css";
import NavBar from "./MainComponent/NavBar";
import MainBanner from "./MainComponent/MainBanner";
import RTPosts from "./MainComponent/RTPosts";
import RTAnnouncements from "./MainComponent/RTAnnouncements";
import Footer from "./MainComponent/Footer";

export const MainPage = () => {
  return (
    <div className="MainPage">
      <MainBanner />
      <RTPosts />
      <RTAnnouncements />
      <Footer />
      <NavBar />
    </div>
  );
};

export default MainPage;