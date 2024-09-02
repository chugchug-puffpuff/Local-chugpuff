import React, { useState } from 'react'
import './JobPostingList.css'

const JobPostingList = () => {
  const [regionToggle, setRegionToggle] = useState(false);
  const [jobToggle, setJobToggle] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDetailRegion, setSelectedDetailRegion] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const regions = ["전국", "서울", "경기", "광주", "대구", "대전", "부산", "울산", "인천", "강원", "경남", "경북", "전남", "전북", "충북", "충남", "제주", "세종"];
  const jobs = ["기획·전략", "마케팅·홍보·조사", "회계·세무·재무", "인사·노무·HRD", "총무·법무·사무", "IT개발·데이터", "디자인", "영업·판매·무역", "고객상담·TM", "	구매·자재·물류", "상품기획·MD", "운전·운송·배송", "서비스", "생산", "건설·건축", "의료", "연구·R&D", "교육", "미디어·문화·스포츠", "금융·보험", "	공공·복지"];

  const seoulRegions = [
    "서울전체",
    "종로구",
    "중구",
    "용산구",
    "성동구",
    "광진구",
    "동대문구",
    "중랑구",
    "성북구",
    "강북구",
    "도봉구",
    "노원구",
    "은평구",
    "서대문구",
    "마포구",
    "양천구",
    "강서구",
    "구로구",
    "금천구",
    "영등포구",
    "동작구",
    "관악구",
    "서초구",
    "강남구",
    "송파구",
    "강동구"
]

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  const handleDetailRegionClick = (detailRegion) => {
    setSelectedDetailRegion(detailRegion);
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="JobPostingList-frame-wrapper">
      <div className="JobPostingList-frame-2">
        <div className="JobPostingList-frame-3">
          <div className="JobPostingList-text-wrapper-2">📝</div>
          <div className="JobPostingList-text-wrapper-3">채용 정보</div>
          {selectedRegion && selectedDetailRegion && (
            <div className="frame-4">
              <div className="frame-5">
                <div className="frame-6">
                  <div className="text-wrapper-3">{selectedRegion}</div>
                  <img
                    className="chevron-right"
                    alt="Chevron right"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/chevron-right@2x.png"
                  />
                  <div className="text-wrapper-4">{selectedDetailRegion}</div>
                </div>
                <img
                  className="JobPostingList-img"
                  alt="Close small"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/close-small@2x.png"
                />
              </div>
            </div>
          )}
        </div>
        <div className="JobPostingList-frame-4">
          <div className="JobPostingList-toggle-wrapper">
            <div className="JobPostingList-frame-5" onClick={() => setRegionToggle(!regionToggle)}>
              <img
                className="JobPostingList-img"
                alt="Distance"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/distance@2x.png"
              />
              <div className="JobPostingList-text-wrapper-4">지역</div>
              <img
                className="JobPostingList-img"
                alt="Keyboard arrow down"
                src={regionToggle ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-down@2x.png"}
              />
            </div>
            {regionToggle && (
              <div className="JobPostingList-frame-7">
                <div className="JobPostingList-frame-8">
                  {regions.map((region, index) => (
                    <div
                      className={selectedRegion === region ? "JobPostingList-frame-9" : "JobPostingList-frame-10"}
                      key={index}
                      onClick={() => handleRegionClick(region)}
                    >
                      <div className={selectedRegion === region ? "JobPostingList-text-wrapper-5" : "JobPostingList-text-wrapper-6"}>{region}</div>
                    </div>
                  ))}
                </div>
                <div className="JobPostingList-frame-13">
                  {selectedRegion === "서울" ? (
                    <div className="JobPostingList-frame-14">
                      {seoulRegions.map((detailRegion, index) => (
                        <div
                          className={selectedDetailRegion === detailRegion ? "JobPostingList-frame-9" : "JobPostingList-frame-10"}
                          key={index}
                          onClick={() => handleDetailRegionClick(detailRegion)}
                        >
                          <div className={selectedDetailRegion === detailRegion ? "JobPostingList-text-wrapper-5" : "JobPostingList-text-wrapper-6"}>{detailRegion}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="JobPostingList-p">지역을 선택하면 상세 지역을 확인할 수 있습니다.</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="JobPostingList-toggle-wrapper">
            <div className="JobPostingList-frame-6" onClick={() => setJobToggle(!jobToggle)}>
              <img
                className="JobPostingList-img"
                alt="Work"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/work@2x.png"
              />
              <div className="JobPostingList-text-wrapper-4">직군 · 직무</div>
              <img
                className="JobPostingList-img"
                alt="Keyboard arrow down"
                src={jobToggle ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-down@2x.png"}
              />
            </div>
            {jobToggle && (
              <div className="JobPostingList-frame-7">
                <div className="JobPostingList-frame-8">
                  {jobs.map((job, index) => (
                    <div
                      className={selectedJob === job ? "JobPostingList-frame-9" : "JobPostingList-frame-10"}
                      key={index}
                      onClick={() => handleJobClick(job)}
                    >
                      <div className={selectedJob === job ? "JobPostingList-text-wrapper-5" : "JobPostingList-text-wrapper-6"}>{job}</div>
                    </div>
                  ))}
                </div>
                <div className="JobPostingList-frame-13">
                  <p className="JobPostingList-p">직군을 선택하면 상세 직무를 확인할 수 있습니다.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  )
}

export default JobPostingList