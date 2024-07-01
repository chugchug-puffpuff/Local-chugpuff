import React from "react";
import "./MainPage.css";
import NavBar from "./MPComponents/NavBar";
import MainBanner from "./MPComponents/MainBanner";
import RTPosts from "./MPComponents/RTPosts";
import RTAnnouncements from "./MPComponents/RTAnnouncements";
import Footer from "./MPComponents/Footer";

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