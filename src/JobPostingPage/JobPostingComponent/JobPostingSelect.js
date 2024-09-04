import React, { useState, useEffect } from 'react';
import './JobPostingSelect.css';
import axios from 'axios';

const JobPostingSelect = ({ setJobPostingListActive, setSelectedDetailRegion, setSelectedJobKeyword }) => {
  const [regionToggle, setRegionToggle] = useState(false);
  const [jobToggle, setJobToggle] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDetailRegion, setSelectedDetailRegionState] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobKeyword, setSelectedJobKeywordState] = useState(null);
  const [detailRegions, setDetailRegions] = useState([]);
  const [jobKeywords, setJobKeywords] = useState([]);

  const regions = {
    "전국": "전국",
    "서울": "서울전체",
    "경기": "경기전체",
    "광주": "광주전체",
    "대구": "대구전체",
    "대전": "대전전체",
    "부산": "부산전체",
    "울산": "울산전체",
    "인천": "인천전체",
    "강원": "강원전체",
    "경남": "경남전체",
    "경북": "경북전체",
    "전남": "전남전체",
    "전북": "전북전체",
    "충북": "충북전체",
    "충남": "충남전체",
    "제주": "제주전체",
    "세종": "세종특별자치시"
  };

  const jobs = ["기획·전략", "마케팅·홍보·조사", "회계·세무·재무", "인사·노무·HRD", "총무·법무·사무", "IT개발·데이터", "디자인", "영업·판매·무역", "고객상담·TM", "구매·자재·물류", "상품기획·MD", "운전·운송·배송", "서비스", "생산", "건설·건축", "의료", "연구·R&D", "교육", "미디어·문화·스포츠", "금융·보험", "공공·복지"];

  // 지역 목록을 반환하는 엔드포인트
  useEffect(() => {
    if (selectedRegion) {
      const regionName = regions[selectedRegion];
      axios.get(`http://localhost:8080/api/job-postings/regions?regionName=${regionName}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          setDetailRegions(response.data);
        })
        .catch(error => {
          console.error('Error fetching detail regions:', error);
        });
    }
  }, [selectedRegion]);

  // 직무 목록을 반환하는 엔드포인트
  useEffect(() => {
    if (selectedJob) {
      axios.get(`http://localhost:8080/api/job-postings/job-names?jobMidName=${selectedJob}`)
        .then(response => {
          setJobKeywords(response.data);
        })
        .catch(error => {
          console.error('Error fetching job keywords:', error);
        });
    }
  }, [selectedJob]);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedDetailRegionState(null); // 지역을 다시 선택할 경우 상세지역 초기화
  };

  const handleDetailRegionClick = (detailRegion) => {
    setSelectedDetailRegionState(detailRegion);
    setSelectedDetailRegion(detailRegion); // 부모 컴포넌트에 전달
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setSelectedJobKeywordState(null); // 직무를 다시 선택할 경우 직무키워드 초기화
  };

  const handlejobKeywordClick = (jobKeyword) => {
    setSelectedJobKeywordState(jobKeyword);
    setSelectedJobKeyword(jobKeyword); // 부모 컴포넌트에 전달
  };

  // 카테고리가 모두 선택이 완료되었다는 것을 알리기 위한 상태 저장(리스트를 띄우기 위해)
  useEffect(() => {
    if (selectedRegion && selectedDetailRegion && selectedJob && selectedJobKeyword) {
      setJobPostingListActive(true);
    } else {
      setJobPostingListActive(false);
    }
  }, [selectedRegion, selectedDetailRegion, selectedJob, selectedJobKeyword]);

  return (
      <div className="JobPostingSelect-frame-2">
        <div className="JobPostingSelect-frame-3">
          <div className="JobPostingSelect-text-wrapper-2">📝</div>
          <div className="JobPostingSelect-text-wrapper-3">채용 정보</div>
          <div className="JobPostingSelect-frame-20">
          {selectedRegion && selectedDetailRegion && (
            <div className="JobPostingSelect-frame-21">
              <div className="JobPostingSelect-frame-22">
                <div className="JobPostingSelect-text-wrapper-10">{selectedRegion}</div>
                <img
                  className="JobPostingSelect-chevron-right"
                  alt="Chevron right"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/chevron-right@2x.png"
                />
                <div className="JobPostingSelect-text-wrapper-11">{selectedDetailRegion}</div>
              </div>
              <img
                className="JobPostingSelect-close"
                alt="Close small"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/close-small@2x.png"
                onClick={() => {
                  setSelectedRegion(null);
                  setSelectedDetailRegionState(null);
                  setSelectedDetailRegion(null); // 부모 컴포넌트에 전달
                }}
              />
            </div>
          )}
          {selectedJob && selectedJobKeyword && (
            <div className="JobPostingSelect-frame-21">
              <div className="JobPostingSelect-frame-22">
                <div className="JobPostingSelect-text-wrapper-10">{selectedJob}</div>
                <img
                  className="JobPostingSelect-chevron-right"
                  alt="Chevron right"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/chevron-right@2x.png"
                />
                <div className="JobPostingSelect-text-wrapper-11">{selectedJobKeyword}</div>
              </div>
              <img
                className="JobPostingSelect-close"
                alt="Close small"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/close-small@2x.png"
                onClick={() => {
                  setSelectedJob(null);
                  setSelectedJobKeywordState(null);
                  setSelectedJobKeyword(null); // 부모 컴포넌트에 전달
                }}
              />
            </div>
          )}
          </div>
        </div>
        <div className="JobPostingSelect-frame-4">
          <div className="JobPostingSelect-toggle-wrapper">
            <div className="JobPostingSelect-frame-5" onClick={() => setRegionToggle(!regionToggle)}>
              <img
                className="JobPostingSelect-img"
                alt="Distance"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/distance@2x.png"
              />
              <div className="JobPostingSelect-text-wrapper-4">지역</div>
              <img
                className="JobPostingSelect-img"
                alt="Keyboard arrow down"
                src={regionToggle ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-down@2x.png"}
              />
            </div>
            {regionToggle && (
              <div className="JobPostingSelect-frame-7">
                <div className="JobPostingSelect-frame-8">
                  {Object.keys(regions).map((region, index) => (
                    <div
                      className={selectedRegion === region ? "JobPostingSelect-frame-9" : "JobPostingSelect-frame-10"}
                      key={index}
                      onClick={() => handleRegionClick(region)}
                    >
                      <div className={selectedRegion === region ? "JobPostingSelect-text-wrapper-5" : "JobPostingSelect-text-wrapper-6"}>{region}</div>
                    </div>
                  ))}
                </div>
                <div className="JobPostingSelect-frame-13">
                  {selectedRegion ? (
                    <div className="JobPostingSelect-frame-14">
                      {detailRegions.map((detailRegion, index) => (
                        <div
                          className={selectedDetailRegion === detailRegion ? "JobPostingSelect-frame-9" : "JobPostingSelect-frame-10"}
                          key={index}
                          onClick={() => handleDetailRegionClick(detailRegion)}
                        >
                          <div className={selectedDetailRegion === detailRegion ? "JobPostingSelect-text-wrapper-5" : "JobPostingSelect-text-wrapper-6"}>{detailRegion}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="JobPostingSelect-p">지역을 선택하면 상세 지역을 확인할 수 있습니다.</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="JobPostingSelect-toggle-wrapper">
            <div className="JobPostingSelect-frame-6" onClick={() => setJobToggle(!jobToggle)}>
              <img
                className="JobPostingSelect-img"
                alt="Work"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/work@2x.png"
              />
              <div className="JobPostingSelect-text-wrapper-4">직군 · 직무</div>
              <img
                className="JobPostingSelect-img"
                alt="Keyboard arrow down"
                src={jobToggle ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-down@2x.png"}
              />
            </div>
            {jobToggle && (
              <div className="JobPostingSelect-frame-7">
                <div className="JobPostingSelect-frame-8">
                  {jobs.map((job, index) => (
                    <div
                      className={selectedJob === job ? "JobPostingSelect-frame-9" : "JobPostingSelect-frame-10"}
                      key={index}
                      onClick={() => handleJobClick(job)}
                    >
                      <div className={selectedJob === job ? "JobPostingSelect-text-wrapper-5" : "JobPostingSelect-text-wrapper-6"}>{job}</div>
                    </div>
                  ))}
                </div>
                <div className="JobPostingSelect-frame-13">
                  {selectedJob ? (
                    <div className="JobPostingSelect-frame-14">
                      {jobKeywords.map((jobKeyword, index) => (
                        <div
                          className={selectedJobKeyword === jobKeyword ? "JobPostingSelect-frame-9" : "JobPostingSelect-frame-10"}
                          key={index}
                          onClick={() => handlejobKeywordClick(jobKeyword)}
                        >
                          <div className={selectedJobKeyword === jobKeyword ? "JobPostingSelect-text-wrapper-5" : "JobPostingSelect-text-wrapper-6"}>{jobKeyword}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="JobPostingSelect-p">직군을 선택하면 상세 직무를 확인할 수 있습니다.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default JobPostingSelect;