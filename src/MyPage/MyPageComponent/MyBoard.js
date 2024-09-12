import React from 'react'
import './MyBoard.css'
import { useNavigate } from 'react-router-dom'
// import Pagination from '../../Route/Pagination.js';

const Post = ({ title, category, comments, likes, date }) => (
  <div className="MyBoard-view">
    <div className="MyBoard-frame-9">
      <div className="MyBoard-frame-10">
        <p className="MyBoard-p">{title}</p>
        <div className={category === "정보공유" ? "MyBoard-frame-11" : "MyBoard-frame-14"}>
          <div className="MyBoard-text-wrapper-5">{category}</div>
        </div>
      </div>
      <div className="MyBoard-frame-10">
        <div className="MyBoard-frame-12">
          <div className="MyBoard-frame-13">
            <img
              className="MyBoard-img"
              alt="Sms"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/sms@2x.png"
            />
            <div className="MyBoard-text-wrapper-6">{comments}</div>
          </div>
          <div className="MyBoard-frame-13">
            <img
              className="MyBoard-img"
              alt="Favorite"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/favorite@2x.png"
            />
            <div className="MyBoard-text-wrapper-6">{likes}</div>
          </div>
        </div>
        <div className="MyBoard-text-wrapper-7">{date}</div>
      </div>
    </div>
  </div>
)

const MyBoard = () => {
  
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
    <div className="MyBoard-frame">
      <div className="MyBoard-text-wrapper">나의 활동</div>
      <div className="MyBoard-div">
        <div className="MyBoard-frame-2">
          <div className="MyBoard-div-wrapper">
            <div className="MyBoard-text-wrapper-2">내가 작성한 게시물</div>
          </div>
          <div className="MyBoard-frame-3" onClick={() => goToMyActivities('myComment')}>
            <div className="MyBoard-text-wrapper-3">내가 작성한 댓글</div>
          </div>
          <div className="MyBoard-frame-4" onClick={() => goToMyActivities('myLiked')}>
            <div className="MyBoard-text-wrapper-3">좋아요 누른 게시물</div>
          </div>
        </div>
        <div className="MyBoard-frame-wrapper">
          <div className="MyBoard-frame-5">
            <div className="MyBoard-frame-6">
              <div className="MyBoard-text-wrapper-4">전체 (4건)</div>
            </div>
            <div className="MyBoard-frame-7">
              <div className="MyBoard-frame-8">
                {posts.map((post, index) => (
                  <React.Fragment key={index}>
                    <Post {...post} />
                    {index < posts.length - 1 && (
                      <img
                        className="MyBoard-line"
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

export default MyBoard