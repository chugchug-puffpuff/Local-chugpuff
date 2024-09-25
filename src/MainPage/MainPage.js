import React from "react";
import "./MainPage.css";
import NavBar from "./MainComponent/NavBar";
import MainBanner from "./MainComponent/MainBanner";
import RTPosts from "./MainComponent/RTPosts";
import RTAnnouncements from "./MainComponent/RTAnnouncements";
import Footer from "./MainComponent/Footer";

const MainPage = ({ authenticate, setAuthenticate, userName }) => {
  return (
    <div className="MainPage">
      <MainBanner />
      <RTPosts authenticate={authenticate} />
      <RTAnnouncements authenticate={authenticate} />
      <Footer />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default MainPage;