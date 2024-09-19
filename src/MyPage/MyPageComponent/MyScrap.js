import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyScrap.css';
import axios from 'axios';
import Pagination from '../../Route/Pagination';

const MyScrap = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:8080/api/job-postings/scraps', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      try {
        const parsedData = response.data.map(item => JSON.parse(item)); // 개별 파싱
        const allJobs = parsedData.flatMap(data => data.jobs.job); // job 배열 병합
        const filteredJobs = allJobs.filter(job => job.id); // id가 있는 job 필터링
        const mappedJobs = filteredJobs.map(job => ({
          jobId: job.id,
          company: job.company.detail.name,
          title: job.position.title,
          experience: job.position['experience-level'].name,
          education: job.position['required-education-level'].name,
          location: job.position.location.name,
          employmentType: job.position['job-type'].name,
          dateRange: `등록 ${new Date(job['opening-timestamp'] * 1000).toLocaleDateString()} ~ 마감 ${new Date(job['expiration-timestamp'] * 1000).toLocaleDateString()}`,
          url: job.url,
        }));
        // 마감일 순으로 정렬
        const sortedJobs = mappedJobs.sort((a, b) => a.expirationTimestamp - b.expirationTimestamp);
        setJobs(sortedJobs);
      } catch (error) {
        console.error('Error parsing job postings:', error);
      }
    })
    .catch(error => {
      console.error('Error fetching job postings:', error);
    });
  }, []);

  const postsPerPage = 4; // 한 페이지에 보여질 목록 개수
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentJobs = jobs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(jobs.length / postsPerPage);

  return (
    <div className="MyScrap">
      <div className="MyScrap-text-wrapper-2">스크랩한 공고</div>
      <div className="MyScrap-frame-wrapper">
        <div className="MyScrap-frame-5">
          <div className="MyScrap-frame-6">
            <div className="MyScrap-text-wrapper-3">전체 ({jobs.length}건)</div>
          </div>
          <div className="MyScrap-frame-7">
            <div className="MyScrap-frame-8">
              {/* <div className="MyScrap-frame-9">
                <img
                  className="MyScrap-img"
                  alt="Check box outline"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2e3b54cbc5fc1778d008d/img/check-box-outline-blank@2x.png"
                />
                <div className="MyScrap-text-wrapper-4">선택한 공고 삭제</div>
              </div> */}
              <img
                className="MyScrap-line"
                alt="Line"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2e3b54cbc5fc1778d008d/img/line-2.png"
              />
            </div>
            {currentJobs.map(job => (
              <div key={job.jobId} className="MyScrap-frame-11">
                <div className="MyScrap-frame-12">
                  {/* <img
                    className="MyScrap-img"
                    alt="Check box outline"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2e3b54cbc5fc1778d008d/img/check-box-outline-blank-1@2x.png"
                  /> */}
                  <div className="MyScrap-frame-13">
                    <div className="MyScrap-frame-14">
                      <div className="MyScrap-frame-15">
                        <div className="MyScrap-text-wrapper-5">{job.company}</div>
                      </div>
                      <p className="MyScrap-p">{job.dateRange}</p>
                    </div>
                    <div className="MyScrap-frame-16">
                      <div className="MyScrap-frame-17">
                        <div className="MyScrap-frame-18">
                          <Link to={`/recruitinfo/${job.jobId}`}>
                            <p className="MyScrap-text-wrapper-6">{job.title}</p>
                          </Link>
                        </div>
                        <div className="MyScrap-frame-19">
                          <div className="MyScrap-frame-20">
                            <div className="MyScrap-text-wrapper-7">{job.experience}</div>
                          </div>
                          <div className="MyScrap-frame-20">
                            <div className="MyScrap-text-wrapper-7">{job.education}</div>
                          </div>
                          <div className="MyScrap-frame-20">
                            <div className="MyScrap-text-wrapper-7">{job.location.replace(/&gt;/g, '').split(',')[0]}</div>
                          </div>
                          <div className="MyScrap-text-wrapper-7">{job.employmentType}</div>
                        </div>
                      </div>
                      <div className="MyScrap-frame-21" onClick={() => window.open(job.url, '_blank')}>
                        <div className="MyScrap-text-wrapper-8">지원하기</div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="MyScrap-line"
                  alt="Line"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2e3b54cbc5fc1778d008d/img/line-2.png"
                />
              </div>
            ))}
          </div>
          <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} scrollTop={0} />
        </div>
      </div>
    </div>
  );
};

export default MyScrap;