// 게시글 수정 페이지
import React, { useState, useEffect, useRef } from 'react';
import "./PostModify.css";
import NavBar from "../MainPage/MainComponent/NavBar.js";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PostModify = ({ authenticate, setAuthenticate, userName }) => {
  const { boardNo } = useParams();
  const [formData, setFormData] = useState({
    boardTitle: '',
    boardContent: '',
    category: ''
  });

  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/board/${boardNo}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const { boardTitle, boardContent, category } = response.data;
        setFormData({ boardTitle, boardContent, category: category.categoryName });
      } catch (error) {
        console.error('데이터 로드 에러:', error);
      }
    };
  
    fetchData();
  }, [boardNo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};

    if (!formData.boardTitle) newError.boardTitle = "제목을 입력해주세요";
    if (!formData.boardContent) newError.boardContent = "내용을 입력해주세요";

    setErrors(newError);

    if (Object.keys(newError).length === 0) {
      try {
        const postData = {
          boardTitle: formData.boardTitle,
          boardContent: formData.boardContent
        };

        const result = await axios.put(`http://localhost:8080/api/board/${boardNo}`, postData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('게시글 수정 성공:', result);
        navigate('/community');
      } catch (error) {
        console.error('게시글 수정 에러:', error);
      }
    }
  };

  const handleContentChange = (e) => {
    adjustTextareaHeight(contentRef.current);
  };

  const adjustTextareaHeight = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight(contentRef.current);
  }, []);

  return (
    <div className="PostModify">
      <form className="PostModify-overlap-group" onSubmit={handleSubmit}>
        <div className="PostModify-frame">
          <div className="PostModify-frame-wrapper">
            <div className="PostModify-div">
              <div className="PostModify-frame-2">
                <div className="PostModify-frame-4">
                  <div className="PostModify-frame-3">
                    <div className="PostModify-text-wrapper">{formData.category}</div>
                  </div>
                  <div className="PostModify-frame-5">
                    <input
                      className={`PostModify-text-field ${errors.boardTitle ? 'PostModify-error' : ''}`}
                      type="text"
                      value={formData.boardTitle}
                      onChange={(e) => setFormData({ ...formData, boardTitle: e.target.value })}
                    />
                  </div>
                </div>
                <div className="PostModify-text-wrapper-4">
                  <div className="PostModify-frame-18">
                    <textarea
                      className={`PostModify-div-2 ${errors.boardContent ? 'PostModify-error' : ''}`}
                      ref={contentRef}
                      value={formData.boardContent}
                      onChange={(e) => {
                        setFormData({ ...formData, boardContent: e.target.value });
                        handleContentChange(e);
                      }}
                      type="text"
                      name="content"
                    />
                  </div>
                </div>
                <div className="PostModify-footer">
                  <div className="PostModify-frame-19" onClick={() => navigate('/community')}>
                    <div className="PostModify-text-wrapper-13">뒤로가기</div>
                  </div>
                  <button className="PostModify-frame-12" type="submit">
                    <div className="PostModify-text-wrapper-8">수정하기</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default PostModify;