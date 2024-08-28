import React, { useState, useEffect } from 'react';
import './EditingComponent.css';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// 로딩 중 텍스트입니다.
const TypingText = () => {
  const text = "답변 내용을 분석 중입니다";
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % text.length;
        if (newIndex === 0) {
          setDisplayedText('');
        }
        return newIndex;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [index, text]);

  return <div>{displayedText}</div>;
};

const EditingComponent = ({ details }) => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [esNo, setEsNo] = useState(null); // 제출 후 받아올 es_no

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('토큰이 없습니다.');
      }

      const response = await axios.post('http://localhost:8080/api/selfIntroduction', {
        details, // 자기소개서 문항과 답변이 여기에 포함됨
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // POST 요청이 성공적으로 완료되면 es_no를 받아옴
      setEsNo(response.data.es_no);
      setLoading(true); // 피드백을 로딩하도록 상태 변경
    } catch (error) {
      console.error('자기소개서 제출 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        if (!esNo) return; // esNo가 없으면 실행 안 함

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('토큰이 없습니다.');
        }

        const response = await axios.get(`http://localhost:8080/api/selfIntroduction/${esNo}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setFeedback(response.data.es_feedback); // 피드백 데이터를 설정
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error('피드백 불러오는 중 오류 발생:', error);
        setLoading(false); // 에러가 발생했을 때도 로딩 상태를 해제함
      }
    };

    if (esNo) {
      fetchFeedback(); // esNo가 설정된 후 피드백 불러오기 실행
    }
  }, [esNo]);

  const formattedText = feedback
    .replace(/\n\n/g, '\n\n&nbsp;\n\n')
    .replace(/(\n#? )(.+?:)/g, '$1<span class="bold">$2</span>')
    .replace(/피드백:/g, '피드백')
    .replace(/자기소개서:/g, '자기소개서');

  return (
    <div className="EditingComponent-frame-12">
      <div className="EditingComponent-frame-wrapper">
        <div className="EditingComponent-frame-13">
          <div className="EditingComponent-frame-14">
            {details && details.map((detail, index) => (
              <div key={index} className="EditingComponent-frame-15">
                <div className="EditingComponent-text-wrapper-7">자기소개서 문항 {index + 1}</div>
                <p className="EditingComponent-text-wrapper-8">{detail.eS_question}</p>
                <div className="EditingComponent-text-wrapper-7">답변 {index + 1}</div>
                <p className="EditingComponent-text-wrapper-8">{detail.eS_answer}</p>
              </div>
            ))}
            <button onClick={handleSubmit}>제출하기</button> {/* 제출 버튼 추가 */}
            <img
              className="EditingComponent-img"
              alt="Line"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6698aa612be89236643e00e3/img/line-2.png"
            />
            <div className="EditingComponent-frame-15">
              <div className="EditingComponent-text-wrapper-7">피드백</div>
              {loading ? <TypingText /> : (
                <div className="EditingComponent-text-wrapper-8">
                  <ReactMarkdown
                    className="EditingComponent-text-wrapper-8"
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {formattedText}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditingComponent;
