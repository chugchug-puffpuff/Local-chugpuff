import React from 'react';
import './RTAnnouncements.css';
import PopularAnnouncement from './RTAComponents/PopularAnnouncement';

const jobData = [
  {
    imageSrc: 'https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6672cc7b5445d7af1e4bee20/img/image-1@2x.png',
    companyName: '(주)그레이고',
    jobTitle: '패션 마케터 과/차장급 (5-12년) 경력직',
    gradeSrc: 'https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/666f93a3d0304f0ceff1aa35/img/grade@2x.png',
    grade: '50',
    daysLeft: '12'
  }
];

const RTAnnouncements = () => {
  return (
    <div>
      <div className="frame-9">
        <div className="text-wrapper">실시간 인기 공고</div>
        <div className="text-wrapper-9">더보기</div>
      </div>
      <div className="overlap">
        {jobData.map((job, index) => (
          <PopularAnnouncement
            key={index}
            imageSrc={job.imageSrc}
            companyName={job.companyName}
            jobTitle={job.jobTitle}
            gradeSrc={job.gradeSrc}
            grade={job.grade}
            daysLeft={job.daysLeft}
          />
        ))}
      </div>
      <div className="overlap-2">
        {jobData.map((job, index) => (
          <PopularAnnouncement
            key={index}
            imageSrc={job.imageSrc}
            companyName={job.companyName}
            jobTitle={job.jobTitle}
            gradeSrc={job.gradeSrc}
            grade={job.grade}
            daysLeft={job.daysLeft}
          />
        ))}
      </div>
      <div className="overlap-3">
        {jobData.map((job, index) => (
          <PopularAnnouncement
            key={index}
            imageSrc={job.imageSrc}
            companyName={job.companyName}
            jobTitle={job.jobTitle}
            gradeSrc={job.gradeSrc}
            grade={job.grade}
            daysLeft={job.daysLeft}
          />
        ))}
      </div>
      <div className="overlap-4">
        {jobData.map((job, index) => (
          <PopularAnnouncement
            key={index}
            imageSrc={job.imageSrc}
            companyName={job.companyName}
            jobTitle={job.jobTitle}
            gradeSrc={job.gradeSrc}
            grade={job.grade}
            daysLeft={job.daysLeft}
          />
        ))}
      </div>
    </div>
  )
}

export default RTAnnouncements;