import React, { useState, useEffect, useRef } from 'react';
import './EnterSelfIntroduction.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EnterSelfIntroduction = () => {
  const [questionValue, setQuestionValue] = useState('');
  const [answerValue, setAnswerValue] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const questionRef = useRef(null);
  const answerRef = useRef(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const handleAddItem = () => {
    const newItem = {
      eS_qestion: '',
      eS_answer: '',
      questionRef: React.createRef(),
      answerRef: React.createRef(),
    };
    setItems([...items, newItem]);
    setIsButtonActive(false); // 새로운 항목 추가 시 버튼 비활성화
  };

  const handleQuestionChange = (e) => {
    setQuestionValue(e.target.value);
    adjustTextareaHeight(questionRef.current);
    checkButtonActive(e.target.value, answerValue);
  };

  const handleAnswerChange = (e) => {
    setAnswerValue(e.target.value);
    adjustTextareaHeight(answerRef.current);
    setCharCount(e.target.value.length);
    checkButtonActive(questionValue, e.target.value);
  };

  const adjustTextareaHeight = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const checkButtonActive = (eS_qestion, eS_answer) => {
    const allQuestionsAnswered = eS_qestion.trim() !== '' && eS_answer.trim() !== '' && items.every(item => item.eS_qestion.trim() !== '' && item.eS_answer.trim() !== '');
    setIsButtonActive(allQuestionsAnswered);
  };

  const handleSubmit = async () => {
    const data = {
      details: [
        { eS_qestion: questionValue, eS_answer: answerValue },
        ...items.map(item => ({
          eS_qestion: item.eS_qestion,
          eS_answer: item.eS_answer
        }))
      ]
    };
  
    try {
      const response = await axios.post('http://localhost:8080/api/selfIntroduction/save', data);
      console.log('Response:', response.data);
      navigate('/editing-page', { state: { details: data.details } });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  useEffect(() => {
    adjustTextareaHeight(questionRef.current);
    adjustTextareaHeight(answerRef.current);
  }, []);

  return (
    <form className="EnterSelfIntroduction-view">
      <div className="EnterSelfIntroduction-frame">
        <div className="EnterSelfIntroduction-text-wrapper">자기소개서 문항 1</div>
        <textarea
          className="EnterSelfIntroduction-div"
          ref={questionRef}
          value={questionValue}
          onChange={handleQuestionChange}
          type="text"
          name="eS_qestion"
          placeholder="질문 내용을 작성해주세요."
        />
      </div>
      <div className="EnterSelfIntroduction-frame">
        <div className="EnterSelfIntroduction-text-wrapper">답변 1</div>
        <div className="EnterSelfIntroduction-input-container">
          <textarea
            className="EnterSelfIntroduction-div"
            ref={answerRef}
            value={answerValue}
            onChange={handleAnswerChange}
            name="eS_answer"
            placeholder="질문에 대한 답변을 작성해주세요."
          />
          <div className="EnterSelfIntroduction-text-wrapper-4">{charCount}/1000자</div>
        </div>
      </div>
      {items.map((item, index) => (
        <div key={index} className="EnterSelfIntroduction-frame">
          <div className="EnterSelfIntroduction-text-wrapper">자기소개서 문항 {index + 2}</div>
          <textarea
            className="EnterSelfIntroduction-div"
            ref={item.questionRef}
            value={item.eS_qestion}
            onChange={(e) => {
              const newItems = [...items];
              newItems[index].eS_qestion = e.target.value;
              setItems(newItems);
              adjustTextareaHeight(item.questionRef.current);
              checkButtonActive(questionValue, answerValue);
            }}
            type="text"
            name="eS_qestion"
            placeholder="질문 내용을 작성해주세요."
          />
          <div className="EnterSelfIntroduction-text-wrapper">답변 {index + 2}</div>
          <div className="EnterSelfIntroduction-input-container">
            <textarea
              className="EnterSelfIntroduction-div"
              ref={item.answerRef}
              value={item.eS_answer}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].eS_answer = e.target.value;
                setItems(newItems);
                adjustTextareaHeight(item.answerRef.current);
                checkButtonActive(questionValue, answerValue);
              }}
              name="eS_answer"
              placeholder="질문에 대한 답변을 작성해주세요."
            />
            <div className="EnterSelfIntroduction-text-wrapper-4">{item.eS_answer.length}/1000자</div>
          </div>
        </div>
      ))}
      <div className="EnterSelfIntroduction-action">
        <img
          className="add-circle"
          alt="Add circle"
          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66b86fe983a8dafb1aac9396/img/add-circle@2x.png"
          onClick={handleAddItem}
        />
        <div className={`EnterSelfIntroduction-view-2 ${isButtonActive ? 'active' : ''}`} onClick={isButtonActive ? handleSubmit : null}>
          <div className="EnterSelfIntroduction-text-wrapper-5">첨삭 받기</div>
        </div>
      </div>
    </form>
  );
};

export default EnterSelfIntroduction;