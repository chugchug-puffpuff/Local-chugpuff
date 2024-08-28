// 게시글 작성 페이지
import React, { useState, useEffect, useRef } from 'react';
import "./PostRegister.css";
import NavBar from "../MainPage/MainComponent/NavBar.js";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostRegister = ({ authenticate, setAuthenticate, userName }) => {

  const [formData, setFormData] = useState({
    boardTitle: '',
    boardContent: '',
    category: ''
  });

  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("선택");
  const contentRef = useRef(null);
  const [errors, setErrors] = useState({});
  const options = [
    { label: "정보 공유", value: 1 },
    { label: "취업 고민", value: 2 }
  ];

  const registerPost = async (postData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/board', postData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('게시글 등록 에러:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};

    if (selectedOption === '선택') newError.category = "카테고리를 선택해주세요";
    if (!formData.boardTitle) newError.boardTitle = "제목을 입력해주세요";
    if (!formData.boardContent) newError.boardContent = "내용을 입력해주세요";

    setErrors(newError);

    if (Object.keys(newError).length === 0) {
      try {
        const postData = {
          category: { categoryId: formData.category },
          boardTitle: formData.boardTitle,
          boardContent: formData.boardContent
        };

        const result = await registerPost(postData);
        console.log('게시글 등록 성공:', result);
        navigate('/community');
      } catch (error) {
        console.error('게시글 등록 에러:', error);
      }
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setFormData({ ...formData, category: option.value });
    setShowOptions(false);
    if (errors.category) {
      setErrors({ ...errors, category: '' });
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
    <div className="PostRegister">
      <form className="PostRegister-overlap-group" onSubmit={handleSubmit}>
        <div className="PostRegister-frame">
          <div className="PostRegister-frame-wrapper">
            <div className="PostRegister-div">
              <div className="PostRegister-frame-2">
                <div className="PostRegister-frame-4">
                  <div className={`PostRegister-frame-3 ${showOptions ? 'active' : ''} ${errors.category ? 'PostRegister-error' : ''}`} onClick={() => setShowOptions(!showOptions)}>
                    <div className="PostRegister-text-wrapper">{selectedOption}</div>
                    <img
                      className={showOptions ? "PostRegister-arrow-drop-up" : "PostRegister-arrow-drop-down"}
                      alt={showOptions ? "Arrow drop up" : "Arrow drop down"}
                      src={showOptions ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccfaca48cce45c95d9d30/img/arrow-drop-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/arrow-drop-down@2x.png"}
                    />
                  </div>
                  <div className="PostRegister-frame-5">
                    <input
                      className={`PostRegister-text-field ${errors.boardTitle ? 'PostRegister-error' : ''}`}
                      type="text"
                      value={formData.boardTitle}
                      onChange={(e) => setFormData({ ...formData, boardTitle: e.target.value })}
                      placeholder="제목을 입력해주세요"
                    />
                  </div>
                </div>
                {showOptions && (
                  <div className="PostRegister-frame-6">
                    {options.map((option, index) => (
                      <div key={index} className="PostRegister-text-wrapper-2" onClick={() => handleOptionClick(option)}>
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
                <div className="PostRegister-text-wrapper-4">
                  <div className="PostRegister-frame-18">
                    <textarea
                      className={`PostRegister-div-2 ${errors.boardContent ? 'PostRegister-error' : ''}`}
                      ref={contentRef}
                      value={formData.boardContent}
                      onChange={(e) => {
                        setFormData({ ...formData, boardContent: e.target.value });
                        handleContentChange(e);
                      }}
                      type="text"
                      name="content"
                      placeholder="내용을 입력해주세요"
                    />
                  </div>
                </div>
                <div className="PostRegister-footer">
                  <div className="PostRegister-frame-19" onClick={() => navigate('/community')}>
                    <div className="PostRegister-text-wrapper-13">뒤로가기</div>
                  </div>
                  <button className="PostRegister-frame-12" type="submit">
                    <div className="PostRegister-text-wrapper-8">작성하기</div>
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

export default PostRegister;