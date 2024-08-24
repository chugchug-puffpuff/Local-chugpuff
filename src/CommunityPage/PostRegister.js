import React from "react";
import "./PostRegister.css";
import NavBar from "../MainPage/MainComponent/NavBar.js";

const PostRegister = ({ authenticate, setAuthenticate, userName }) => {
  return (
    <div className="element">
      <div className="overlap-group">
        <div className="frame">
          <div className="frame-wrapper">
            <div className="div">
              <div className="frame-2">
                <div className="frame-2">
                  <div className="frame-3">
                    <div className="text-wrapper">정보 공유</div>
                  </div>
                  <div className="frame-4">
                    <div className="frame-5">
                      <p className="p">이직 결정 전 고려해야 할 사항들 - 현직자 경험담 공유</p>
                      <div className="text-wrapper-2">2024.05.07</div>
                    </div>
                    <div className="frame-6">
                      <img
                        className="img"
                        alt="Account circle"
                        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/account-circle@2x.png"
                      />
                      <div className="text-wrapper-3">wldsaam5234</div>
                    </div>
                  </div>
                </div>
                <p className="text-wrapper-4">
                  안녕하세요. 이직 결정 전 고려해야 할 사항들에 대해 공유해보려고 합니다. 딱딱한 내용이긴 하나 적다보니
                  이게 정석인 거 같고, 이런 고민이 바탕이 되어야 <br />
                  다른 판단을 할 수 있다는 생각이 들었습니다. 이직을 고민하는 분들이 가장 많이 겪는 고민은 현재 직장에
                  대한 불만과 새로운 기회에 대한 기대감 사이에서 <br />
                  균형을 잡는 것입니다. 감정적으로 판단하지 말고 객관적이고 균형적인 분석이 필요합니다. 현재 직장의
                  긍정적인 면과 부정적인 면을 모두 고려해야 하며, <br />
                  새로운 직장을 선택할 때도 편향된 판단을 피해야 합니다.
                  <br />
                  이직을 고려할 때 가장 중요하게 살펴봐야 할 3가지 핵심 요소는 다음과 같습니다.
                  <br />
                  <br />
                  사람 - 상사, 동료, 팀 분위기 등 직장 내 인간관계가 어떤지 살펴봐야 합니다. 좋은 인간관계는 직장 생활의
                  질을 높이는 데 큰 영향을 미칩니다.
                  <br />
                  업무 - 현재 맡고 있는 업무가 자신의 역량과 흥미에 잘 맞는지, 새로운 직장에서는 어떤 업무를 하게 될지
                  고민해 보세요. 업무 만족도는 이직 결정에 큰 <br />
                  영향을 줍니다.
                  <br />
                  회사 문화 - 회사의 가치관, 리더십, 복지 제도 등 전반적인 조직 문화가 자신의 성향과 잘 맞는지 살펴봐야
                  합니다. 회사 문화는 장기적인 직장 생활에 큰 <br />
                  영향을 미칩니다.
                  <br />
                  <br />이 세 가지 요소를 종합적으로 분석하여 균형 잡힌 판단을 내리는 것이 중요합니다. 예를 들어, 업무
                  자체는 만족스러워도 상사와의 갈등으로 힘들어하는 경우가 있습니다. 또한 회사 문화가 마음에 들지
                  않더라도 업무 자체가 매력적이라면 고민 끝에 이직을 결정할 수도 있습니다. 이직을 고민하는 분들께 추가로
                  제안 <br />
                  드리고 싶은 것은 &#39;자신의 성장 경로&#39;를 되돌아보는 것입니다. 현재 직장에서의 경험이 앞으로의
                  커리어 발전에 어떤 도움이 될지, 새로운 직장에서는 어떤 기회를 얻을 수 있을지 고민해 보세요. 이를 통해
                  장기적인 관점에서 더 나은 선택을 할 수 있습니다. 이직 결정은 쉽지 않은 과정이지만, 균형 잡힌 시각으로
                  접근한다면 스트레스를 최소화하면서 올바른 선택을 할 수 있을 것입니다. 다들 응원합니다.
                </p>
              </div>
              <img
                className="line"
                alt="Line"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/line-17.png"
              />
              <div className="frame-2">
                <div className="frame-7">
                  <div className="frame-8">
                    <div className="frame-9">
                      <img
                        className="img"
                        alt="Favorite"
                        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/favorite@2x.png"
                      />
                      <div className="text-wrapper-5">좋아요</div>
                      <div className="text-wrapper-6">15</div>
                    </div>
                  </div>
                  <div className="frame-9">
                    <img
                      className="img"
                      alt="Sms"
                      src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/sms@2x.png"
                    />
                    <div className="text-wrapper-6">15</div>
                  </div>
                </div>
                <div className="frame-10">
                  <div className="frame-11">
                    <p className="text-wrapper-7">작성자에게 힘이 되는 댓글을 남겨주세요.</p>
                    <div className="frame-12">
                      <div className="text-wrapper-8">등록</div>
                    </div>
                  </div>
                  <div className="frame-13">
                    <div className="frame-14">
                      <div className="frame-15">
                        <div className="frame-16">
                          <img
                            className="img"
                            alt="Account circle"
                            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66962e4acda28174913bd1a3/img/account-circle@2x.png"
                          />
                          <div className="text-wrapper-9">MEME</div>
                        </div>
                        <div className="text-wrapper-10">8일 전</div>
                      </div>
                      <div className="frame-17">
                        <p className="text-wrapper-11">이렇게 정석으로 생각하는 게 맞긴 함</p>
                        <img
                          className="edit"
                          alt="Edit"
                          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6698aa612be89236643e00e3/img/edit@2x.png"
                        />
                        <img
                          className="img"
                          alt="Close"
                          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/close@2x.png"
                        />
                      </div>
                    </div>
                    <div className="frame-18">
                      <div className="frame-15">
                        <div className="frame-16">
                          <img
                            className="img"
                            alt="Account circle"
                            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/account-circle@2x.png"
                          />
                          <div className="text-wrapper-3">wldsaam5234</div>
                        </div>
                        <div className="text-wrapper-10">5일 전</div>
                      </div>
                      <div className="text-wrapper-12">ㅇㅇ 이거임</div>
                    </div>
                    <div className="frame-18">
                      <div className="frame-15">
                        <div className="frame-16">
                          <img
                            className="img"
                            alt="Account circle"
                            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/account-circle@2x.png"
                          />
                          <div className="text-wrapper-3">wldsaam5234</div>
                        </div>
                        <div className="text-wrapper-10">5일 전</div>
                      </div>
                      <div className="text-wrapper-12">ㅇㅇ 이거임</div>
                    </div>
                    <div className="frame-18">
                      <div className="frame-15">
                        <div className="frame-16">
                          <img
                            className="img"
                            alt="Account circle"
                            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/account-circle@2x.png"
                          />
                          <div className="text-wrapper-3">wldsaam5234</div>
                        </div>
                        <div className="text-wrapper-10">5일 전</div>
                      </div>
                      <div className="text-wrapper-12">ㅇㅇ 이거임</div>
                    </div>
                    <div className="frame-18">
                      <div className="frame-15">
                        <div className="frame-16">
                          <img
                            className="img"
                            alt="Account circle"
                            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/account-circle@2x.png"
                          />
                          <div className="text-wrapper-3">wldsaam5234</div>
                        </div>
                        <div className="text-wrapper-10">5일 전</div>
                      </div>
                      <div className="text-wrapper-12">ㅇㅇ 이거임</div>
                    </div>
                    <div className="frame-18">
                      <div className="frame-15">
                        <div className="frame-16">
                          <img
                            className="img"
                            alt="Account circle"
                            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/account-circle@2x.png"
                          />
                          <div className="text-wrapper-3">wldsaam5234</div>
                        </div>
                        <div className="text-wrapper-10">5일 전</div>
                      </div>
                      <div className="text-wrapper-12">ㅇㅇ 이거임</div>
                    </div>
                    <div className="frame-18">
                      <div className="frame-15">
                        <div className="frame-16">
                          <img
                            className="img"
                            alt="Account circle"
                            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/account-circle@2x.png"
                          />
                          <div className="text-wrapper-3">wldsaam5234</div>
                        </div>
                        <div className="text-wrapper-10">5일 전</div>
                      </div>
                      <div className="text-wrapper-12">ㅇㅇ 이거임</div>
                    </div>
                    <div className="frame-18">
                      <div className="frame-15">
                        <div className="frame-16">
                          <img
                            className="img"
                            alt="Account circle"
                            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/account-circle@2x.png"
                          />
                          <div className="text-wrapper-3">wldsaam5234</div>
                        </div>
                        <div className="text-wrapper-10">5일 전</div>
                      </div>
                      <div className="text-wrapper-12">ㅇㅇ 이거임</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-19">
          <img
            className="format-list-bulleted"
            alt="Format list bulleted"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/format-list-bulleted@2x.png"
          />
          <div className="text-wrapper-13">목록 보기</div>
        </div>
      </div>
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default PostRegister;
