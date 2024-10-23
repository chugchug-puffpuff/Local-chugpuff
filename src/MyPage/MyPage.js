import React from "react";
import { useParams } from "react-router-dom";
import "./MyPage.css";
import NavBar from "../MainPage/MainComponent/NavBar";
import MyInfoBar from "./MyPageComponent/MyInfoBar";
import EditInformation from "./MyPageComponent/EditInformation";
import MyScrap from "./MyPageComponent/MyScrap";
import MyBoard from "./MyPageComponent/MyBoard";
import MyComment from "./MyPageComponent/MyComment";
import MyLiked from "./MyPageComponent/MyLiked";

export const MyPage = ({ authenticate, setAuthenticate, userName }) => {
  const { component } = useParams();
  const activeComponent = component;

  return (
    <div className="MyPage">
      <MyInfoBar setAuthenticate={setAuthenticate} userName={userName} />
      {activeComponent === 'editInformation' && <EditInformation setAuthenticate={setAuthenticate}/>}
      {activeComponent === 'myScrap' && <MyScrap />}
      {activeComponent === 'myBoard' && <MyBoard />}
      {activeComponent === 'myComment' && <MyComment />}
      {activeComponent === 'myLiked' && <MyLiked />}
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default MyPage;