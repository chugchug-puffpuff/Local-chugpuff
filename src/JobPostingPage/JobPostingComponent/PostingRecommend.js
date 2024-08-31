import React, { useState } from 'react'
import './PostingRecommend.css'

const jobRecommendations = [
  {
    company: "(주)그레이고",
    position: "패션 마케터 과/차장급 (5-12년) 경력직",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6672cc7b5445d7af1e4bee20/img/image-1@2x.png",
    grade: 50,
    daysLeft: 12
  },
  {
    company: "㈜보스반도체",
    position: "SOC RTL design Engineer",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6672cc7b5445d7af1e4bee20/img/image-2@2x.png",
    grade: 12,
    daysLeft: 6
  },
  {
    company: "㈜와이오엘",
    position: "포워딩 영업 경력 모집",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/image-1-1@2x.png",
    grade: 23,
    daysLeft: 21
  },
  {
    company: "(주)비글즈",
    position: "AI NLP Engineer 경력 채용",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/image-2-1@2x.png",
    grade: 9,
    daysLeft: 7
  },
  {
    company: "(주)그레이고",
    position: "패션 마케터 과/차장급 (5-12년) 경력직",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6672cc7b5445d7af1e4bee20/img/image-1@2x.png",
    grade: 50,
    daysLeft: 12
  },
  {
    company: "㈜보스반도체",
    position: "SOC RTL design Engineer",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6672cc7b5445d7af1e4bee20/img/image-2@2x.png",
    grade: 12,
    daysLeft: 6
  },
  {
    company: "㈜와이오엘",
    position: "포워딩 영업 경력 모집",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/image-1-1@2x.png",
    grade: 23,
    daysLeft: 21
  },
  {
    company: "(주)비글즈",
    position: "AI NLP Engineer 경력 채용",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/image-2-1@2x.png",
    grade: 9,
    daysLeft: 7
  },{
    company: "(주)그레이고",
    position: "패션 마케터 과/차장급 (5-12년) 경력직",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6672cc7b5445d7af1e4bee20/img/image-1@2x.png",
    grade: 50,
    daysLeft: 12
  },
  {
    company: "㈜보스반도체",
    position: "SOC RTL design Engineer",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6672cc7b5445d7af1e4bee20/img/image-2@2x.png",
    grade: 12,
    daysLeft: 6
  },
  {
    company: "㈜와이오엘",
    position: "포워딩 영업 경력 모집",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/image-1-1@2x.png",
    grade: 23,
    daysLeft: 21
  },
  {
    company: "(주)비글즈",
    position: "AI NLP Engineer 경력 채용",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/image-2-1@2x.png",
    grade: 9,
    daysLeft: 7
  },{
    company: "(주)그레이고",
    position: "패션 마케터 과/차장급 (5-12년) 경력직",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6672cc7b5445d7af1e4bee20/img/image-1@2x.png",
    grade: 50,
    daysLeft: 12
  },
  {
    company: "㈜보스반도체",
    position: "SOC RTL design Engineer",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6672cc7b5445d7af1e4bee20/img/image-2@2x.png",
    grade: 12,
    daysLeft: 6
  },
  {
    company: "㈜와이오엘",
    position: "포워딩 영업 경력 모집",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/image-1-1@2x.png",
    grade: 23,
    daysLeft: 21
  },
  {
    company: "(주)비글즈",
    position: "AI NLP Engineer 경력 채용",
    image: "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/image-2-1@2x.png",
    grade: 9,
    daysLeft: 7
  }
];

const PostingRecommend = () => {
  const [showMore, setShowMore] = useState(false);
  const displayedRecommendations = showMore ? jobRecommendations.slice(0, 12) : jobRecommendations.slice(0, 4);

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
            <div className="PostingRecommend-overlap-group">
              <img
                className="PostingRecommend-image"
                alt="Image"
                src={job.image}
              />
              <div className="PostingRecommend-frame-8">
                <div className="PostingRecommend-text-wrapper-5">{job.company}</div>
                <div className="PostingRecommend-frame-9">
                  <div className="PostingRecommend-frame-10">
                    <p className="PostingRecommend-text-wrapper-6">{job.position}</p>
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
                        <div className="PostingRecommend-text-wrapper-7">{job.grade}</div>
                      </div>
                    </div>
                    <div className="PostingRecommend-text-wrapper-8">D-{job.daysLeft}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostingRecommend