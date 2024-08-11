import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./TotHistory.css";

const TotHistory = ({ interviewId, userName }) => {
  const [interviewData, setInterviewData] = useState(null);

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/interviews/${interviewId}`);
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

  const { selectedType, selectedFeedback, interviewHistory, feedback } = interviewData;
  const oneLetter = selectedType === '형식 없음' ? '없' : selectedType.charAt(0);

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
          {interviewHistory.map((history, index) => (
            <InterviewItem key={index} question={history.question} answer={history.answer} />
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
            <p className="TotHistory-text-wrapper-60">{feedback}</p>
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
              <div className="TotHistory-text-wrapper-61">{selectedType}</div>
            </div>
            <div className="TotHistory-frame-78">
              <img
                className="TotHistory-check-6"
                alt="Check"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/check-1.svg"
              />
              <div className="TotHistory-text-wrapper-61">{selectedFeedback}</div>
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