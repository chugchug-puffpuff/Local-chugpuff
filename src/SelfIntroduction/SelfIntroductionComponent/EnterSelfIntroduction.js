import React, { useState, useEffect, useRef} from 'react'
import './EnterSelfIntroduction.css'

const EnterSelfIntroduction = () => {
  const [questionValue, setQuestionValue] = useState('');
  const [answerValue, setAnswerValue] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const questionRef = useRef(null);
  const answerRef = useRef(null);

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

  const checkButtonActive = (question, answer) => {
    setIsButtonActive(question.trim() !== '' && answer.trim() !== '');
  };

  useEffect(() => {
    adjustTextareaHeight(questionRef.current);
    adjustTextareaHeight(answerRef.current);
  }, []);
  
  return (
    <form className="EnterSelfIntroduction-view">
      <div className="EnterSelfIntroduction-frame">
        <div className="EnterSelfIntroduction-text-wrapper">자기소개서 문항</div>
        <textarea 
          className="EnterSelfIntroduction-div" 
          ref={questionRef}
          value={questionValue}
          onChange={handleQuestionChange}
          type="text" 
          name="question"
          placeholder="질문 내용을 작성해주세요."
        />
      </div>
      <div className="EnterSelfIntroduction-frame">
        <div className="EnterSelfIntroduction-text-wrapper">답변</div>
        <div className="EnterSelfIntroduction-input-container">
          <textarea
            className="EnterSelfIntroduction-div"
            ref={answerRef}
            value={answerValue}
            onChange={handleAnswerChange}
            name="answer"
            placeholder="질문에 대한 답변을 작성해주세요."
          />
          <div className="EnterSelfIntroduction-text-wrapper-4">{charCount}/1000자</div>
        </div>
      </div>
      <div className={`EnterSelfIntroduction-view-2 ${isButtonActive ? 'active' : ''}`}>
        <div className="EnterSelfIntroduction-text-wrapper-5">첨삭 받기</div>
      </div>
    </form>
  )
}

export default EnterSelfIntroduction