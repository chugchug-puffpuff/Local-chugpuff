import React, { useState, useEffect } from 'react'
import './RecruitInfoPage.css'
import RecruitInfo from './JobPostingComponent/RecruitInfo.js'
import InfoSquare from './JobPostingComponent/InfoSquare.js'
import JobComment from './JobPostingComponent/JobComment.js'
import NavBar from "../MainPage/MainComponent/NavBar.js";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import format_list_bulleted_icon from '../Icon/format_list_bulleted.png'

const RecruitInfoPage = ({ authenticate, setAuthenticate }) => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobInfo, setJobInfo] = useState(null);
  const [userName, setUserName] = useState('');
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchJobInfo = async () => {
      try { // 특정공고 조회 엔드포인트
        const response = await axios.get(`http://localhost:8080/api/job-postings/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.code === 4) {
          setJobInfo('Exceeded'); // api 요청횟수가 초과했을 경우의 상태 추가
        } else {
          const jobInfoData = response.data.jobs.job.map(job => ({
            jobId: job.id, // 공고 id
            company: job.company.detail.name, // 기업명
            title: job.position.title, // 제목
            industry: job.position.industry.name, // 업종
            location: job.position.location.name, // 지역
            employmentType: job.position['job-type'].name, // 고용형태(정규직, 비정규직)
            jobMidCode: job.position['job-mid-code'].name, // 직군
            jobCode: job.position['job-code'].name, // 직무
            experience: job.position['experience-level'].name, // 경력
            education: job.position['required-education-level'].name, // 학력
            salary: job.salary.name, // 연봉
            postingDate: job['posting-timestamp'], // 게시일
            openingDate: job['opening-timestamp'], // 접수 시작일
            expirationDate: job['expiration-timestamp'], // 접수 종료일
            closeType: job['close-type'].name, // 접수 마감 유형(상시, 수시 등등)
            infoUrl: job.company.detail.href, // 상세 정보 URL
            url: job.url // 지원 링크
          }));
          setJobInfo(jobInfoData);
        }
      } catch (error) {
        console.error('Error fetching job info:', error);
      }
    };

    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');
        const response = await fetch(`http://localhost:8080/api/members/username/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        console.error('Failed to fetch user name:', error);
      }
    };

    fetchJobInfo();
    fetchUserName();
  }, [jobId]);

  const updateCommentCount = (newCount) => {
    setCommentCount(newCount);
  };

  return (
    <div className="RecruitInfoPage">
      <div className="RecruitInfoPage-frame">
        <div className="RecruitInfoPage-div">
          {jobInfo === 'Exceeded' ? (
            <div className='RecruitInfoPage-over'>오늘 하루 이용가능한 사람인 API 요청 횟수를 초과했습니다.</div>
          ) : (
            <>
              <RecruitInfo jobInfo={jobInfo} commentCount={commentCount} />
              <InfoSquare jobInfo={jobInfo} />
              <img
                className="RecruitInfoPage-line-2"
                alt="Line"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2d8cf4d8f7eb28bb7ce11/img/line-17.png"
              />
              <JobComment 
                storedUserName={userName} 
                company={jobInfo?.[0]?.company} 
                jobId={jobInfo?.[0]?.jobId} 
                updateCommentCount={updateCommentCount}
              />
            </>
          )}
          <div className="CommunityPost-frame-19"onClick={() => navigate('/jobposting')}>
            <img
              className="CommunityPost-format-list-bulleted"
              alt="Format list bulleted"
              src={format_list_bulleted_icon}
            />
            <div className="CommunityPost-text-wrapper-13">목록 보기</div>
          </div>
        </div>
      </div>
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
}

export default RecruitInfoPage