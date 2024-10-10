import React, { useState, useEffect, useCallback } from 'react';
import './ImmInterview.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// 타이핑 효과
const TypingEffect = ({ text = '', speed, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    // text가 변경될 때마다 상태 초기화
    setDisplayedText('');
    setCount(0);
  }, [text]);

  useEffect(() => {
    if (!text) return;

    if (count >= text.length) {
      onComplete?.();
      return;
    }

    const timeoutId = setTimeout(() => {
      setDisplayedText(prev => prev + text[count]);
      setCount(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timeoutId);
  }, [count, text, speed, onComplete]);

  return <div className="InterviewPlay-p">{displayedText}</div>;
};

const ImmInterview = ({ selectedType, selectedFeedback, userName }) => {
  const location = useLocation();
  const { aiinterviewNo } = location.state || {};
  const [timeLeft, setTimeLeft] = useState(1800); // 타이머 시간
  const [currentQuestion, setCurrentQuestion] = useState(''); // 현재 질문 저장
  const [ttsAudioUrl, setTtsAudioUrl] = useState(''); // tts파일 상태
  //const [audio, setAudio] = useState(null); // audio 상태 추가
  const [typingComplete, setTypingComplete] = useState(false);
  const [isQuestionTypingComplete, setIsQuestionTypingComplete] = useState(false); // 질문 타이핑 완료 상태
  const [userAnswer, setUserAnswer] = useState(''); // 사용자 답변 저장
  const [isAnswerCompleted, setIsAnswerCompleted] = useState(false); // 답변 완료 상태
  const [currentFeedback, setCurrentFeedback] = useState('') // 피드백 저장
  const [isFeedbackComplete, setIsFeedbackComplete] = useState(false); // 피드백 완료 상태
  const [storageQuestion, setStorageQuestion] = useState([]); // 질문 저장
  const [storageAnswer, setStorageAnswer] = useState([]); // 답변 저장
  const [storageFeedback, setStorageFeedback] = useState([]); // 피드백 저장
  const [isInterviewEnded, setIsInterviewEnded] = useState(false); // 인터뷰 종료 상태

  // 시간 포맷
  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}초`;
  }, []);

  // 모의면접 세션 초기화 및 첫 질문 생성
  useEffect(() => {
    const fetchFirstQuestion = async () => {
      try {
        const firstQuestionResponse = await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/start`, {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        const { question, ttsAudioUrl } = firstQuestionResponse.data;
        setCurrentQuestion(question);
        setTtsAudioUrl(ttsAudioUrl);
      } catch (error) {
        console.error('Failed to fetch first question', error);
      }
    };

    fetchFirstQuestion();
  }, [aiinterviewNo]);

  // 다음 질문 요청
  useEffect(() => {
    if (isFeedbackComplete) {
      setIsFeedbackComplete(false);
      setTypingComplete(false);
      setIsAnswerCompleted(false);
      // 현재 질문, 답변, 피드백을 각각의 배열에 추가
      setStorageQuestion(prev => [...prev, currentQuestion]);
      setStorageAnswer(prev => [...prev, userAnswer]);
      setStorageFeedback(prev => [...prev, currentFeedback]);
      setCurrentQuestion("");
      setUserAnswer(""); // 이전 답변 초기화

      const fetchNextQuestion = async () => {
        try {
          const response = await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/next-question`, {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          const { question, ttsAudioUrl } = response.data || {};
          console.log('Fetched question:', question); // 응답 질문 로그

          if (question && ttsAudioUrl) {
            setCurrentQuestion(question);
            setTtsAudioUrl(ttsAudioUrl);
            setCurrentFeedback(''); // 이전 피드백 초기화
            console.log('다음 질문 요청이 성공적으로 전송되었습니다.');
          } else {
            console.error('응답 데이터가 올바르지 않습니다:', response.data);
          }
        } catch (error) {
          console.error('다음 질문 요청 중 오류가 발생했습니다:', error);
        }
      };
  
      fetchNextQuestion();
    }
  }, [isFeedbackComplete, aiinterviewNo]);

  // 질문 타이핑이 완료되면 녹음 시작 
  useEffect(() => {
    if (isQuestionTypingComplete) {
      const sendAnswerStartRequest = async () => {
        try {
          await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/answer-start`, {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log('답변 시작 요청이 성공적으로 전송되었습니다.');
        } catch (error) {
          console.error('답변 시작 요청 중 오류가 발생했습니다:', error);
        }
      };
  
      sendAnswerStartRequest();
    }
  }, [aiinterviewNo]);

  // 답변 완료
  const handleCompleteAnswer = useCallback(async () => {
    setIsQuestionTypingComplete(false);
    try {
      await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/answer-complete`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setIsAnswerCompleted(true);
      const filePath = '/captured_audio.wav';
      const response = await fetch(filePath);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('audioFile', blob, 'captured_audio.wav'); // Blob을 FormData에 추가
  
      // 전송할 데이터를 콘솔에 출력
      console.log('FormData to be sent:', formData);
  
      // 사용자의 답변을 변환하는 요청 보내기
      const convertResponse = await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/convert-answer`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (convertResponse.status === 200) {
        const { answer } = convertResponse.data;
        console.log('answer', convertResponse.data)
        setUserAnswer(answer); 

        // 피드백 생성 요청 보내기
        const feedbackResponse = await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/generate-feedback`, {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        const { feedback, ttsAudioUrl } = feedbackResponse.data;
        setCurrentFeedback(feedback);
        setTtsAudioUrl(''); // tts 초기화
        setTtsAudioUrl(ttsAudioUrl);
      } else {
        console.error('Failed to convert answer:', convertResponse);
      }
  
    } catch (error) {
      console.error('Failed to complete answer process', error);
    }
  }, [aiinterviewNo]);

  // 면접 종료
  const handleEndInterview = useCallback(async () => {
    try {
      await axios.post(`http://localhost:8080/api/aiinterview/${aiinterviewNo}/end`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('인터뷰 종료 요청이 성공적으로 전송되었습니다.');
      setIsInterviewEnded(true);
    } catch (error) {
      console.error('인터뷰 종료 요청 중 오류가 발생했습니다:', error);
    }
  }, [aiinterviewNo]);

  // 타이머 설정
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else {
      handleEndInterview(); // 시간이 0이 되면 handleEndInterview 실행
    }
  }, [timeLeft, handleEndInterview]);

  // tts 재생
  useEffect(() => {
    if (ttsAudioUrl) {
      const audioInstance = new Audio('/output.mp3'); // ttsAudioUrl을 사용하여 오디오 인스턴스 생성

      const playAudio = async () => {
        try {
          await audioInstance.play();
          console.log('Audio is playing');
        } catch (error) {
          console.error('Failed to play audio', error);
        }
      };

      playAudio();

      audioInstance.onerror = (error) => {
        console.error('Failed to load audio', error);
      };

      return () => {
        audioInstance.pause();
        audioInstance.currentTime = 0; // 오디오를 처음으로 되돌림
      };
    }
  }, [ttsAudioUrl]); // ttsAudioUrl이 변경될 때마다 실행

  const oneLetter = selectedType.charAt(0);

  // 한 세트의 질문&답변&피드백이 모일 경우
  const renderHistoryItem = useCallback(() => {
    return storageQuestion.map((question, index) => (
      <div key={index} className="InterviewPlay-history-item">
        <div className="InterviewPlay-frame-2">
          <div className="InterviewPlay-frame-3">
            <div className="InterviewPlay-frame-4">
              <div className="InterviewPlay-text-wrapper">{oneLetter}</div>
            </div>
            <div className="InterviewPlay-text-wrapper-2">AI 면접관</div>
          </div>
          <p className="InterviewPlay-p">{question}</p>
        </div>
        <div className="InterviewPlay-frame-2">
          <div className="InterviewPlay-frame-3">
            <img
              className="InterviewPlay-account-circle"
              alt="Account circle"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/account-circle-1.svg"
            />
            <div className="InterviewPlay-text-wrapper-2">{localStorage.getItem('userName')}</div>
          </div>
          <p className="InterviewPlay-p">{storageAnswer[index]}</p>
        </div>
        <img
          className="line-3"
          alt="Line"
          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/line-2.svg"
        />
        <div className="frame-72">
          <div className="frame-73">
            <div className="frame-75">
              <div className="text-wrapper-59">3</div>
            </div>
            <div className="text-wrapper-57">치치폭폭 피드백 AI</div>
          </div>
          <p className="InterviewPlay-p">{storageFeedback[index]}</p>
        </div>
        <img
          className="line-3"
          alt="Line"
          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/line-2.svg"
        />
      </div>
    ));
  }, [oneLetter, storageQuestion, storageAnswer, storageFeedback]);

  // AI 면접관 질문 함수
  const renderCurrentQuestion = useCallback(() => {
    return (
      <div className="InterviewPlay-frame-2 InterviewPlay-question-section">
        <div className="InterviewPlay-frame-3">
          <div className="InterviewPlay-frame-4">
            <div className="InterviewPlay-text-wrapper">{oneLetter}</div>
          </div>
          <div className="InterviewPlay-text-wrapper-2">AI 면접관</div>
        </div>
        <TypingEffect 
          text={currentQuestion} 
          speed={125} 
          onComplete={() => {
            setTypingComplete(true)
            setIsQuestionTypingComplete(true);
          }} 
        />
      </div>
    );
  }, [oneLetter, currentQuestion]);

  // 사용자 답변 함수
  const renderUserAnswer = useCallback(() => {
    return (
      <div className="InterviewPlay-frame-2">
        <div className="InterviewPlay-frame-3">
          {/* {isQuestionTypingComplete && ( // 질문 타이핑 상태가 true라면 파란 테두리 노출
            <img
              className="InterviewPlay-ellipse"
              alt="Ellipse"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6690d46ff1077d330fbfb9e3/img/ellipse-1.svg"
            />
          )} */}
          <img
            className="InterviewPlay-account-circle"
            alt="Account circle"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/account-circle-1.svg"
          />
          <div className="InterviewPlay-text-wrapper-2">{localStorage.getItem('userName')}</div>
        </div>
        {/* {isQuestionTypingComplete ? (
          <p className="InterviewPlay-p">목소리를 인식 중입니다.</p>
        ) : (
          <p className="InterviewPlay-p">{userAnswer}</p>
        )} */}
        <p className="InterviewPlay-p">{userAnswer}</p>
        {!isAnswerCompleted ? (
          <button onClick={handleCompleteAnswer} className="InterviewPlay-complete">답변 완료</button>
        ) : (
          <>
            <img
              className="line-3"
              alt="Line"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/line-2.svg"
            />
            <div className="frame-72">
              <div className="frame-73">
                <div className="frame-75">
                  <div className="text-wrapper-59">3</div>
                </div>
                <div className="text-wrapper-57">치치폭폭 피드백 AI</div>
              </div>
              <TypingEffect 
                text={currentFeedback} 
                speed={125} 
                onComplete={() => {
                    setIsFeedbackComplete(true);
                }} 
              />
            </div>
            <img
              className="line-3"
              alt="Line"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/line-2.svg"
            />
          </>
        )}
      </div>
    );
  // ), [isSpeaking, userName, userAnswer, isAnswerCompleted, handleCompleteAnswer, currentQuestionIndex]);
  }, [isQuestionTypingComplete, isAnswerCompleted, userAnswer, currentFeedback, handleCompleteAnswer]);

  // 메인 렌더링
  return (
    <div className="InterviewPlay-overlap-group">
      <div className="InterviewPlay-frame">
        <div className="InterviewPlay-div">
          {storageQuestion.length > 0 && renderHistoryItem()} {/* storageQuestion에 요소가 있을 때만 렌더링 */}
          {!isInterviewEnded && (
            <>
              {renderCurrentQuestion()}
              {typingComplete && renderUserAnswer()}
            </>
          )}
        </div>
      </div>
      <div className="InterviewPlay-frame-5">
        <div className="InterviewPlay-div-2">
          <div className="InterviewPlay-frame-6">
            <img
              className="InterviewPlay-check"
              alt="Check"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/check.svg"
            />
            <div className="InterviewPlay-text-wrapper-3">{selectedType}</div>
          </div>
          <div className="InterviewPlay-frame-6">
            <img
              className="InterviewPlay-check"
              alt="Check"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668e413494e39f8125259743/img/check-1.svg"
            />
            <div className="InterviewPlay-text-wrapper-3">{selectedFeedback}</div>
          </div>
        </div>
        {isInterviewEnded ? (
          <div className="frame-79">
            <div className="text-wrapper-62">면접이 종료되었습니다.</div>
          </div>
        ) : (
          <div className="InterviewPlay-frame-wrapper">
            <div className="InterviewPlay-frame-7">
              <div className="InterviewPlay-frame-8">
                <div className="InterviewPlay-text-wrapper-4">남은 시간</div>
                <div className="InterviewPlay-text-wrapper-5">{formatTime(timeLeft)}</div>
              </div>
              <div className="InterviewPlay-div-2">
                <div className="InterviewPlay-view" onClick={handleEndInterview}>
                  <img
                    className="InterviewPlay-img"
                    alt="Stop circle"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6690d46ff1077d330fbfb9e3/img/stop-circle.svg"
                  />
                  <div className="InterviewPlay-text-wrapper-7">종료</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImmInterview;