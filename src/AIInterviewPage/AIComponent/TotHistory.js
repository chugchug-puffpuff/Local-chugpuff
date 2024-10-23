import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./TotHistory.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const TotHistory = ({ interviewId, userName }) => {
  const [interviewData, setInterviewData] = useState(null);

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/aiinterview/${interviewId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setInterviewData(response.data);
      } catch (error) {
        console.error('Failed to fetch interview data', error);
      }
    };

    fetchInterviewData();
  }, [interviewId]);

  if (!interviewData) {
    return <div>Loading...</div>;
  }

  const { interviewType, feedbackType, overallFeedbacks, f_feedback } = interviewData;
  const oneLetter = interviewType.charAt(0);

  const formattedText = f_feedback
    .replace(/전체 피드백:/g, '<span class="bold-1">전체 피드백</span>')
    .replace(/전체피드백:/g, '<span class="bold-1">전체피드백</span>')
    .replace(/(##.*?:)/g, '<span class="bold">$1</span>')
    .replace(/##/g, '')
    .replace(/(종합적인 피드백:)/g, '<span class="bold">$1</span>');

  const InterviewItem = ({ question, answer }) => (
    <div className="TotHistory-frame-71">
      <div className="TotHistory-frame-72">
        <div className="TotHistory-frame-73">
          <div className="TotHistory-frame-74">
            <div className="TotHistory-text-wrapper-56">{oneLetter}</div>
          </div>
          <div className="TotHistory-text-wrapper-57">AI 면접관</div>
        </div>
        <p className="TotHistory-text-wrapper-58">{question}</p>
      </div>
      <div className="TotHistory-frame-72">
        <div className="TotHistory-frame-73">
          <img
            className="TotHistory-account-circle-5"
            alt="Account circle"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/account-circle-1.svg"
          />
          <div className="TotHistory-text-wrapper-57">{userName}</div>
        </div>
        <p className="TotHistory-text-wrapper-58">{answer}</p>
      </div>
    </div>
  );

  return (
    <div className="TotHistory">
      <div className="TotHistory-overlap-group-4">
        <div className="TotHistory-frame-70">
          {overallFeedbacks.map((feedback) => (
            <InterviewItem 
              key={feedback.aiinterviewFFNo} 
              question={feedback.f_question} 
              answer={feedback.f_answer} />
          ))}
          <img
            className="TotHistory-line-3"
            alt="Line"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/line-2.svg"
          />
          <div className="TotHistory-frame-72">
            <div className="TotHistory-frame-73">
              <div className="TotHistory-frame-75">
                <div className="TotHistory-text-wrapper-59">삼</div>
              </div>
              <div className="TotHistory-text-wrapper-57">치치폭폭 피드백 AI</div>
            </div>
            {formattedText ? (
              <ReactMarkdown
                className="TotHistory-text-wrapper-60"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {formattedText}
              </ReactMarkdown>
            ):(
              <p className="TotHistory-text-wrapper-60">피드백이 존재하지 않습니다.</p>
            )}
          </div>
        </div>
        <div className="TotHistory-frame-76">
          <div className="TotHistory-frame-77">
            <div className="TotHistory-frame-78">
              <img
                className="TotHistory-check-6"
                alt="Check"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/check.svg"
              />
              <div className="TotHistory-text-wrapper-61">{interviewType}</div>
            </div>
            <div className="TotHistory-frame-78">
              <img
                className="TotHistory-check-6"
                alt="Check"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/check-1.svg"
              />
              <div className="TotHistory-text-wrapper-61">{feedbackType}</div>
            </div>
          </div>
          <div className="TotHistory-frame-79">
            <div className="TotHistory-text-wrapper-62">면접이 종료되었습니다.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotHistory;