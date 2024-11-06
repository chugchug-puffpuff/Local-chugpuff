import React, { useState, useEffect } from 'react'
import './RecruitInfo.css'
import axios from 'axios';
import grade_icon from '../../Icon/grade.png'

// 게시일 포맷팅
const formatPostingDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 등록일&마감일 포맷팅
const formatTimeStampWithDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
  const formattedDate = date.toLocaleString('ko-KR', options);
  return `${formattedDate.replace(',', '')}`;
}

const RecruitInfo = ({ jobInfo, commentCount }) => {
  const [scrapCount, setScrapCount] = useState(0);
  const [isScraped, setIsScraped] = useState(false);
  const [imageUrl, setImageUrl] = useState('https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2d8cf4d8f7eb28bb7ce11/img/image-2.png');

  useEffect(() => {
    if (jobInfo && jobInfo.length > 0) {
      const fetchScrapCount = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/job-postings/${jobInfo[0].jobId}/scrap-count`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setScrapCount(response.data);
        } catch (error) {
          console.error('Error fetching scrap count:', error);
        }
      };
      fetchScrapCount();
      fetchScraped();
    }
  }, [jobInfo]);

  useEffect(() => {
    if (jobInfo && jobInfo.length > 0) {
      const job = jobInfo[0];
      const fetchImage = async () => {
        try {
          const response = await axios.get(`https://api.bing.microsoft.com/v7.0/images/search?q=${job.title} 로고`, {
            headers: { 'Ocp-Apim-Subscription-Key': 'bc8c89569c734e4bb6f4397e67bc361f' }
          });
          if (response.data.value && response.data.value.length > 0) {
            setImageUrl(response.data.value[0].contentUrl);
          }
        } catch (error) {
          console.error('Error fetching image from Bing API', error);
        }
      };

      fetchImage();
    }
  }, [jobInfo]);

  if (!jobInfo || jobInfo.length === 0) {
    return <div>Loading...</div>;
  }

  const job = jobInfo[0];

  // 스크랩 클릭 엔드포인트
  const handleScrapClick = async () => {
    try {
      await axios.post(`http://localhost:8080/api/job-postings/${jobInfo[0].jobId}/scrap`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const response = await axios.get(`http://localhost:8080/api/job-postings/${jobInfo[0].jobId}/scrap-count`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setScrapCount(response.data);
      await fetchScraped();
    } catch (error) {
      console.error('Error posting scrap:', error);
    }
  };

  const fetchScraped = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/job-postings/scraps', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      const parsedData = response.data.map(item => JSON.parse(item)); // 개별 파싱
      const allJobs = parsedData.flatMap(data => data.jobs.job); // job 배열 병합
      const filteredJobs = allJobs.filter(job => job.id); // id가 있는 job 필터링
      const mappedJobs = filteredJobs.map(job => ({scrapedJobId: job.id}));
      if (mappedJobs.some(item => item.scrapedJobId === jobInfo[0].jobId)) {
        setIsScraped(true);
      } else {
        setIsScraped(false);
      }
    } catch (error) {
      console.error('Error fetching scraped jobs:', error);
    }
  }

  return (
    <div className="RecruitInfo-frame-2">
      <div className="RecruitInfo-text-wrapper">채용 공고</div>
      <div className="RecruitInfo-frame-3">
        <div className="RecruitInfo-frame-4">
          <div className="RecruitInfo-frame-5">
            <div className="RecruitInfo-titleAndApply">
              <div className="RecruitInfo-frame-6">
                <div className="RecruitInfo-text-wrapper-2">{job.company}</div>
              </div>
              <div className="RecruitInfo-frame-10" onClick={() => window.open(job.url, '_blank')}>
                <div className="RecruitInfo-text-wrapper-5">지원하기</div>
              </div>
            </div>
            <div className="RecruitInfo-frame-11">
              <div className="RecruitInfo-text-wrapper-6">{formatPostingDate(job.postingDate)}</div>
            </div>
            <div className="RecruitInfo-frame-7">
              <p className="RecruitInfo-p">{job.title}</p>
            </div>
            <div className="RecruitInfo-scrapAndComment">
              <div className="RecruitInfo-scrap-wrapper">
                <img
                  className={`RecruitInfo-scrap ${isScraped ? 'scraped' : ''}`}
                  alt="scrap"
                  src={grade_icon}
                  onClick={handleScrapClick}
                />
                <div className="RecruitInfo-scrapCounts">스크랩 {scrapCount}</div>
              </div>
              <div className="RecruitInfo-comment-wrapper">
                <img
                  className="RecruitInfo-comment"
                  alt="comment"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/sms@2x.png"
                />
                <div className="RecruitInfo-commentCounts">댓글 {commentCount}</div>
              </div>
            </div>
          </div>
          <img
            className="RecruitInfo-line"
            alt="Line"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/line-2.png"
          />
          <img
            className="RecruitInfo-image"
            alt="기업 이미지 로고"
            src={imageUrl}
          />
          <div className="RecruitInfo-frame-8">
            <div className="RecruitInfo-frame-9">
              <div className="RecruitInfo-text-wrapper-3">📝 모집부문</div>
              <div className="RecruitInfo-text-wrapper-4">- 산업 : {job.industry}</div>
              <div className="RecruitInfo-text-wrapper-4">- 직군 : {job.jobMidCode}</div>
              <div className="RecruitInfo-text-wrapper-4">- 직무 : {job.jobCode.replace(/,/g, ', ')}</div>
              <div className="RecruitInfo-text-wrapper-4">- 지역 : {job.location.replace(/&gt;/g, '')}</div>
            </div>
            <div className="RecruitInfo-frame-9">
              <div className="RecruitInfo-text-wrapper-3">📝 자격요건</div>
              <div className="RecruitInfo-text-wrapper-4">- 경력 : {job.experience}</div>
              <div className="RecruitInfo-text-wrapper-4">- 학력 : {job.education}</div>
            </div>
            <div className="RecruitInfo-frame-9">
              <div className="RecruitInfo-text-wrapper-3">📝 근무조건</div>
              <div className="RecruitInfo-text-wrapper-4">- 근무형태 : {job.employmentType}</div>
              <div className="RecruitInfo-text-wrapper-4">- 연봉 : {job.salary}</div>
            </div>
            <div className="RecruitInfo-frame-9">
              <div className="RecruitInfo-text-wrapper-3">📝 접수기간</div>
              <div className="RecruitInfo-text-wrapper-4">{formatTimeStampWithDay(job.openingDate)} ~ {formatTimeStampWithDay(job.expirationDate)} ({job.closeType})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruitInfo