import React, { useState, useEffect } from 'react';
import './RTAnnouncements.css';
import PopularAnnouncement from './RTAComponents/PopularAnnouncement';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RTAnnouncements = ({ authenticate }) => {
  const navigate = useNavigate();
  const [jobPostings, setJobPostings] = useState([]);
  const [scrapedJobs, setScrapedJobs] = useState([]);

  // 공고 별 스크랩 수 불러오기
  const fetchScrapCount = async (jobId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/job-postings/${jobId}/scrap-count`);
      return response.data || 0;
    } catch (error) {
      console.error('Error fetching scrap count:', error);
      return 0;
    }
  };

  useEffect(() => {
    const fetchJobs = async (url) => {
      try {
        const response = await axios.get(url);
        console.log(response.data.code)
        if (response.data.code === 4) {
          setJobPostings([]); // api 요청 횟수를 초과하였을때 빈칸으로 초기화
        } else {
          const jobs = await Promise.all(response.data.jobs.job.map(async job => {

            const expirationTimestamp = job['expiration-timestamp'] * 1000;
            const currentTime = new Date().getTime();
            const timeDifference = expirationTimestamp - currentTime;
            const expirationDay = `D-${Math.ceil(timeDifference / (1000 * 60 * 60 * 24))}`;

            const scrapCount = await fetchScrapCount(job.id);
            return {
              jobId: job.id,
              company: job.company.detail.name,
              title: job.position.title,
              expirationDay: expirationDay,
              scrapCount: scrapCount
            };
          }));
          setJobPostings(jobs);
        }
      } catch (error) {
        console.error('Error fetching job postings:', error);
      }
    };

    const url = `http://localhost:8080/api/job-postings?sort=rc`;
    fetchJobs(url);

    const fetchScrapedJobs = async () => {
      if (authenticate) {
        try {
          const response = await axios.get('http://localhost:8080/api/job-postings/scraps', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const parsedData = response.data.map(item => JSON.parse(item));
          const allJobs = parsedData.flatMap(data => data.jobs.job);
          const filteredJobs = allJobs.filter(job => job.id);
          setScrapedJobs(filteredJobs.map(job => job.id));
        } catch (error) {
          console.error('Error fetching job postings:', error);
        }
      }
    };

    fetchScrapedJobs();
  }, [authenticate]);

  return (
    <div>
      <div className="RTAnnouncements-frame">
        <div className="RTAnnouncements-text-wrapper">실시간 인기 공고</div>
        <div className="RTAnnouncements-text-wrapper-2" onClick={() => navigate('/jobposting')}>더보기</div>
      </div>
      <div className="RTAnnouncements-overlap-container">
        {jobPostings.length === 0 ? (
          <p className='RTAnnouncements-over'>오늘 하루 이용가능한 사람인 API 요청 횟수를 초과했습니다.</p>
        ) : (
          jobPostings.slice(0, 4).map((job, index) => (
            <div key={index} className={`RTAnnouncements-overlap RTAnnouncements-overlap-${index + 1}`}>
              <PopularAnnouncement
                jobId={job.jobId}
                company={job.company}
                title={job.title}
                expirationDay={job.expirationDay}
                scrapCount={job.scrapCount}
                scraped={scrapedJobs.includes(job.jobId)}
                authenticate={authenticate}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RTAnnouncements;