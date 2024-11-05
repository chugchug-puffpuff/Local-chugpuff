import React, { useState } from 'react';
import './Board.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import edit_icon from '../../Icon/edit.png'

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const datePart = date.toISOString().split('T')[0];
  const timePart = date.toTimeString().split(' ')[0];

  return `${datePart} ${timePart}`;
};

const Board = ({ boardNo, category, boardTitle, boardDate, memberName, boardContent, storedUserName }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancelClick = () => {
    setShowDeleteModal(false);
  };

  // 삭제 엔드포인트
  const handleConfirmDeleteClick = async () => {
    if (typeof boardNo !== 'number') {
      console.error('Invalid boardNo:', boardNo);
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:8080/api/board/${boardNo}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      if (response.status === 200) {
        setShowDeleteModal(false);
        navigate('/community');
      } else {
        console.error('Failed to delete the board');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="Board-frame-2">
      <div className="Board-frame-2">
        <div className={`Board-frame-${category === "정보공유" ? "blue" : "navy"}`}>
          <div className="Board-text-wrapper">{category}</div>
        </div>
        <div className="Board-frame-4">
          <div className="Board-frame-5">
            <p className="Board-p">{boardTitle}</p>
            {memberName === storedUserName && ( // 현재 로그인한 사용자와 게시물 작성자가 같다면
              <div className="Board-icons">
                <img
                  className="edit"
                  alt="Edit"
                  src={edit_icon}
                  onClick={() => navigate(`/postmodify/${boardNo}`)}
                />
                <img
                  className="delete"
                  alt="Delete"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6698aa612be89236643e00e3/img/delete-forever@2x.png"
                  onClick={handleDeleteClick}
                />
              </div>
            )}
          </div>
          <div className="Board-text-wrapper-2">{formatDate(boardDate)}</div>
          <div className="Board-frame-6">
            <img
              className="Board-img"
              alt="Account circle"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/account-circle@2x.png"
            />
            <div className="Board-text-wrapper-3">{memberName}</div>
          </div>
        </div>
      </div>
      <div className="Board-text-wrapper-4">{boardContent}</div>
      {showDeleteModal && (
        <div className="Board-frame-78">
          <div className="Board-frame-79">
            <div className="Board-frame-80">
              <div className="Board-text-wrapper-60">게시글 삭제</div>
              <p className="Board-text-wrapper-61">
                삭제된 게시글은 복구할 수 없습니다.<br />
                삭제하시겠습니까?
              </p>
            </div>
            <div className="Board-frame-81">
              <div className="Board-frame-82" onClick={handleCancelClick}>
                <div className="Board-text-wrapper-62">취소</div>
              </div>
              <div className="Board-frame-83" onClick={handleConfirmDeleteClick}>
                <div className="Board-text-wrapper-63">삭제</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;