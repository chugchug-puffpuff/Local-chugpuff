import React, { useState, useEffect, useCallback } from 'react';
import './BoardComment.css';
import axios from 'axios';
import edit_icon from '../../Icon/edit.png'

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const datePart = date.toISOString().split('T')[0];
  const timePart = date.toTimeString().split(' ')[0];

  return `${datePart} ${timePart}`;
};

const Comment = ({ username, date, content, storedUserName, onDelete, onEdit }) => (
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
      <div className="BoardComment-text-wrapper-10">{formatDate(date)}</div>
    </div>
    <div className="BoardComment-content-icons">
      <div className="BoardComment-text-wrapper-12">{content}</div>
      {storedUserName === username && (
        <div className="BoardComment-icons">
          <img
            className="BoardComment-edit"
            alt="Edit"
            src={edit_icon}
            onClick={onEdit}
          />
          <img
            className="BoardComment-delete"
            alt="Delete"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6698aa612be89236643e00e3/img/delete-forever@2x.png"
            onClick={onDelete}
          />
        </div>
      )}
    </div>
  </div>
);

const BoardComment = ({ boardNo, storedUserName, updateCommentCount }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  // 댓글 조회 엔드포인트
  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/comment/board/${boardNo}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const fetchedComments = response.data
        .map(comment => ({
          bcNo: comment.bcNo,
          username: comment.memberName,
          date: comment.bcDate,
          content: comment.bcContent,
        }));
      setComments(fetchedComments);
      updateCommentCount(fetchedComments.length);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Please check your token.');
      } else {
        console.error('Error fetching comments:', error);
      }
    }
  }, [boardNo, updateCommentCount]);

  useEffect(() => {
    fetchComments();
  }, [boardNo, fetchComments]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // 댓글 작성 엔드포인트
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

      // 댓글 목록을 다시 가져오기 위해 fetchComments 함수 호출
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleDeleteClick = (comment) => {
    setCommentToDelete(comment);
    setShowDeleteModal(true);
  };

  const handleCancelClick = () => {
    setShowDeleteModal(false);
    setCommentToDelete(null);
  };

  // 댓글 삭제 엔드포인트
  const handleConfirmDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/comment/${commentToDelete.bcNo}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setComments(comments.filter(c => c !== commentToDelete));
      setShowDeleteModal(false);
      setCommentToDelete(null);
      updateCommentCount(comments.length - 1);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditClick = (comment) => {
    setCommentToEdit(comment);
    setEditedContent(comment.content);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditedContent(e.target.value);
  };

  // 댓글 수정 엔드포인트
  const handleConfirmEditClick = async () => {
    try {
      await axios.put(`http://localhost:8080/api/comment/${commentToEdit.bcNo}`, {
        bcContent: editedContent,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setComments(comments.map(c => c.bcNo === commentToEdit.bcNo ? { ...c, content: editedContent } : c));
      setShowEditModal(false);
      setCommentToEdit(null);
      setEditedContent('');
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleCancelEditClick = () => {
    setShowEditModal(false);
    setCommentToEdit(null);
    setEditedContent('');
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
            <Comment key={index} {...comment} storedUserName={storedUserName} bcNo={comment.bcNo} onDelete={() => handleDeleteClick(comment)} onEdit={() => handleEditClick(comment)} />
          ))}
        </div>
      </div>
      {showDeleteModal && (
        <div className="BoardComment-frame-78">
          <div className="BoardComment-frame-79">
            <div className="BoardComment-frame-80">
              <div className="BoardComment-text-wrapper-60">댓글 삭제</div>
              <p className="BoardComment-text-wrapper-61">
                작성한 댓글을 삭제하시겠습니까?<br />
                삭제된 댓글은 복구할 수 없습니다.
              </p>
            </div>
            <div className="BoardComment-frame-81">
              <div className="BoardComment-frame-82" onClick={handleCancelClick}>
                <div className="BoardComment-text-wrapper-62">취소</div>
              </div>
              <div className="BoardComment-frame-83" onClick={handleConfirmDeleteClick}>
                <div className="BoardComment-text-wrapper-63">삭제</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="BoardComment-frame-78">
          <div className="BoardComment-frame-79">
            <div className="BoardComment-frame-80">
              <div className="BoardComment-text-wrapper-60">댓글 수정</div>
              <textarea
                className="BoardComment-text-wrapper-61 BoardComment-edit-textarea"
                value={editedContent}
                onChange={handleEditChange}
              />
            </div>
            <div className="BoardComment-frame-81">
              <div className="BoardComment-frame-82" onClick={handleCancelEditClick}>
                <div className="BoardComment-text-wrapper-62">취소</div>
              </div>
              <div className="BoardComment-frame-83" onClick={handleConfirmEditClick}>
                <div className="BoardComment-text-wrapper-63">수정</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BoardComment;