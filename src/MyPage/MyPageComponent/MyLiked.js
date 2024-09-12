import React from 'react'
import './MyLiked.css'
import { useNavigate } from 'react-router-dom'
// import Pagination from '../../Route/Pagination.js';

const Post = ({ title, category, comments, likes, date }) => (
  <div className="MyLiked-view">
    <div className="MyLiked-frame-9">
      <div className="MyLiked-frame-10">
        <p className="MyLiked-p">{title}</p>
        <div className={category === "정보공유" ? "MyLiked-frame-11" : "MyLiked-frame-14"}>
          <div className="MyLiked-text-wrapper-5">{category}</div>
        </div>
      </div>
      <div className="MyLiked-frame-10">
        <div className="MyLiked-frame-12">
          <div className="MyLiked-frame-13">
            <img
              className="MyLiked-img"
              alt="Sms"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/sms@2x.png"
            />
            <div className="MyLiked-text-wrapper-6">{comments}</div>
          </div>
          <div className="MyLiked-frame-13">
            <img
              className="MyLiked-img"
              alt="Favorite"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/favorite@2x.png"
            />
            <div className="MyLiked-text-wrapper-6">{likes}</div>
          </div>
        </div>
        <div className="MyLiked-text-wrapper-7">{date}</div>
      </div>
    </div>
  </div>
)

const MyLiked = ({ setActiveComponent }) => {
  const posts = [
    {
      title: '이직 결정 전 고려해야 할 사항들 - 현직자 경험담 공유',
      category: '정보공유',
      comments: 15,
      likes: 15,
      date: '2024.05.07',
    },
    {
      title: '이직 결정 전 고려해야 할 사항들 - 현직자 경험담',
      category: '취업고민',
      comments: 20,
      likes: 20,
      date: '2024.05.08',
    },
    {
      title: '면접 시 주의사항',
      category: '정보공유',
      comments: 30,
      likes: 17,
      date: '2024.05.10',
    },
    {
      title: '모두들 취업 화이팅 하세요!',
      category: '취업고민',
      comments: 10,
      likes: 17,
      date: '2024.05.11',
    },
    {
      title: '면접 시 주의사항',
      category: '정보공유',
      comments: 30,
      likes: 20,
      date: '2024.05.10',
    },
    {
      title: '모두들 취업 화이팅 하세요!',
      category: '취업고민',
      comments: 10,
      likes: 17,
      date: '2024.05.11',
    },
    {
      title: '면접 시 주의사항',
      category: '정보공유',
      comments: 30,
      likes: 17,
      date: '2024.05.10',
    },
    {
      title: '모두들 취업 화이팅 하세요!',
      category: '취업고민',
      comments: 10,
      likes: 17,
      date: '2024.05.11',
    }
  ]

  const navigate = useNavigate()
  const goToMyActivities = (component) => {
    navigate(`/myactivities/${component}`);
  };

  return (
    <div className="MyLiked-frame">
      <div className="MyLiked-text-wrapper">나의 활동</div>
      <div className="MyLiked-div">
        <div className="MyLiked-frame-2">
          <div className="MyLiked-div-wrapper" onClick={() => goToMyActivities('myBoard')}>
            <div className="MyLiked-text-wrapper-3">내가 작성한 게시물</div>
          </div>
          <div className="MyLiked-frame-3" onClick={() => goToMyActivities('myComment')}>
            <div className="MyLiked-text-wrapper-3">내가 작성한 댓글</div>
          </div>
          <div className="MyLiked-frame-4">
            <div className="MyLiked-text-wrapper-2">좋아요 누른 게시물</div>
          </div>
        </div>
        <div className="MyLiked-frame-wrapper">
          <div className="MyLiked-frame-5">
            <div className="MyLiked-frame-6">
              <div className="MyLiked-text-wrapper-4">전체 (3건)</div>
            </div>
            <div className="MyLiked-frame-7">
              <div className="MyLiked-frame-8">
                {posts.map((post, index) => (
                  <React.Fragment key={index}>
                    <Post {...post} />
                    {index < posts.length - 1 && (
                      <img
                        className="MyLiked-line"
                        alt="Line"
                        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/line-4.svg"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
              {/* <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} scrollTop={0} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyLiked