import React from 'react';
import './PopularAnnouncement.css';

const PopularAnnouncement = ({ imageSrc, companyName, jobTitle, gradeSrc, grade, daysLeft }) => {
  return (
    <div>
    <img className="image-2" alt="Image" src={imageSrc} />
      <div className="frame-11">
        <div className="text-wrapper-12">{companyName}</div>
        <div className="frame-12">
          <div className="frame-13">
            <p className="text-wrapper-13">{jobTitle}</p>
          </div>
          <div className="frame-14">
            <div className="frame-15">
              <div className="grade-wrapper">
                <img className="grade" alt="Grade" src={gradeSrc} />
              </div>
              <div className="frame-16">
                <div className="text-wrapper-14">{grade}</div>
              </div>
            </div>
            <div className="text-wrapper-15">D-{daysLeft}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularAnnouncement;