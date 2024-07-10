import React, { useState, useEffect } from 'react';
import './SignUpPage.css';
import NavBar from '../MainPage/MainComponent/NavBar';
import { useNavigate } from 'react-router-dom';
import userData from '../TestData/userData.json';
import jobCode from '../TestData/jobCode.json';

const SignUpPage = ({ authenticate, setAuthenticate }) => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    job: '',
    keyword: '',
    email: '',
    emailCode: '',
    isAdult: false,
    isTerms: false,
    isPrivacy: false,
    isVoice: false,
  });

  const [idCheckMessage, setIdCheckMessage] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [showJob, setShowJob] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [selectedJob, setSelectedJob] = useState('희망 직무');
  const [showJobKeyword, setShowJobKeyword] = useState(false);
  const [jobKeywordList, setJobKeywordList] = useState([]);
  const [selectedJobKeyword, setSelectedJobKeyword] = useState('직무 키워드');

  useEffect(() => {
    const uniqueJobs = [...new Set(jobCode.map(job => job.jobName))];
    setJobList(uniqueJobs);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('회원가입 정보', formData);
  };

  const checkDuplicateId = () => {
    const userExists = userData.some(user => user.id === formData.id);
    if (userExists) {
      setIdCheckMessage('이미 등록된 아이디입니다');
      setIsDuplicate(true);
    } else {
      setIdCheckMessage('사용가능한 아이디입니다');
      setIsDuplicate(false);
    }
  };

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };

  const toggleJob = () => {
    setShowJob(!showJob);
  };

  const selectJob = (job) => {
    setSelectedJob(job);
    setShowJob(false);
    const keywords = jobCode.filter(item => item.jobName === job).map(item => item.jobKeywordName);
    setJobKeywordList(keywords);
  };

  const toggleKeyword = () => {
    setShowJobKeyword(!showJobKeyword);
  };

  const selectJobKeyword = (keyword) => {
    setSelectedJobKeyword(keyword);
    setShowJobKeyword(false);
  };

  return (
    <form className="a" onSubmit={handleSubmit}>
      <div className="sign-up">
        <div className="content">
          <div className="frame">
            <div className="div">
              <div className="frame-2">
                <div className="text-field">
                  <div className="label-wrapper">
                    <div className="label">이름(실명)</div>
                  </div>
                  <input className="text-field-2"
                    type="text"
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-field">
                  <div className="label-wrapper">
                    <div className="label">아이디</div>
                  </div>
                  <div className="frame-3">
                    <input className={`text-field-3 ${isDuplicate ? 'duplicate' : ''}`}
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      required
                    />
                    <div className="div-wrapper">
                      <button type="button" onClick={checkDuplicateId} className="text-wrapper">중복 확인</button>
                    </div>
                  </div>
                  {idCheckMessage && <p className={`id-check-message ${isDuplicate ? 'duplicate' : 'available'}`}>{idCheckMessage}</p>}
                </div>
                <div className="text-field">
                  <div className="label-wrapper">
                    <div className="label">비밀번호</div>
                  </div>
                  <input className="text-field-2"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <img
                className="SignUpPage-line"
                alt="Line"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/line-3.svg"
              />
              <div className="A-frame-3">
                <div className="A-text-field">
                  <div className="A-frame-4">
                    <div className="A-text-field-wrapper">
                      <div className="A-text-field-3" onClick={toggleJob}>
                        <div className="A-text-wrapper">{selectedJob}</div>
                        <img
                          className={showJob ? "A-arrow-drop-up" : "arrow-drop-down"}
                          alt={showJob ? "Arrow drop up" : "Arrow drop down"}
                          src={showJob ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccfaca48cce45c95d9d30/img/arrow-drop-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/arrow-drop-down@2x.png"}
                        />
                      </div>
                      {showJob && (
                        <div className="A-frame-6">
                          {jobList.map((job, index) => (
                            <div key={index} className="A-text-wrapper-2" onClick={() => selectJob(job)}>
                              {job}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="A-text-field-wrapper">
                      <div className="A-text-field-3" onClick={toggleKeyword}>
                        <div className="A-text-wrapper">{selectedJobKeyword}</div>
                        <img
                          className={showJobKeyword ? "A-arrow-drop-up" : "arrow-drop-down"}
                          alt={showJobKeyword ? "Arrow drop up" : "Arrow drop down"}
                          src={showJobKeyword ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccfaca48cce45c95d9d30/img/arrow-drop-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/arrow-drop-down@2x.png"}
                        />
                      </div>
                      {showJobKeyword && (
                        <div className="A-frame-6">
                          {jobKeywordList.map((keyword, index) => (
                            <div key={index} className="A-text-wrapper-2" onClick={() => selectJobKeyword(keyword)}>
                              {keyword}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <img
                className="SignUpPage-line"
                alt="Line"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/line-3.svg"
              />
              <div className="frame-2">
                <div className="text-field">
                  <div className="label-wrapper">
                    <div className="label">이메일 인증</div>
                  </div>
                  <div className="frame-3">
                    <input className="text-field-5"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="div-wrapper">
                      <button type="button" className="text-wrapper">인증번호 전송</button>
                    </div>
                  </div>
                </div>
                <div className="text-field">
                  <div className="label-wrapper">
                    <div className="label">인증번호 입력</div>
                  </div>
                  <div className="frame-3">
                    <input className="text-field-5"
                      type="text"
                      name="emailCode"
                      value={formData.emailCode}
                      onChange={handleChange}
                      required
                    />
                    <div className="div-wrapper">
                      <button type="button" className="text-wrapper">확인</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-5">
              <div className="check-box">
                <p className="p">
                  <span className="span">[필수]</span>
                  <span className="text-wrapper-2"> 만 15세 이상입니다</span>
                </p>
                <input
                  type="checkbox"
                  name="isAdult"
                  checked={formData.isAdult}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="check-box">
                <p className="p">
                  <span className="span">[필수]</span>
                  <span className="text-wrapper-2"> 이용약관 동의</span>
                </p>
                <input
                  type="checkbox"
                  name="isTerms"
                  checked={formData.isTerms}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="check-box">
                <p className="p">
                  <span className="span">[필수]</span>
                  <span className="text-wrapper-2"> 개인정보 수집 및 이용 동의</span>
                </p>
                <input
                  type="checkbox"
                  name="isPrivacy"
                  checked={formData.isPrivacy}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="check-box">
                <p className="p">
                  <span className="span">[필수]</span>
                  <span className="text-wrapper-2"> AI모의면접 진행 시 귀하의 목소리가 녹음됩니다.</span>
                </p>
                <input
                  type="checkbox"
                  name="isVoice"
                  checked={formData.isVoice}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="frame-6">
              <div className="frame-7">
                <button type="submit" className="text-wrapper-3">회원가입</button>
              </div>
              <p className="div-2">
                <span className="text-wrapper-2">이미 가입된 회원이신가요? </span>
                <button className="text-wrapper-4" onClick={goToLogin}>로그인</button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} />
    </form>
  );
};

export default SignUpPage;