import React from 'react';
import './MainBanner.css';
import { useNavigate } from 'react-router-dom';

const MainBanner = () => {
  const navigate = useNavigate();
  const goToAIInterview = () => {
    navigate('/aiinterview')
  }

  return (
    <div>
      <div className="MainBanner-view">
        <div className="MainBanner-overlap-group">
          <img
            className="MainBanner-image"
            alt=""
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6672cc7b5445d7af1e4bee20/img/---.png"
          />
          <div className="MainBanner-view-2">
            <div className="MainBanner-view-3">
              <div className="MainBanner-frame">
                <p className="MainBanner-p">취업 준비, 이제 혼자가 아니다.</p>
              </div>
              <div className="MainBanner-frame">
                <p className="MainBanner-text-wrapper">
                  완성형 조력자
                  <br />
                  치치폭폭과 함께 취업 뽀개기!
                </p>
              </div>
            </div>
            <div className="MainBanner-view-4">
              <button className="MainBanner-text-wrapper-2" onClick={goToAIInterview}>AI 모의면접 시작하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainBanner;