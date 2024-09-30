import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './JobPostingList.css';
import axios from 'axios';
import Pagination from '../../Route/Pagination';

const JobPosting = ({ jobId, company, title, experience, education, location, employmentType, dateRange, url, commentCount, scrapCount, scraped }) => (
  <div className="JobPostingList-frame-23">
    <div className="JobPostingList-frame-24">
      <div className="JobPostingList-text-wrapper-10">{company}</div>
    </div>
    <div className="JobPostingList-frame-25">
      <div className="JobPostingList-frame-26">
        <div className="JobPostingList-frame-27">
          <Link to={`/recruitinfo/${jobId}`}>
            <div className="JobPostingList-frame-28">
              <p className="JobPostingList-text-wrapper-11">{title}</p>
            </div>
          </Link>
          <div className="JobPostingList-frame-29">
            <div className="JobPostingList-text-wrapper-12">{experience}</div>
            <div className="JobPostingList-text-wrapper-12">{education}</div>
            <div className="JobPostingList-text-wrapper-12">{employmentType}</div>
            <div className="JobPostingList-text-wrapper-12">{location.replace(/&gt;/g, '').split(',')[0]}</div>
          </div>
        </div>
        <p className="JobPostingList-text-wrapper-13">{dateRange}</p>
        <div className="JobPostingList-scrapAndComment">
          <div className="JobPostingList-scrap-wrapper">
            <img
              className={`JobPostingList-scrap ${scraped ? 'scraped' : ''}`}
              alt="scrap"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/grade@2x.png"
            />
            <div className="JobPostingList-scrapCounts">{scrapCount}</div>
          </div>
          <div className="JobPostingList-comment-wrapper">
            <img
              className="JobPostingList-comment"
              alt="comment"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/sms@2x.png"
            />
            <div className="JobPostingList-commentCounts">{commentCount}</div>
          </div>
        </div>
      </div>
      <div className="JobPostingList-frame-31" onClick={() => window.open(url, '_blank')}>
        <div className="JobPostingList-text-wrapper-14">지원하기</div>
      </div>
    </div>
  </div>
);

const JobPostingList = ({ detailRegion, jobMidname, jobKeyword }) => {
  const [postings, setPostings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const [sortToggle, setSortToggle] = useState(false);
  const [sortType, setSortType] = useState('최신순');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [scrapedJobs, setScrapedJobs] = useState([]);

  const sortToggleShow = () => {
    setSortToggle(!sortToggle);
  };

  const sortPosts = (type) => {
    setSortType(type);
    setSortToggle(false);
  };

  const fetchCommentsCount = useCallback(async (jobId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/job-postings/${jobId}/comments`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data.length;
    } catch (error) {
      console.error('Error fetching comments count:', error);
      return 0;
    }
  }, []);

  const fetchScrapCount = useCallback(async (jobId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/job-postings/${jobId}/scrap-count`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data || 0;
    } catch (error) {
      console.error('Error fetching scrap count:', error);
      return 0;
    }
  }, []);

  const fetchJobs = useCallback(async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const jobs = await Promise.all(response.data.jobs.job.map(async job => {
        const commentCount = await fetchCommentsCount(job.id);
        const scrapCount = await fetchScrapCount(job.id);
        return {
          jobId: job.id,
          company: job.company.detail.name,
          title: job.position.title,
          experience: job.position['experience-level'].name,
          education: job.position['required-education-level'].name,
          location: job.position.location.name,
          employmentType: job.position['job-type'].name,
          dateRange: `등록 ${new Date(job['opening-timestamp'] * 1000).toLocaleDateString()} ~ 마감 ${new Date(job['expiration-timestamp'] * 1000).toLocaleDateString()}`,
          url: job.url,
          commentCount: commentCount,
          scrapCount: scrapCount
        };
      }));
      setPostings(jobs);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching job postings:', error);
    }
  }, [fetchCommentsCount, fetchScrapCount]);

  useEffect(() => {
    let selectedType;
    if (sortType === '최신순') {
      selectedType = 'pa';
    } else if (sortType === '마감순') {
      selectedType = 'da';
    } else if (sortType === '조회순') {
      selectedType = 'rc';
    }
    const url = `http://localhost:8080/api/job-postings?jobMidname=${jobMidname}&jobName=${jobKeyword}&regionName=${detailRegion}&sort=${selectedType}`;
    fetchJobs(url);
  }, [detailRegion, jobMidname, jobKeyword, sortType, fetchJobs]);

  const handleSearch = async () => {
    let selectedType;
    if (sortType === '최신순') {
      selectedType = 'pa';
    } else if (sortType === '마감순') {
      selectedType = 'da';
    } else if (sortType === '조회순') {
      selectedType = 'rc';
    }
    const url = `http://localhost:8080/api/job-postings/search?jobMidname=${jobMidname}&jobName=${jobKeyword}&regionName=${detailRegion}&keywords=${searchKeyword}&sort=${selectedType}`;
    fetchJobs(url);
  };

  // 스크랩한 공고 목록 가져온 다음 리스트에 스크랩한 공고 표시
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
        setScrapedJobs(filteredJobs.map(job => job.id));
      } catch (error) {
        console.error('Error fetching job postings:', error);
      }
    });
  }, []);

  // 페이지네이션
  const totalPages = Math.ceil(postings.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postings.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="JobPostingList-frame-18">
      <div className="JobPostingList-div">
        <div className="JobPostingList-text-wrapper-8">전체 ({postings.length}건)</div>
        <div className="JobPostingList-frame-19">
          <div className={`JobPostingList-toggle ${sortToggle ? 'active' : ''}`} onClick={sortToggleShow} style={{ height: '43px' }}>
            <div className="JobPostingList-toggle-text-wrapper">{sortType}</div>
            <img
              className="JobPostingList-img"
              alt="arrow down & up"
              src={sortToggle 
                ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-up@2x.png" 
                : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-down@2x.png"}
            />
          </div>
          <div className="JobPostingList-frame-21">
            <input
              type="text"
              className="JobPostingList-toggle-text-wrapper search-input"
              placeholder="기업명, 공고제목 등"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <img
              className="JobPostingList-search"
              alt="Search"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c0b3f3875b7815aadd85/img/search@2x.png"
              onClick={handleSearch}
            />
          </div>
        </div>
        {sortToggle && (
          <div className="JobPostingList-toggle-frame">
            {sortType !== '최신순' && (
              <div className="JobPostingList-toggle-frame-2" onClick={() => sortPosts('최신순')}>
                <div className="JobPostingList-toggle-text-wrapper">최신순</div>
              </div>
            )}
            {sortType !== '조회순' && (
              <div className="JobPostingList-toggle-frame-2" onClick={() => sortPosts('조회순')}>
                <div className="JobPostingList-toggle-text-wrapper">조회순</div>
              </div>
            )}
            {sortType !== '마감순' && (
              <div className="JobPostingList-toggle-frame-2" onClick={() => sortPosts('마감순')}>
                <div className="JobPostingList-toggle-text-wrapper">마감순</div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="JobPostingList-frame-22">
        {currentPosts.map((posting, index) => (
          <React.Fragment key={index}>
            <JobPosting {...posting} scraped={scrapedJobs.includes(posting.jobId)} />
            <img
              className="JobPostingList-line-2"
              alt="Line"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/line-2.png"
            />
          </React.Fragment>
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} scrollTop={550} />
    </div>
  );
};

export default JobPostingList;