import React from 'react'
import './EditInformation.css'

const EditInformation = () => {
  const jobList = ["기획·전략", "마케팅·홍보·조사", "회계·세무·재무", "인사·노무·HRD", "총무·법무·사무", "IT개발·데이터", "디자인", "영업·판매·무역", "고객상담·TM", "구매·자재·물류", "상품기획·MD", "운전·운송·배송", "서비스", "생산", "건설·건축", "의료", "연구·R&D", "교육", "미디어·문화·스포츠", "금융·보험", "공공·복지"];
  
  return (
    <div className="EditInformation-div">
      <div className="EditInformation-text-wrapper">내 정보 변경</div>
      <div className="EditInformation-frame-wrapper">
        <div className="EditInformation-frame-2">
          <div className="EditInformation-frame-3">
            <div className="EditInformation-frame-4">
              <div className="EditInformation-label-wrapper">
                <div className="EditInformation-label">비밀번호 변경</div>
              </div>
              <div className="EditInformation-frame-5">
                <div className="EditInformation-text-field">
                  <div className="EditInformation-label-wrapper">
                    <div className="EditInformation-label-2">현재 비밀번호 확인</div>
                  </div>
                  <div className="EditInformation-text-field-4" />
                </div>
                <div className="EditInformation-text-field">
                  <div className="EditInformation-label-wrapper">
                    <div className="EditInformation-label-2">새로운 비밀번호</div>
                  </div>
                  <div className="EditInformation-text-field-4" />
                </div>
                <div className="EditInformation-text-field">
                  <div className="EditInformation-label-wrapper">
                    <div className="EditInformation-label-2">새로운 비밀번호 확인</div>
                  </div>
                  <div className="EditInformation-text-field-4" />
                </div>
              </div>
              <div className="EditInformation-frame-13">
                <div className="EditInformation-text-wrapper-5">변경하기</div>
              </div>
            </div>
          </div>
          <div className="EditInformation-frame-7">
            <div className="EditInformation-frame-8">
              <div className="EditInformation-label-wrapper">
                <p className="EditInformation-label">직무 · 직무 키워드 변경</p>
              </div>
              <div className="EditInformation-frame-9">
                <div className="EditInformation-text-field">
                  <div className="EditInformation-frame-10">
                    <div className="EditInformation-text-field-wrapper">
                      <div className="EditInformation-text-field-5">
                        <div className="EditInformation-label-3">희망 직무</div>
                        <img
                          className="EditInformation-arrow-drop-up"
                          alt="Arrow drop up"
                          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2e52ff48c794da640d8d7/img/arrow-drop-up@2x.png"
                        />
                      </div>
                    </div>
                    <div className="EditInformation-text-field-wrapper">
                      <div className="EditInformation-text-field-5">
                        <div className="EditInformation-label-3">직무 키워드</div>
                        <img
                          className="EditInformation-arrow-drop-up"
                          alt="Arrow drop up"
                          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2e52ff48c794da640d8d7/img/arrow-drop-up@2x.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="EditInformation-frame-11">
                  <div className="EditInformation-frame-12">
                    <div className="EditInformation-text-wrapper-3">IT 개발/데이터</div>
                    <div className="EditInformation-text-wrapper-4">ㅁㅇㄴㅁㄹㄴㅇ</div>
                    <div className="EditInformation-text-wrapper-4">ㅁㅁㅇㄴㄻ</div>
                    <div className="EditInformation-text-wrapper-4">ㅁㅇㄴㅁㄹ</div>
                  </div>
                  <div className="EditInformation-frame-12">
                    <div className="EditInformation-text-wrapper-3">앱개발</div>
                    <div className="EditInformation-text-wrapper-4">머신러닝</div>
                    <div className="EditInformation-text-wrapper-4">와이어샤크</div>
                    <div className="EditInformation-text-wrapper-4">ㅁㅇㄴㄻㅇㄴ</div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="EditInformation-frame-14">
              <div className="EditInformation-text-wrapper-5">변경하기</div>
            </div>
          </div>
        </div>
        <div className="EditInformation-frame-15">
          <div className="EditInformation-text-wrapper-6">계정탈퇴</div>
        </div>
      </div>
    </div>  
  )
}

export default EditInformation