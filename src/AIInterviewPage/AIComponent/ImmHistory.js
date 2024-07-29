import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ImmInterview.css';
import interviewData from '../../TestData/interviewData.json';

const InterviewPlay = ({ selectedType, selectedFeedback, userName }) => {

  const oneLetter = selectedType === '형식 없음' ? '없' : selectedType.charAt(0);

  return (
    <div className="screen-4">
      <div className="overlap-group-3">
        <img
          className="ellipse-3"
          alt="Ellipse"
          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/669516a064a85a6555c2e275/img/ellipse-1.svg"
        />
        <div className="frame-54">
          <div className="frame-55">
            <div className="frame-56">
              <div className="frame-57">
                <div className="frame-58">
                  <div className="text-wrapper-44">인</div>
                </div>
                <div className="text-wrapper-45">인성 면접 담당자</div>
              </div>
              <p className="text-wrapper-46">회사 문화와 가치관이 자신의 것과 다를 경우 어떻게 대처하시겠습니까?</p>
            </div>
            <div className="frame-56">
              <div className="frame-57">
                <img
                  className="account-circle-3"
                  alt="Account circle"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/669516a064a85a6555c2e275/img/account-circle.svg"
                />
                <div className="text-wrapper-45">기석</div>
              </div>
              <p className="text-wrapper-46">
                회사의 문화와 가치관을 이해하고자 노력하겠습니다. 이를 통해 차이점을 파악하고 서로의 입장을 이해하려 할
                것입니다. 회사 문화와 가치관이 자신의 것과 다르더라도, 유연한 자세로 적응하고자 노력하겠습니다. 다만
                근본적인 가치관의 차이가 크다면 솔직하게 의견을 개진하고 서로의 입장을 존중하며 협력하는 방향을
                모색하겠습니다.
              </p>
            </div>
          </div>
          <div className="frame-55">
            <div className="frame-56">
              <div className="frame-57">
                <div className="frame-58">
                  <div className="text-wrapper-44">인</div>
                </div>
                <div className="text-wrapper-45">인성 면접 담당자</div>
              </div>
              <p className="text-wrapper-46">회사 문화와 가치관이 자신의 것과 다를 경우 어떻게 대처하시겠습니까?</p>
            </div>
            <div className="frame-56">
              <div className="frame-57">
                <img
                  className="account-circle-3"
                  alt="Account circle"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/669516a064a85a6555c2e275/img/account-circle.svg"
                />
                <div className="text-wrapper-45">기석</div>
              </div>
              <p className="text-wrapper-46">
                회사의 문화와 가치관을 이해하고자 노력하겠습니다. 이를 통해 차이점을 파악하고 서로의 입장을 이해하려 할
                것입니다. 회사 문화와 가치관이 자신의 것과 다르더라도, 유연한 자세로 적응하고자 노력하겠습니다. 다만
                근본적인 가치관의 차이가 크다면 솔직하게 의견을 개진하고 서로의 입장을 존중하며 협력하는 방향을
                모색하겠습니다.
              </p>
            </div>
          </div>
          <div className="frame-55">
            <div className="frame-56">
              <div className="frame-57">
                <div className="frame-58">
                  <div className="text-wrapper-44">인</div>
                </div>
                <div className="text-wrapper-45">인성 면접 담당자</div>
              </div>
              <p className="text-wrapper-46">회사 문화와 가치관이 자신의 것과 다를 경우 어떻게 대처하시겠습니까?</p>
            </div>
            <div className="frame-56">
              <div className="frame-57">
                <img
                  className="account-circle-3"
                  alt="Account circle"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/669516a064a85a6555c2e275/img/account-circle.svg"
                />
                <div className="text-wrapper-45">기석</div>
              </div>
              <p className="text-wrapper-46">
                회사의 문화와 가치관을 이해하고자 노력하겠습니다. 이를 통해 차이점을 파악하고 서로의 입장을 이해하려 할
                것입니다. 회사 문화와 가치관이 자신의 것과 다르더라도, 유연한 자세로 적응하고자
              </p>
            </div>
          </div>
        </div>
        <div className="frame-59">
          <div className="div-4">
            <div className="frame-60">
              <img
                className="check-5"
                alt="Check"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/check.svg"
              />
              <div className="text-wrapper-47">인성 면접</div>
            </div>
            <div className="frame-60">
              <img
                className="check-5"
                alt="Check"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/check-1.svg"
              />
              <div className="text-wrapper-47">전체 피드백</div>
            </div>
          </div>
          <div className="frame-61">
            <div className="frame-62">
              <div className="frame-63">
                <div className="text-wrapper-48">남은 시간</div>
                <div className="text-wrapper-49">28분 21초</div>
              </div>
              <div className="div-4">
                <img
                  className="image"
                  alt="Image"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/669516a064a85a6555c2e275/img/--.png"
                />
                <div className="view-22">
                  <img
                    className="stop-circle"
                    alt="Stop circle"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/669516a064a85a6555c2e275/img/stop-circle.svg"
                  />
                  <div className="text-wrapper-50">종료</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPlay;