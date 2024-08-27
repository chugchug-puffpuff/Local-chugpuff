// 커뮤니티 게시글 댓글 컴포넌트
import React from 'react'
import './BoardComment.css'

const comments = [
  { username: 'MEME', daysAgo: '8일 전', text: '이렇게 정석으로 생각하는 게 맞긴 함' },
  { username: 'wldsaam5234', daysAgo: '5일 전', text: 'ㅇㅇ 이거임' },
  { username: 'wldsaam5234', daysAgo: '5일 전', text: 'ㅇㅇ 이거임' },
  { username: 'wldsaam5234', daysAgo: '5일 전', text: 'ㅇㅇ 이거임' },
  { username: 'wldsaam5234', daysAgo: '5일 전', text: 'ㅇㅇ 이거임' },
  { username: 'wldsaam5234', daysAgo: '5일 전', text: 'ㅇㅇ 이거임' },
  { username: 'wldsaam5234', daysAgo: '5일 전', text: 'ㅇㅇ 이거임' },
];

const Comment = ({ username, daysAgo, text }) => (
  <div className="BoardComment-frame-18">
    <div className="BoardComment-frame-15">
      <div className="BoardComment-frame-16">
        <img
          className="BoardComment-img"
          alt="Account circle"
          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/account-circle@2x.png"
        />
        <div className="BoardComment-text-wrapper-3">{username}</div>
      </div>
      <div className="BoardComment-text-wrapper-10">{daysAgo}</div>
    </div>
    <div className="BoardComment-text-wrapper-12">{text}</div>
  </div>
);

const BoardComment = () => {
  return (
    <div className="BoardComment-frame-2">
      <div className="BoardComment-frame-7">
        <div className="BoardComment-frame-8">
          <div className="BoardComment-frame-9">
            <img
              className="BoardComment-img"
              alt="Favorite"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/favorite@2x.png"
            />
            <div className="BoardComment-text-wrapper-5">좋아요</div>
            <div className="BoardComment-text-wrapper-6">15</div>
          </div>
        </div>
        <div className="BoardComment-frame-9">
          <img
            className="BoardComment-img"
            alt="Sms"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/sms@2x.png"
          />
          <div className="BoardComment-text-wrapper-5">댓글</div>
          <div className="BoardComment-text-wrapper-6">15</div>
        </div>
      </div>
      <div className="BoardComment-frame-10">
        <div className="BoardComment-frame-11">
          <p className="BoardComment-text-wrapper-7">작성자에게 힘이 되는 댓글을 남겨주세요.</p>
          <div className="BoardComment-frame-12">
            <div className="BoardComment-text-wrapper-8">등록</div>
          </div>
        </div>
        <div className="BoardComment-frame-13">
          {comments.map((comment, index) => (
            <Comment key={index} {...comment} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BoardComment