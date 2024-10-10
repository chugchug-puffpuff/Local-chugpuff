import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AIInterviewPage.css";
import InterviewHistoryBar from "./AIComponent/InterviewHistoryBar.js";
import InterviewButton from "./AIComponent/InterviewButton.js";
import InterviewSelect from "./AIComponent/InterviewSelect.js";
import NavBar from "../MainPage/MainComponent/NavBar.js";
import axios from "axios";

const AIInterviewPage = ({ authenticate, setAuthenticate, userName }) => {
  const [canStartInterview, setCanStartInterview] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const navigate = useNavigate();
  
  // 면접 생성
  const startInterview = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/aiinterview", {
        user_id: localStorage.getItem('user_id'),
        interviewType: selectedType,
        feedbackType: selectedFeedback
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        if (response.data === "저장된 자기소개서가 없습니다.") { // 저장된 자소서가 없을 시
          alert("저장된 자기소개서가 없습니다.");
        } else {
          const { aiinterviewNo } = response.data; // 응답에서 aiinterviewNo만 추출
          navigate('/aiinterview/start', { state: { selectedType, selectedFeedback, aiinterviewNo} });
        }
      }
    } catch (error) {
      console.error("Error starting interview:", error);
    }
  };

  return (
    <div className="AIInterviewPage">
      <div className="AIInterviewPage-view">
        <InterviewButton
          canStartInterview={canStartInterview}
          startInterview={startInterview}
        />
        <InterviewSelect
          setCanStartInterview={setCanStartInterview}
          setSelectedType={setSelectedType}
          setSelectedFeedback={setSelectedFeedback}
        />
      </div>
      <InterviewHistoryBar />
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default AIInterviewPage;