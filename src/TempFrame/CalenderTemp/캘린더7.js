import React from "react";
import { AtomsDeyNumber } from "../../components/AtomsDeyNumber";
import { AtomsMouth } from "../../components/AtomsMouth";
import { AtomsWeekDey } from "../../components/AtomsWeekDey";
import "./style.css";
//
export const Element = () => {
  return (
    <div className="element">
      <div className="frame">
        <div className="frame-2">
          <header className="header">
            <img
              className="img"
              alt="Arrow back ios"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccf4aa651ab8e54d23ff9/img/arrow-back-ios@2x.png"
            />
            <AtomsMouth
              className="atoms-mouth-instance"
              fill
              text="2024.06"
              textClassName="design-component-instance-node"
            />
            <img
              className="img"
              alt="Arrow forward ios"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccf4aa651ab8e54d23ff9/img/arrow-forward-ios@2x.png"
            />
          </header>
          <div className="frame-3">
            <div className="frame-4">
              <div className="frame-5">
                <img
                  className="line"
                  alt="Line"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2d9a0c1b9ea800c79d994/img/line-3.png"
                />
                <div className="line-2">
                  <AtomsWeekDey
                    className="design-component-instance-node-2"
                    text="일"
                    textClassName="design-component-instance-node-3"
                    weekend
                  />
                  <AtomsWeekDey
                    className="design-component-instance-node-4"
                    text="월"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsWeekDey
                    className="design-component-instance-node-4"
                    text="화"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsWeekDey
                    className="design-component-instance-node-4"
                    text="수"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsWeekDey
                    className="design-component-instance-node-4"
                    text="목"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsWeekDey
                    className="design-component-instance-node-4"
                    text="금"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsWeekDey
                    className="design-component-instance-node-4"
                    text="토"
                    textClassName="design-component-instance-node-3"
                    weekend
                  />
                </div>
                <img
                  className="line-3"
                  alt="Line"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2d9a0c1b9ea800c79d994/img/line-4.png"
                />
              </div>
              <div className="frame-6">
                <div className="line-4">
                  <AtomsDeyNumber
                    active={false}
                    className="design-component-instance-node-2"
                    fill={false}
                    strok={false}
                    text="26"
                    textClassName="atoms-dey-number-instance"
                    weekend
                  />
                  <div className="frame-7">
                    <AtomsDeyNumber
                      active={false}
                      className="atoms-dey-number-2"
                      fill={false}
                      strok={false}
                      text="27"
                      textClassName="atoms-dey-number-instance"
                      weekend={false}
                    />
                    <div className="frame-8">
                      <div className="frame-9">
                        <div className="text-wrapper-2">(주)엔미디어플랫폼</div>
                        <p className="text-wrapper-3">Nexon Company window application 개발 엔지니어 모집</p>
                      </div>
                      <img
                        className="img-2"
                        alt="Delete forever"
                        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2deadd6bc256abb7f30ac/img/delete-forever@2x.png"
                      />
                    </div>
                  </div>
                  <AtomsDeyNumber
                    active={false}
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="28"
                    textClassName="atoms-dey-number-instance"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active={false}
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="29"
                    textClassName="atoms-dey-number-instance"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active={false}
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="30"
                    textClassName="atoms-dey-number-instance"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active={false}
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="31"
                    textClassName="atoms-dey-number-instance"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="1"
                    textClassName="atoms-dey-number-3"
                    weekend
                  />
                </div>
                <div className="line-4">
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-2"
                    fill={false}
                    strok={false}
                    text="2"
                    textClassName="atoms-dey-number-3"
                    weekend
                  />
                  <div className="frame-10">
                    <AtomsDeyNumber
                      active
                      className="atoms-dey-number-2"
                      fill={false}
                      strok={false}
                      text="3"
                      textClassName="design-component-instance-node-5"
                      weekend={false}
                    />
                    <div className="frame-11">
                      <div className="text-wrapper-4">(주)엔미디어플랫폼</div>
                      <p className="p">Nexon Company window application 개발 엔지니어 모집</p>
                    </div>
                  </div>
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="4"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="5"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="6"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="7"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="8"
                    textClassName="atoms-dey-number-3"
                    weekend
                  />
                </div>
                <div className="line-4">
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-2"
                    fill={false}
                    strok={false}
                    text="9"
                    textClassName="atoms-dey-number-3"
                    weekend
                  />
                  <div className="frame-10">
                    <AtomsDeyNumber
                      active
                      className="atoms-dey-number-2"
                      fill={false}
                      strok={false}
                      text="10"
                      textClassName="design-component-instance-node-5"
                      weekend={false}
                    />
                    <div className="frame-11">
                      <div className="text-wrapper-4">(주)엔미디어플랫폼</div>
                      <p className="p">Nexon Company window application 개발 엔지니어 모집</p>
                    </div>
                  </div>
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="11"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="12"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="13"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="14"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="15"
                    textClassName="atoms-dey-number-3"
                    weekend
                  />
                </div>
                <div className="line-5">
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-2"
                    fill={false}
                    strok={false}
                    text="16"
                    textClassName="atoms-dey-number-3"
                    weekend
                  />
                  <div className="frame-12">
                    <AtomsDeyNumber
                      active
                      className="atoms-dey-number-2"
                      fill
                      strok={false}
                      text="17"
                      textClassName="design-component-instance-node-3"
                      weekend={false}
                    />
                    <div className="frame-11">
                      <div className="text-wrapper-4">(주)엔미디어플랫폼</div>
                      <p className="p">Nexon Company window application 개발 엔지니어 모집</p>
                    </div>
                  </div>
                  <div className="frame-12">
                    <AtomsDeyNumber
                      active
                      className="atoms-dey-number-2"
                      fill={false}
                      strok={false}
                      text="18"
                      textClassName="design-component-instance-node-5"
                      weekend={false}
                    />
                  </div>
                  <AtomsDeyNumber
                    active
                    className="atoms-dey-number-4"
                    fill={false}
                    strok={false}
                    text="19"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="atoms-dey-number-4"
                    fill={false}
                    strok={false}
                    text="20"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="atoms-dey-number-4"
                    fill={false}
                    strok={false}
                    text="21"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="atoms-dey-number-4"
                    fill={false}
                    strok={false}
                    text="22"
                    textClassName="atoms-dey-number-3"
                    weekend
                  />
                </div>
                <div className="line-4">
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-2"
                    fill={false}
                    strok={false}
                    text="23"
                    textClassName="atoms-dey-number-3"
                    weekend
                  />
                  <div className="frame-7">
                    <AtomsDeyNumber
                      active={false}
                      className="atoms-dey-number-2"
                      fill={false}
                      strok={false}
                      text="24"
                      textClassName="atoms-dey-number-instance"
                      weekend={false}
                    />
                    <div className="frame-8">
                      <div className="frame-9">
                        <div className="text-wrapper-5">자소서 제출ㅇㄹ ㅁㄴㄹㅇㅁㄴㅇㄹ</div>
                        <div className="text-wrapper-3">ㅁㄴㅇㄻㄴㅇㄻㅁㄹㅇ</div>
                      </div>
                      <div className="frame-13">
                        <img
                          className="img-2"
                          alt="Edit"
                          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2deadd6bc256abb7f30ac/img/edit@2x.png"
                        />
                        <img
                          className="img-2"
                          alt="Delete forever"
                          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2deadd6bc256abb7f30ac/img/delete-forever-1@2x.png"
                        />
                      </div>
                    </div>
                  </div>
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="25"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="26"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="27"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="28"
                    textClassName="design-component-instance-node-5"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="29"
                    textClassName="atoms-dey-number-3"
                    weekend
                  />
                </div>
                <div className="line-4">
                  <AtomsDeyNumber
                    active
                    className="design-component-instance-node-2"
                    fill={false}
                    strok={false}
                    text="30"
                    textClassName="atoms-dey-number-3"
                    weekend
                  />
                  <div className="frame-10">
                    <AtomsDeyNumber
                      active={false}
                      className="atoms-dey-number-2"
                      fill={false}
                      strok={false}
                      text="1"
                      textClassName="atoms-dey-number-instance"
                      weekend={false}
                    />
                    <div className="frame-11">
                      <div className="text-wrapper-4">(주)엔미디어플랫폼</div>
                      <p className="p">Nexon Company window application 개발 엔지니어 모집</p>
                    </div>
                  </div>
                  <AtomsDeyNumber
                    active={false}
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="2"
                    textClassName="atoms-dey-number-instance"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active={false}
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="3"
                    textClassName="atoms-dey-number-instance"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active={false}
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="4"
                    textClassName="atoms-dey-number-instance"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active={false}
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="5"
                    textClassName="atoms-dey-number-instance"
                    weekend={false}
                  />
                  <AtomsDeyNumber
                    active={false}
                    className="design-component-instance-node-4"
                    fill={false}
                    strok={false}
                    text="6"
                    textClassName="atoms-dey-number-instance"
                    weekend
                  />
                </div>
              </div>
            </div>
            <img
              className="line-3"
              alt="Line"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2d9a0c1b9ea800c79d994/img/line-5.png"
            />
            <div className="frame-14">
              <div className="text-wrapper-6">일정 추가</div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-wrapper-7">📆 치치폭폭으로 관리하는 취업 일정</p>
      <div className="view">
        <div className="view-2">
          <div className="navbar">
            <div className="text-wrapper-8">AI 모의면접</div>
            <div className="text-wrapper-8">자기소개서 첨삭</div>
            <div className="text-wrapper-8">취업공고</div>
            <div className="text-wrapper-8">커뮤니티</div>
            <div className="text-wrapper-8">캘린더</div>
          </div>
          <div className="view-wrapper">
            <div className="view-3" />
          </div>
          <div className="frame-wrapper">
            <div className="frame-15">
              <p className="div-2">
                <span className="span">백기석</span>
                <span className="text-wrapper-9"> 님</span>
              </p>
              <img
                className="img"
                alt="Arrow drop down"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/arrow-drop-down@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
