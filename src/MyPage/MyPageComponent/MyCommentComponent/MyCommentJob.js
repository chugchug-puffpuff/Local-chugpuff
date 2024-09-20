import React, { useState, useEffect } from 'react'
import './MyCommentBoard.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Pagination from '../../../Route/Pagination.js';

const MyCommentJob = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobComments = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const commentResponse = await axios.get('http://localhost:8080/api/job-postings/comments/user', config);
        const jobIds = [...new Set(commentResponse.data.map(comment => comment.jobId))];

        const jobPromises = jobIds.map(jobId => 
          axios.get(`http://localhost:8080/api/job-postings/${jobId}`, config)
        );
        
        const jobResponses = await Promise.all(jobPromises);
        const mappingData = jobResponses
          .filter(response => response.data.jobs.job.length > 0) // 마감되거나 삭제된 공고는 제외
          .map((response) => {
            const job = response.data.jobs.job[0];
            return {
              jobId: job.id,
              company: job.company.detail.name,
              title: job.position.title,
              experience: job.position['experience-level'].name,
              education: job.position['required-education-level'].name,
              location: job.position.location.name,
              employmentType: job.position['job-type'].name,
              dateRange: `등록 ${new Date(job['opening-timestamp'] * 1000).toLocaleDateString()} ~ 마감 ${new Date(job['expiration-timestamp'] * 1000).toLocaleDateString()}`,
              url: job.url
            };
          });

        setJobs(mappingData);
      } catch (error) {
        console.error('Error fetching job comments', error);
      }
    };

    fetchJobComments();
  }, []);

  const postsPerPage = 4; // 한 페이지에 보여질 목록 개수
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentJobs = jobs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(jobs.length / postsPerPage);

  return (
    <div>
      <div className="MyScrap-frame-7">
        {currentJobs.map((job, index) => (
          <div key={job.jobId} className="MyScrap-frame-11">
            <div className="MyScrap-frame-12">
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
            {index < currentJobs.length - 1 && (
              <img
                className="MyScrap-line"
                alt="Line"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2e3b54cbc5fc1778d008d/img/line-2.png"
              />
            )}
          </div>
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} scrollTop={0} />
    </div>
  )
}

export default MyCommentJob