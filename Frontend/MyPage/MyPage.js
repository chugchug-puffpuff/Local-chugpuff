import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";
import NavBar from "../MainPage/MainComponent/NavBar";

export const MyPage = ({ authenticate, setAuthenticate, userName }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // JWT 토큰 삭제
      localStorage.removeItem("token");
      setAuthenticate(false);
      navigate("/"); // 메인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <div className="element">
      <div className="frame">
        <div className="text-wrapper">나의 활동</div>
        <div className="div">
          <div className="frame-2">
            <div className="div-wrapper">
              <div className="text-wrapper-2">내가 작성한 게시물</div>
            </div>
            <div className="frame-3">
              <div className="text-wrapper-3">내가 작성한 댓글</div>
            </div>
            <div className="frame-4">
              <div className="text-wrapper-3">좋아요 누른 게시물</div>
            </div>
          </div>
          <div className="frame-wrapper">
            <div className="frame-5">
              <div className="frame-6">
                <div className="text-wrapper-4">전체 (2건)</div>
              </div>
              <div className="frame-7">
                <div className="frame-8">
                  <div className="view">
                    <div className="frame-9">
                      <div className="frame-10">
                        <p className="p">이직 결정 전 고려해야 할 사항들 - 현직자 경험담 공유</p>
                        <div className="frame-11">
                          <div className="text-wrapper-5">정보 공유</div>
                        </div>
                      </div>
                      <div className="frame-10">
                        <div className="frame-12">
                          <div className="frame-13">
                            <img
                              className="img"
                              alt="Sms"
                              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/sms@2x.png"
                            />
                            <div className="text-wrapper-6">15</div>
                          </div>
                          <div className="frame-13">
                            <img
                              className="img"
                              alt="Favorite"
                              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/favorite@2x.png"
                            />
                            <div className="text-wrapper-6">15</div>
                          </div>
                        </div>
                        <div className="text-wrapper-7">2024.05.07</div>
                      </div>
                    </div>
                  </div>
                  <img
                    className="line"
                    alt="Line"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/line-4.svg"
                  />
                  <div className="view">
                    <div className="frame-9">
                      <div className="frame-10">
                        <p className="p">이직 결정 전 고려해야 할 사항들 - 현직자 경험담 공유</p>
                        <div className="frame-14">
                          <div className="text-wrapper-5">취업 고민</div>
                        </div>
                      </div>
                      <div className="frame-10">
                        <div className="frame-12">
                          <div className="frame-13">
                            <img
                              className="img"
                              alt="Sms"
                              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/sms@2x.png"
                            />
                            <div className="text-wrapper-6">15</div>
                          </div>
                          <div className="frame-13">
                            <img
                              className="img"
                              alt="Favorite"
                              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/favorite@2x.png"
                            />
                            <div className="text-wrapper-6">15</div>
                          </div>
                        </div>
                        <div className="text-wrapper-7">2024.05.07</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="frame-15">
        <div className="frame-16">
          <img
            className="account-circle"
            alt="Account circle"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/account-circle.svg"
          />
          <div className="frame-17">
            <div className="frame-18">
              <div className="text-wrapper-8">{userName}</div>
              <div className="text-wrapper-9">aaaa1111</div>
            </div>
            <div className="frame-19">
              <div className="text-wrapper-10">내 정보 변경</div>
            </div>
          </div>
        </div>
        <img
          className="line-2"
          alt="Line"
          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/line-18.svg"
        />
        <div className="frame-20">
          <div className="frame-21">
            <div className="text-wrapper-11">스크랩한 공고</div>
          </div>
          <div className="frame-21">
            <div className="text-wrapper-11">나의 활동</div>
            <div className="frame-21">
              <div className="frame-22">
                <div className="frame-23" />
                <div className="text-wrapper-12">내가 작성한 게시물</div>
              </div>
              <div className="frame-22">
                <div className="frame-23" />
                <div className="text-wrapper-12">내가 작성한 댓글</div>
              </div>
              <div className="frame-22">
                <div className="frame-23" />
                <div className="text-wrapper-12">좋아요 누른 게시물</div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-24" onClick={handleLogout}>
          <img
            className="line-3"
            alt="Line"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/line-18.svg"
          />
          <div className="text-wrapper-13">로그아웃</div>
        </div>
      </div>
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default MyPage;