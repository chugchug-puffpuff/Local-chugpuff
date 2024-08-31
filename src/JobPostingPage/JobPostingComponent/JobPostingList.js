import React from 'react'
import './JobPostingList.css'

const JobPostingList = () => {
  return (
    <div className="JobPostingList-frame-wrapper">
      <div className="JobPostingList-frame-2">
        <div className="JobPostingList-frame-3">
          <div className="JobPostingList-text-wrapper-2">📝</div>
          <div className="JobPostingList-text-wrapper-3">채용 정보</div>
        </div>
        <div className="JobPostingList-frame-4">
          <div className="JobPostingList-frame-5">
            <img
              className="JobPostingList-img"
              alt="Distance"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/distance@2x.png"
            />
            <div className="JobPostingList-text-wrapper-4">지역</div>
            <img
              className="JobPostingList-img"
              alt="Keyboard arrow down"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-down@2x.png"
            />
          </div>
          <div className="JobPostingList-frame-6">
            <img
              className="JobPostingList-img"
              alt="Work"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/work@2x.png"
            />
            <div className="JobPostingList-text-wrapper-4">직군 · 직무</div>
            <img
              className="JobPostingList-img"
              alt="Keyboard arrow down"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-down@2x.png"
            />
          </div>
        </div>
      </div>
    </div>  
  )
}

export default JobPostingList