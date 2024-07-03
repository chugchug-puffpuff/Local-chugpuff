import React from "react";
import "./AIInterviewPage.css";

const AIInterviewPage = () => {
  return (
    <div className="element">
      <div className="view">
        <div className="frame">
          <div className="div">
            <div className="text-wrapper">치치폭폭 AI 모의면접 안내</div>
            <div className="frame-2">
              <p className="p">🗣️&nbsp;&nbsp;음성 면접으로 실제 면접처럼 몰입할 수 있도록 합니다.</p>
              <div className="text-wrapper-2">⏰&nbsp;&nbsp;질의응답 시간은 최대 30분입니다.</div>
              <p className="text-wrapper-3">✅&nbsp;&nbsp;면접 유형과 피드백 방식을 선택하고 면접을 시작합니다.</p>
            </div>
          </div>
          <div className="frame-3">
            <div className="div-wrapper">
              <div className="text-wrapper-4">면접 시작하기</div>
            </div>
            <p className="text-wrapper-5">면접 유형과 피드백 방식을 선택해주세요.</p>
          </div>
        </div>
        <div className="frame-4">
          <div className="div">
            <div className="frame-5">
              <img
                className="img"
                alt="Forum"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668568acabd97e4e12fa0204/img/forum@2x.png"
              />
              <div className="text-wrapper-6">면접 유형</div>
            </div>
            <div className="frame-6">
              <div className="frame-7">
                <div className="text-wrapper-7">형식 없음</div>
              </div>
              <div className="frame-7">
                <div className="text-wrapper-7">자기소개서 기반</div>
              </div>
              <div className="frame-7">
                <div className="text-wrapper-7">인성 면접</div>
              </div>
              <div className="frame-7">
                <div className="text-wrapper-7">직무 면접</div>
              </div>
            </div>
          </div>
          <div className="frame-8">
            <div className="frame-5">
              <img
                className="img"
                alt="Business messages"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668568acabd97e4e12fa0204/img/business-messages@2x.png"
              />
              <div className="text-wrapper-6">피드백 방식</div>
            </div>
            <div className="frame-9">
              <div className="frame-wrapper">
                <div className="frame-10">
                  <img
                    className="img-2"
                    alt="Border color"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668568acabd97e4e12fa0204/img/border-color@2x.png"
                  />
                  <div className="frame-11">
                    <div className="text-wrapper-8">즉시 피드백</div>
                    <p className="text-wrapper-9">
                      면접 질문에 대답을 한 후 <br />
                      즉시 피드백을 받습니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="frame-wrapper">
                <div className="frame-12">
                  <img
                    className="img-2"
                    alt="Edit document"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668568acabd97e4e12fa0204/img/edit-document@2x.png"
                  />
                  <div className="frame-13">
                    <div className="text-wrapper-8">전체 피드백</div>
                    <div className="text-wrapper-9">
                      면접이 끝나고 전체적인
                      <br />
                      피드백을 받습니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="frame-14">
        <div className="frame-15">
          <div className="frame-16">
            <div className="text-wrapper-10">새로운 면접</div>
            <img
              className="add"
              alt="Add"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668568acabd97e4e12fa0204/img/add@2x.png"
            />
          </div>
          <div className="text-wrapper-11">면접 내역</div>
        </div>
      </div>
      <div className="view-wrapper">
        <div className="view-2">
          <div className="div-2">
            <div className="text-wrapper-12">로그인</div>
            <div className="text-wrapper-12">회원가입</div>
          </div>
          <div className="navbar">
            <div className="text-wrapper-12">AI 모의면접</div>
            <div className="text-wrapper-12">자기소개서 첨삭</div>
            <div className="text-wrapper-12">취업공고</div>
            <div className="text-wrapper-12">커뮤니티</div>
            <div className="text-wrapper-12">캘린더</div>
          </div>
          <div className="view-3">
            <div className="view-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewPage;