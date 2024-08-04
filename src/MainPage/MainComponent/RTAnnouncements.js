import React from 'react';
import './RTAnnouncements.css';
import PopularAnnouncement from './RTAComponents/PopularAnnouncement';
import jobData from '../../TestData/jobData.json';
import { useState, useEffect } from 'react';

const RTAnnouncements = () => {
  const [sortedJobData, setSortedJobData] = useState([]);

  useEffect(() => {
    const sortedData = jobData.sort((a, b) => b.grade - a.grade).slice(0, 4);
    setSortedJobData(sortedData);
  }, []);

  return (
    <div>
      <div className="RTAnnouncements-frame">
        <div className="RTAnnouncements-text-wrapper">실시간 인기 공고</div>
        <div className="RTAnnouncements-text-wrapper-2">더보기</div>
      </div>
      <div className="RTAnnouncements-overlap-container">
        {sortedJobData.map((job, index) => (
          <div key={index} className={`RTAnnouncements-overlap RTAnnouncements-overlap-${index + 1}`}>
            <PopularAnnouncement
              imageSrc={job.imageSrc}
              companyName={job.companyName}
              jobTitle={job.jobTitle}
              gradeSrc={"https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/666f93a3d0304f0ceff1aa35/img/grade@2x.png"}
              grade={job.grade}
              daysLeft={job.daysLeft}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RTAnnouncements;