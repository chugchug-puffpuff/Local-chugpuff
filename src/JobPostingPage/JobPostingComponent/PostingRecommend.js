import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './PostingRecommend.css'
import axios from 'axios';

const PostingRecommend = () => {
  const [showMore, setShowMore] = useState(false);
  const [postRecommend, setPostRecommend] = useState([]);
  const displayedRecommendations = showMore ? postRecommend.slice(0, 8) : postRecommend.slice(0, 4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/job-postings/recommendations", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const jobRecommendations = response.data.jobs.job.map(job => {
          const expirationTimestamp = job['expiration-timestamp'] * 1000;
          const currentTime = new Date().getTime();
          const timeDifference = expirationTimestamp - currentTime;
          const expirationDay = `D-${Math.ceil(timeDifference / (1000 * 60 * 60 * 24))}`;

          return {
            jobId: job.id,
            company: job.company.detail.name,
            title: job.position.title,
            expirationDay: expirationDay,
          };
        });
        setPostRecommend(jobRecommendations);
      } catch (error) {
        console.error('Error fetching job postings:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="PostingRecommend-frame">
        <p className="PostingRecommend-text-wrapper">🌟 나에게 맞는 공고 추천</p>
        <div className="PostingRecommend-div" onClick={() => setShowMore(!showMore)}>
          {showMore ? '닫기' : '더보기'}
        </div>
      </div>
      <div className="PostingRecommend-frame-7">
        {displayedRecommendations.map((job, index) => (
          <div className="PostingRecommend-group" key={index}>
            <Link to={`/recruitinfo/${job.jobId}`}>
              <div className="PostingRecommend-overlap-group">
                <img
                  className="PostingRecommend-image"
                  alt="Image"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/image-2-1@2x.png"
                />
                <div className="PostingRecommend-frame-8">
                  <div className="PostingRecommend-text-wrapper-5">{job.company}</div>
                  <div className="PostingRecommend-frame-9">
                    <div className="PostingRecommend-frame-10">
                      <p className="PostingRecommend-text-wrapper-6">{job.title}</p>
                    </div>
                    <div className="PostingRecommend-frame-11">
                      <div className="PostingRecommend-frame-12">
                        <div className="PostingRecommend-grade-wrapper">
                          <img
                            className="PostingRecommend-grade"
                            alt="Grade"
                            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/grade-11@2x.png"
                          />
                        </div>
                        <div className="PostingRecommend-frame-13">
                          <div className="PostingRecommend-text-wrapper-7">30</div>
                        </div>
                      </div>
                      <div className="PostingRecommend-text-wrapper-8">{job.expirationDay}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostingRecommend