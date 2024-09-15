import React, { useState } from 'react'
import './MyComment.css'
import { useNavigate } from 'react-router-dom'
// import Pagination from '../../Route/Pagination.js';

const Post = ({ title, category, comments, likes, date }) => (
  <div className="MyComment-view">
    <div className="MyComment-frame-9">
      <div className="MyComment-frame-10">
        <p className="MyComment-p">{title}</p>
        <div className={category === "정보공유" ? "MyComment-frame-11" : "MyComment-frame-14"}>
          <div className="MyComment-text-wrapper-5">{category}</div>
        </div>
      </div>
      <div className="MyComment-frame-10">
        <div className="MyComment-frame-12">
          <div className="MyComment-frame-13">
            <img
              className="MyComment-img"
              alt="Sms"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/sms@2x.png"
            />
            <div className="MyComment-text-wrapper-6">{comments}</div>
          </div>
          <div className="MyComment-frame-13">
            <img
              className="MyComment-img"
              alt="Favorite"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/favorite@2x.png"
            />
            <div className="MyComment-text-wrapper-6">{likes}</div>
          </div>
        </div>
        <div className="MyComment-text-wrapper-7">{date}</div>
      </div>
    </div>
  </div>
)

const MyComment = () => {
  const [selectedComment, setSelectedComment] = useState('post');

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

  // 탭 이동
  const navigate = useNavigate()
  const goToMyActivities = (component) => {
    navigate(`/myactivities/${component}`);
  };

  const handleCommentClick = (type) => {
    setSelectedComment(type);
  };

  return (
    <div className="MyComment-frame">
      <div className="MyComment-text-wrapper">나의 활동</div>
      <div className="MyComment-div">
        <div className="MyComment-frame-2">
          <div className="MyComment-div-wrapper" onClick={() => goToMyActivities('myBoard')}>
            <div className="MyComment-text-wrapper-3">내가 작성한 게시물</div>
          </div>
          <div className="MyComment-frame-3">
            <div className="MyComment-text-wrapper-2">내가 작성한 댓글</div>
          </div>
          <div className="MyComment-frame-4" onClick={() => goToMyActivities('myLiked')}>
            <div className="MyComment-text-wrapper-3">좋아요 누른 게시물</div>
          </div>
        </div>
        <div className="MyComment-frame-wrapper">
          <div className="MyComment-frame-5">
            <div className="MyComment-frame-6">
              <div
                className={`${selectedComment === 'post' ? 'selected-comments' : 'MyComment-text-wrapper-4'}`}
                onClick={() => handleCommentClick('post')}
              >
                게시글 댓글 (2건)
              </div>
              <div
                className={`${selectedComment === 'job' ? 'selected-comments' : 'MyComment-text-wrapper-4'}`}
                onClick={() => handleCommentClick('job')}
              >
                취업공고 댓글 (2건)
              </div>
            </div>
            <div className="MyComment-frame-7">
              <div className="MyComment-frame-8">
                {posts.map((post, index) => (
                  <React.Fragment key={index}>
                    <Post {...post} />
                    {index < posts.length - 1 && (
                      <img
                        className="MyComment-line"
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

export default MyComment