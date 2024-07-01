import React from 'react';
import './PopularAnnouncement.css';

const PopularAnnouncement = ({ imageSrc, companyName, jobTitle, gradeSrc, grade, daysLeft }) => {
  return (
    <div>
    <img className="PopularAnnouncement-image" alt="Image" src={imageSrc} />
      <div className="PopularAnnouncement-frame">
        <div className="PopularAnnouncement-text-wrapper">{companyName}</div>
        <div className="PopularAnnouncement-frame-2">
          <div className="PopularAnnouncement-frame-3">
            <p className="PopularAnnouncement-text-wrapper-2">{jobTitle}</p>
          </div>
          <div className="PopularAnnouncement-frame-4">
            <div className="PopularAnnouncement-frame-5">
              <div className="PopularAnnouncement-grade-wrapper">
                <img className="PopularAnnouncement-grade" alt="Grade" src={gradeSrc} />
              </div>
              <div className="PopularAnnouncement-frame-6">
                <div className="PopularAnnouncement-text-wrapper-3">{grade}</div>
              </div>
            </div>
            <div className="PopularAnnouncement-text-wrapper-4">D-{daysLeft}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularAnnouncement;