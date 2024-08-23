import React, { useEffect, useState } from 'react';
import './SeHistoryBar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SeHistoryBar = ({ reload, isSavedClickedProp }) => {
  const [sortedSelfIntroductionData, setSortedSelfIntroductionData] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedEsNo, setSelectedEsNo] = useState(null);
  const [isSavedClicked, setIsSavedClicked] = useState(isSavedClickedProp);

  const navigate = useNavigate();
  const goToSelfIntroduction = () => {
    navigate('/selfintroduction');
  };

  useEffect(() => {
    const fetchSelfIntroductionData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/selfIntroduction/list', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const filteredData = response.data.filter(item => !item.save);
        const sortedData = filteredData.sort((a, b) => b.es_no - a.es_no);
        setSortedSelfIntroductionData(sortedData);
      } catch (error) {
        console.error('Failed to fetch self introduction data', error);
        setSortedSelfIntroductionData([]);
      }
    };
  
    fetchSelfIntroductionData();
  }, [reload]);

  const handleDeleteClick = (es_no) => {
    setSelectedEsNo(es_no);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/selfIntroduction/${selectedEsNo}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSortedSelfIntroductionData(prevData => prevData.filter(data => data.es_no !== selectedEsNo));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error(`Failed to delete self introduction with id: ${selectedEsNo}`, error);
    }
  };

  const handleSavedClick = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/selfIntroduction/saved', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (Array.isArray(response.data)) {
        setSortedSelfIntroductionData(response.data);
      } else {
        setSortedSelfIntroductionData([response.data]);
      }
      setIsSavedClicked(true);
    } catch (error) {
      console.error('Failed to fetch saved self introduction data', error);
      setSortedSelfIntroductionData([]);
    }
  };

  const handleRevisionClick = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/selfIntroduction/list', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const filteredData = response.data.filter(item => !item.save);
      const sortedData = filteredData.sort((a, b) => b.es_no - a.es_no);
      setSortedSelfIntroductionData(sortedData);
      setIsSavedClicked(false);
    } catch (error) {
      console.error('Failed to fetch self introduction data', error);
      setSortedSelfIntroductionData([]);
    }
  };

  const goToSelfIntroductionHistory = (es_no) => {
    navigate(`/selfintroductionhistory/${es_no}`, { state: { es_no } });
  };

  return (
    <div className="SeHistoryBar-frame-wrapper">
      <div className="SeHistoryBar-frame">
        <div className="SeHistoryBar-frame-2" onClick={goToSelfIntroduction}>
          <div className="SeHistoryBar-text-wrapper">새로운 자기소개서</div>
          <img
            className="SeHistoryBar-add"
            alt="Add"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66a09b014d2e057bada028bd/img/add@2x.png"
          />
        </div>
        <div className="SeHistoryBar-frame-3">
          <div className={`SeHistoryBar-frame-4 ${isSavedClicked ? 'white' : 'mint'}`} onClick={handleRevisionClick}>
            <img
              className="SeHistoryBar-check"
              alt="Check"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66a09b014d2e057bada028bd/img/check@2x.png"
            />
            <div className="SeHistoryBar-text-wrapper-2">첨삭 내역</div>
          </div>
          <div className={`SeHistoryBar-frame-5 ${isSavedClicked ? 'mint' : 'white'}`} onClick={handleSavedClick}>
            <div className="SeHistoryBar-text-wrapper-2">저장한 자소서</div>
          </div>
        </div>
        {Array.isArray(sortedSelfIntroductionData) && sortedSelfIntroductionData.length > 0 ? (
          sortedSelfIntroductionData.map(data => (
            <div className="InterviewHistoryBar-frame-5" key={data.es_no}>
              <div className="InterviewHistoryBar-date-and-icons">
                <div className="InterviewHistoryBar-text-wrapper-3">{data.es_date}</div>
                <div className="InterviewHistoryBar-frame-13">
                  <img
                    className="InterviewHistoryBar-delete"
                    alt="삭제"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6698aa612be89236643e00e3/img/delete-forever@2x.png"
                    onClick={() => handleDeleteClick(data.es_no)}
                  />
                </div>
              </div>
              <div className="InterviewHistoryBar-frame-6" onClick={() => goToSelfIntroductionHistory(data.es_no)}>
                <p className="InterviewHistoryBar-text-wrapper-4">{data.details[0].eS_question}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="SeHistoryBar-no-data">저장된 자기소개서가 없습니다.</div>
        )}
        {showDeleteConfirmation && (
          <div>
            <div className="InterviewHistoryBar-frame-78" />
            <div className="InterviewHistoryBar-frame-79">
              <div className="InterviewHistoryBar-frame-80">
                <div className="InterviewHistoryBar-text-wrapper-60">자기소개서 내역 삭제</div>
                <p className="InterviewHistoryBar-text-wrapper-61">
                  삭제된 내역은 복구할 수 없습니다.<br />
                  삭제하시겠습니까?
                </p>
              </div>
              <div className="InterviewHistoryBar-frame-81">
                <div className="InterviewHistoryBar-frame-82" onClick={() => setShowDeleteConfirmation(false)}>
                  <div className="InterviewHistoryBar-text-wrapper-62">취소</div>
                </div>
                <div className="InterviewHistoryBar-frame-83" onClick={handleDeleteConfirm}>
                  <div className="InterviewHistoryBar-text-wrapper-63">삭제</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeHistoryBar;