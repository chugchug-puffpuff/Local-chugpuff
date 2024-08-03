import React from 'react'
import './SelfIntroductionHistory.css'

const SelfIntroductionHistory = () => {
  return (
    <div className="SelfIntroductionHistory-frame-wrapper">
      <div className="SelfIntroductionHistory-frame">
        <div className="SelfIntroductionHistory-frame-2">
          <div className="SelfIntroductionHistory-text-wrapper">새로운 자기소개서</div>
          <img
            className="SelfIntroductionHistory-add"
            alt="Add"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66a09b014d2e057bada028bd/img/add@2x.png"
          />
        </div>
        <div className="SelfIntroductionHistory-frame-3">
          <div className="SelfIntroductionHistory-frame-4">
            <img
              className="SelfIntroductionHistory-check"
              alt="Check"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66a09b014d2e057bada028bd/img/check@2x.png"
            />
            <div className="SelfIntroductionHistory-text-wrapper-2">첨삭 내역</div>
          </div>
          <div className="SelfIntroductionHistory-frame-5">
            <div className="SelfIntroductionHistory-text-wrapper-2">저장한 자소서</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelfIntroductionHistory