import React, { useEffect, useState } from 'react'
import './JobPostingList.css'
import axios from 'axios';

const JobPosting = ({ company, title, experience, education, location, employmentType, dateRange }) => (
  <div className="JobPostingList-frame-23">
    <div className="JobPostingList-frame-24">
      <div className="JobPostingList-text-wrapper-10">{company}</div>
    </div>
    <div className="JobPostingList-frame-25">
      <div className="JobPostingList-frame-26">
        <div className="JobPostingList-frame-27">
          <div className="JobPostingList-frame-28">
            <p className="JobPostingList-text-wrapper-11">{title}</p>
          </div>
          <div className="JobPostingList-frame-29">
            <div className="JobPostingList-frame-30">
              <div className="JobPostingList-text-wrapper-12">{experience}</div>
            </div>
            <div className="JobPostingList-frame-30">
              <div className="JobPostingList-text-wrapper-12">{education}</div>
            </div>
            <div className="JobPostingList-frame-30">
              <div className="JobPostingList-text-wrapper-12">{location}</div>
            </div>
            <div className="JobPostingList-text-wrapper-12">{employmentType}</div>
          </div>
        </div>
        <p className="JobPostingList-text-wrapper-13">{dateRange}</p>
        <div className="JobPostingList-scrapAndComment">
          <div className="JobPostingList-scrap-wrapper">
            <img
              className="JobPostingList-scrap"
              alt="scrap"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/grade@2x.png"
            />
            {/* <div className="JobPostingList-scrapCounts">{scrapCounts}</div> */}
            <div className="JobPostingList-scrapCounts">30</div>
          </div>
          <div className="JobPostingList-comment-wrapper">
            <img
              className="JobPostingList-comment"
              alt="comment"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/sms@2x.png"
            />
            {/* <div className="JobPostingList-commentCounts">{commentCounts}</div> */}
            <div className="JobPostingList-commentCounts">20</div>
          </div>
        </div>
      </div>
      <div className="JobPostingList-frame-31">
        <div className="JobPostingList-text-wrapper-14">지원하기</div>
      </div>
    </div>
  </div>
);

const JobPostingList = ({ detailRegion, jobKeyword }) => {
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/job-postings?regionName=${detailRegion}&jobName=${jobKeyword}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const jobs = response.data.jobs.job.map(job => ({
          company: job.company.detail.name,
          title: job.position.title,
          experience: job.position['experience-level'].name,
          education: job.position['required-education-level'].name,
          location: job.position.location.name,
          employmentType: job.position['job-type'].name,
          dateRange: `등록 ${new Date(job['opening-timestamp'] * 1000).toLocaleDateString()} ~ 마감 ${new Date(job['expiration-timestamp'] * 1000).toLocaleDateString()}`
        }));
        setPostings(jobs);
      } catch (error) {
        console.error('Error fetching job postings:', error);
      }
    };

    fetchData();
  }, [detailRegion, jobKeyword]);

  return (
    <div className="JobPostingList-frame-18">
      <div className="JobPostingList-div">
        <div className="JobPostingList-text-wrapper-8">전체 ({postings.length}건)</div>
        <div className="JobPostingList-frame-19">
          <div className="JobPostingList-frame-20">
            <div className="JobPostingList-text-wrapper-9">추천순</div>
            <img
              className="JobPostingList-img"
              alt="Keyboard arrow down"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-down@2x.png"
            />
          </div>
          <div className="JobPostingList-frame-21">
            <div className="JobPostingList-text-wrapper-9">기업명, 공고제목 등</div>
            <img
              className="JobPostingList-img"
              alt="Search"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/search@2x.png"
            />
          </div>
        </div>
      </div>
      <div className="JobPostingList-frame-22">
        {postings.map((posting, index) => (
          <React.Fragment key={index}>
            <JobPosting {...posting} />
            <img
              className="JobPostingList-line-2"
              alt="Line"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/line-2.png"
            />
          </React.Fragment>
        ))}
      </div>
      <div className="JobPostingList-frame-32">
        <div className="JobPostingList-frame-33">
          <div className="JobPostingList-text-wrapper-15">1</div>
        </div>
        <div className="JobPostingList-frame-34">
          <div className="JobPostingList-text-wrapper-16">2</div>
        </div>
        <div className="JobPostingList-frame-34">
          <div className="JobPostingList-text-wrapper-17">3</div>
        </div>
      </div>
    </div>
  )
}

export default JobPostingList