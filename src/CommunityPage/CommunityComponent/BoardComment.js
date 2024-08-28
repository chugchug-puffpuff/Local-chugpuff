// 커뮤니티 게시글 댓글 컴포넌트
import React, { useState, useEffect } from 'react'
import './BoardComment.css'
import axios from 'axios';

const Comment = ({ username, date, content }) => (
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
      <div className="BoardComment-text-wrapper-10">{date}</div>
    </div>
    <div className="BoardComment-text-wrapper-12">{content}</div>
  </div>
);

const BoardComment = ({ boardNo }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/comment", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        console.log("response.data", response.data);
        
        const fetchedComments = response.data
          .filter(comment => comment.boardNo === boardNo)
          .map(comment => ({
            username: comment.memberName,
            date: comment.bcDate,
            content: comment.bcContent,
          }));
        setComments(fetchedComments);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized: Please check your token.');
        } else {
          console.error('Error fetching comments:', error);
        }
      }
    };

    fetchComments();
  }, [boardNo]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/comment?boardNo=${boardNo}`, {
        bcContent: comment,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Comment submitted:', response.data);
      setComment(''); // 댓글 제출 후 입력 필드 초기화
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="BoardComment-frame-2">
      <div className="BoardComment-frame-10">
        <div className="BoardComment-frame-11">
          <input
            type="text"
            className="BoardComment-text-wrapper-7"
            value={comment}
            onChange={handleCommentChange}
            placeholder="작성자에게 힘이 되는 댓글을 남겨주세요."
          />
          <div className="BoardComment-frame-12" onClick={handleCommentSubmit}>
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