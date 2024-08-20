import React, { useState, useEffect, useRef } from 'react';
import './EnterSelfIntroduction.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../../Route/ScrollToTop.js';

const TypingText = () => {
  const text = "잠시만 기다려 주세요...";
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % text.length;
        if (newIndex === 0) {
          setDisplayedText(''); // 텍스트가 끝까지 출력되면 다시 빈 문자열로
        }
        return newIndex;
      });
    }, 300);

    return () => clearInterval(intervalId);
  }, [index, text]);

  return <div className='EnterSelfIntroduction-TypingText'>{displayedText}</div>;
};

const EnterSelfIntroduction = () => {
  const [questionValue, setQuestionValue] = useState('');
  const [answerValue, setAnswerValue] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const questionRef = useRef(null);
  const answerRef = useRef(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const handleAddItem = () => {
    const newItem = {
      eS_question: '',
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
    const value = e.target.value;
    if (value.length <= 1000) {
      setAnswerValue(value);
      setCharCount(value.length);
      adjustTextareaHeight(answerRef.current);
      checkButtonActive(questionValue, value);
    }
  };

  const adjustTextareaHeight = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const checkButtonActive = (eS_question, eS_answer) => {
    const allQuestionsAnswered = eS_question.trim() !== '' && eS_answer.trim() !== '' && items.every(item => item.eS_question.trim() !== '' && item.eS_answer.trim() !== '');
    setIsButtonActive(allQuestionsAnswered);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = [
      { eS_question: questionValue, eS_answer: answerValue },
      ...items.map(item => ({
        eS_question: item.eS_question,
        eS_answer: item.eS_answer
      }))
    ];
  
    try {
      const response = await axios.post('http://localhost:8080/api/selfIntroduction/feedback', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // 인증 토큰 추가
        }
      });
      console.log('Response:', response.data);
      navigate('/editing-page', { state: { details: data, es_feedback: response.data.es_feedback } });
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    adjustTextareaHeight(questionRef.current);
    adjustTextareaHeight(answerRef.current);
  }, []);

  return isSubmitting ? (
    <div>
      <ScrollToTop />
      <div className="EnterSelfIntroduction-frame-12">
        <div className="EnterSelfIntroduction-frame-wrapper">
          <div className="EnterSelfIntroduction-frame-13">
            <div className="EnterSelfIntroduction-frame-14">
              <div className="EnterSelfIntroduction-frame-15">
                <TypingText />
                <div className="EnterSelfIntroduction-text-wrapper-7">답변 내용을 분석 중입니다. 분량에 따라 몇 분의 시간이 소요될 수 있습니다.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <form className="EnterSelfIntroduction-view">
      <div className="EnterSelfIntroduction-frame">
        <div className="EnterSelfIntroduction-text-wrapper">자기소개서 문항 1</div>
        <textarea
          className="EnterSelfIntroduction-div"
          ref={questionRef}
          value={questionValue}
          onChange={handleQuestionChange}
          type="text"
          name="eS_question"
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
            value={item.eS_question}
            onChange={(e) => {
              const newItems = [...items];
              newItems[index].eS_question = e.target.value;
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
                const value = e.target.value;
                if (value.length <= 1000) {
                  const newItems = [...items];
                  newItems[index].eS_answer = value;
                  setItems(newItems);
                  adjustTextareaHeight(item.answerRef.current);
                  checkButtonActive(questionValue, value);
                }
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
      {isSubmitting && <TypingText />}
    </form>
  );
};

export default EnterSelfIntroduction;