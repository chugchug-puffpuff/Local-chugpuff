import React, { useState, useEffect } from 'react';
import './HistoryComponent.css';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const HistoryComponent = ({ es_no, reload, reloadHistory }) => {
  const [selfIntroductionData, setSelfIntroductionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSelfIntroductionData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`http://localhost:8080/api/selfIntroduction/${es_no}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setSelfIntroductionData(response.data);
      } catch (error) {
        console.error('Failed to fetch self introduction data', error);
        setError(error);
      }
    };

    if (es_no) {
      fetchSelfIntroductionData();
    }
  }, [es_no, reload]);

  const toggleSaveStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const newSaveStatus = !selfIntroductionData.save;
  
      await axios.post(`http://localhost:8080/api/selfIntroduction/save/${es_no}`, {
        save: newSaveStatus,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      setSelfIntroductionData(prevData => ({
        ...prevData,
        save: newSaveStatus
      }));
  
      if (newSaveStatus) {
        const response = await axios.get('http://localhost:8080/api/selfIntroduction/saved', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (Array.isArray(response.data)) {
          reloadHistory(response.data, true);
        } else {
          reloadHistory([response.data], true);
        }
      } else {
        reloadHistory(null, false);
      }
    } catch (error) {
      console.error('Failed to update save status', error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!selfIntroductionData) {
    return <div>Loading...</div>;
  }

  const { details, es_feedback, save } = selfIntroductionData;

  const formattedText = es_feedback
    .replace(/\n\n/g, '\n\n&nbsp;\n\n')
    .replace(/피드백:/g, '피드백')
    .replace(/자기소개서:/g, '자기소개서')
    .replace(/맞춤법 및 문법:/g, '<span class="bold">맞춤법 및 문법:</span>')
    .replace(/대체 단어 추천:/g, '<span class="bold">대체 단어 추천:</span>')
    .replace(/질문 의도와 답변 방향성:/g, '<span class="bold">질문 의도와 답변 방향성:</span>')
    .replace(/(질문\d+:)/g, '<span class="bold">$1</span>')
    .replace(/(답변\d+:)/g, '<span class="bold">$1</span>')
    .replace(/(질문 \d+:)/g, '<span class="bold">$1</span>')
    .replace(/(답변 \d+:)/g, '<span class="bold">$1</span>');

  return (
    <div className="HistoryComponent-frame-12">
      <div className="HistoryComponent-frame-wrapper">
        <div className="HistoryComponent-frame-13">
          <div className="HistoryComponent-frame-14">
            {details.map((details, index) => (
              <div key={index} className="HistoryComponent-frame-15">
                <div className="HistoryComponent-text-wrapper-7">자기소개서 문항 {index + 1}</div>
                <p className="HistoryComponent-text-wrapper-8">{details.eS_question}</p>
                <div className="HistoryComponent-text-wrapper-7">답변 {index + 1}</div>
                <p className="HistoryComponent-text-wrapper-8">{details.eS_answer}</p>
              </div>
            ))}
            <img
              className="HistoryComponent-img"
              alt="Line"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6698aa612be89236643e00e3/img/line-2.png"
            />
            <div className="HistoryComponent-frame-15">
              <div className="HistoryComponent-text-wrapper-7">피드백</div>
              <ReactMarkdown
                className="HistoryComponent-text-wrapper-8"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {formattedText}
              </ReactMarkdown>
            </div>
          </div>
          <img
            className={save ? "HistoryComponent-bookmark" : "HistoryComponent-bookmark-2"}
            alt={save ? "저장o" : "저장x"}
            src={save ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66b9e79f35eec696212b24a2/img/bookmark@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6698aa612be89236643e00e3/img/bookmark@2x.png"}
            onClick={toggleSaveStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryComponent;