import React from 'react';
import './CalendarMain.css';
import CalendarComponent from "./CalendarComponent.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const CalendarMain = ({ authenticate, setAuthenticate, userName }) => {

  return (
    <div className="element">
      <CalendarComponent />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default CalendarMain;
