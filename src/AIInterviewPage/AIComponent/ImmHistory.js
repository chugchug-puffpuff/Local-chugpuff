import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./ImmHistory.css";

const ImmHistory = ({ interviewId, userName }) => {
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

  const { interviewType, feedbackType, immediateFeedbacks } = interviewData;
  const oneLetter = interviewType.charAt(0);

  const InterviewItem = ({ question, answer, feedback }) => (
    <div className="ImmHistory-frame-71">
      <div className="ImmHistory-frame-72">
        <div className="ImmHistory-frame-73">
          <div className="ImmHistory-frame-74">
            <div className="ImmHistory-text-wrapper-56">{oneLetter}</div>
          </div>
          <div className="ImmHistory-text-wrapper-57">AI 면접관</div>
        </div>
        <p className="ImmHistory-text-wrapper-58">{question}</p>
      </div>
      <div className="ImmHistory-frame-72">
        <div className="ImmHistory-frame-73">
          <img
            className="ImmHistory-account-circle-5"
            alt="Account circle"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/account-circle-1.svg"
          />
          <div className="ImmHistory-text-wrapper-57">{userName}</div>
        </div>
        <p className="ImmHistory-text-wrapper-58">{answer}</p>
      </div>
      <img
        className="ImmHistory-line-3"
        alt="Line"
        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/line-2.svg"
      />
      <div className="ImmHistory-frame-72">
        <div className="ImmHistory-frame-73">
          <div className="ImmHistory-frame-75">
            <div className="ImmHistory-text-wrapper-59">삼</div>
          </div>
          <div className="ImmHistory-text-wrapper-57">치치폭폭 피드백 AI</div>
        </div>
        <p className="ImmHistory-text-wrapper-60">{feedback}</p>
      </div>
      <img
        className="ImmHistory-line-3"
        alt="Line"
        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/line-2.svg"
      />
    </div>
  );

  return (
    <div className="ImmHistory">
      <div className="ImmHistory-overlap-group-4">
        <div className="ImmHistory-frame-70">
          {immediateFeedbacks.map((history) => (
            <InterviewItem 
              key={history.aiinterviewIFNo} 
              question={history.i_question} 
              answer={history.i_answer} 
              feedback={history.i_feedback} 
            />
          ))}
        </div>
        <div className="ImmHistory-frame-76">
          <div className="ImmHistory-frame-77">
            <div className="ImmHistory-frame-78">
              <img
                className="ImmHistory-check-6"
                alt="Check"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/check.svg"
              />
              <div className="ImmHistory-text-wrapper-61">{interviewType}</div>
            </div>
            <div className="ImmHistory-frame-78">
              <img
                className="ImmHistory-check-6"
                alt="Check"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/check-1.svg"
              />
              <div className="ImmHistory-text-wrapper-61">{feedbackType}</div>
            </div>
          </div>
          <div className="ImmHistory-frame-79">
            <div className="ImmHistory-text-wrapper-62">면접이 종료되었습니다.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmHistory;
