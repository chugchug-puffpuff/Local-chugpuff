import React, { useEffect, useState } from 'react'
import './JobPostingList.css'
import axios from 'axios';

const JobPosting = ({ company, title, experience, education, location, employmentType, dateRange, url }) => (
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
      <div className="JobPostingList-frame-31" onClick={() => window.open(url, '_blank')}>
        <div className="JobPostingList-text-wrapper-14">지원하기</div>
      </div>
    </div>
  </div>
);

const JobPostingList = ({ detailRegion, jobKeyword }) => {
  const [postings, setPostings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const [sortToggle, setSortToggle] = useState(false);
  const [sortType, setSortType] = useState('최신순');

  const sortToggleShow = () => {
    setSortToggle(!sortToggle);
  };

  const sortPosts = (type) => {
    setSortType(type);
    setSortToggle(false);
  };

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
          dateRange: `등록 ${new Date(job['opening-timestamp'] * 1000).toLocaleDateString()} ~ 마감 ${new Date(job['expiration-timestamp'] * 1000).toLocaleDateString()}`,
          url: job.url
        }));
        setPostings(jobs);
        setCurrentPage(1); // 파라미터가 변경되면 페이지 초기화
      } catch (error) {
        console.error('Error fetching job postings:', error);
      }
    };

    fetchData();
  }, [detailRegion, jobKeyword]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postings.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ // 페이지 이동 시 스크롤 중앙으로 이동
      top: 550,
      behavior: 'smooth'
    });
  };

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
              // value={searchKeyword}
              // onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <img
              className="JobPostingList-search"
              alt="Search"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c0b3f3875b7815aadd85/img/search@2x.png"
              // onClick={handleSearch}
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
            {sortType !== '스크랩순' && (
              <div className="JobPostingList-toggle-frame-2" onClick={() => sortPosts('스크랩순')}>
                <div className="JobPostingList-toggle-text-wrapper">스크랩순</div>
              </div>
            )}
            {sortType !== '댓글순' && (
              <div className="JobPostingList-toggle-frame-2" onClick={() => sortPosts('댓글순')}>
                <div className="JobPostingList-toggle-text-wrapper">댓글순</div>
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
        {[...Array(Math.ceil(postings.length / postsPerPage)).keys()].map(number => (
          <div
            key={number + 1}
            className={`JobPostingList-frame-34 ${currentPage === number + 1 ? 'active' : ''}`}
            onClick={() => paginate(number + 1)}
          >
            <div className="JobPostingList-text-wrapper-15">{number + 1}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobPostingList