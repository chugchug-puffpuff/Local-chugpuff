import React from 'react';
import './PopularAnnouncement.css';
import { Link, useNavigate } from 'react-router-dom';

const PopularAnnouncement = ({ authenticate, jobId, company, title, expirationDay, scrapCount, scraped }) => {
  const navigate = useNavigate();
  
  // 로그인하지 않은 상태에서 클릭 시 로그인페이지로 이동
  const handleLinkClick = (e) => {
    if (!authenticate) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <div>
      <Link to={`/recruitinfo/${jobId}`} onClick={handleLinkClick}>
      <img 
        className="PopularAnnouncement-image" 
        alt="기업 이미지" 
        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6672cc7b5445d7af1e4bee20/img/image-1@2x.png"
      />
        <div className="PopularAnnouncement-frame">
          <div className="PopularAnnouncement-text-wrapper">{company}</div>
          <div className="PopularAnnouncement-frame-2">
            <div className="PopularAnnouncement-frame-3">
              <p className="PopularAnnouncement-text-wrapper-2">{title}</p>
            </div>
            <div className="PopularAnnouncement-frame-4">
              <div className="PopularAnnouncement-frame-5">
                <div className="PopularAnnouncement-grade-wrapper">
                  <img 
                    className={`PopularAnnouncement-grade ${scraped ? 'scraped' : ''}`} 
                    alt="스크랩 아이콘" 
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/666f93a3d0304f0ceff1aa35/img/grade@2x.png" />
                </div>
                <div className="PopularAnnouncement-frame-6">
                  <div className="PopularAnnouncement-text-wrapper-3">{scrapCount}</div>
                </div>
              </div>
              <div className="PopularAnnouncement-text-wrapper-4">{expirationDay}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PopularAnnouncement;