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
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const uniqueJobs = [...new Set(jobCode.map(job => job.jobName))];
    setJobList(uniqueJobs);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });

    if (name === 'id') {
      if (value.length === 0 || !/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,20}$/.test(value)) {
        setErrors({ ...errors, id: '조합이 일치하지 않습니다' });
      } else {
        setErrors({ ...errors, id: '' });
        setIdCheckMessage('');
      }
    }

    if (name === 'password') {
      if (!/^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(value)) {
        setErrors({ ...errors, password: '조합이 일치하지 않습니다' });
      } else {
        setErrors({ ...errors, password: '' });
      }
    }

    if (name === 'email') {
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
        setErrors({ ...errors, email: '이메일 형식이 아닙니다' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = '이름을 입력해주세요';
    if (!formData.id) newErrors.id = '아이디를 입력해주세요';
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요';
    if (selectedJob === '희망 직무') newErrors.job = '희망 직무를 선택해주세요';
    if (selectedJobKeyword === '직무 키워드') newErrors.keyword = '직무 키워드를 선택해주세요';
    if (!formData.email) newErrors.email = '이메일을 입력해주세요';
    if (!formData.emailCode) newErrors.emailCode = '인증번호를 입력해주세요';
    if (!formData.isAdult) newErrors.isAdult = '만 15세 이상임을 확인해주세요';
    if (!formData.isTerms) newErrors.isTerms = '이용약관에 동의해주세요';
    if (!formData.isPrivacy) newErrors.isPrivacy = '개인정보 수집 및 이용에 동의해주세요';
    if (!formData.isVoice) newErrors.isVoice = 'AI모의면접 진행 시 목소리 녹음에 동의해주세요';
    if (!idCheckMessage || isDuplicate) newErrors.idCheck = '아이디 중복 확인을 해주세요';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('회원가입 정보', formData);
      setShowConfirmation(true);
    }
  };

  const checkDuplicateId = () => {
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,20}$/.test(formData.id)) {
      setIdCheckMessage('올바른 형식으로 ID를 입력해주세요');
      setIsDuplicate(true);
    } else {
      const userExists = userData.some(user => user.id === formData.id);
      if (userExists) {
        setIdCheckMessage('이미 등록된 아이디입니다');
        setIsDuplicate(true);
      } else {
        setIdCheckMessage('사용가능한 아이디입니다');
        setIsDuplicate(false);
      }
    }
    setErrors({ ...errors, idCheck: '' });
  };

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };

  const toggleJob = () => {
    setShowJob(!showJob);
    if (errors.job) {
      setErrors({ ...errors, job: '' });
    }
  };

  const selectJob = (job) => {
    setSelectedJob(job);
    setFormData({ ...formData, job });
    setShowJob(false);
    const keywords = jobCode.filter(item => item.jobName === job).map(item => item.jobKeywordName);
    setJobKeywordList(keywords);
    if (errors.job) {
      setErrors({ ...errors, job: '' });
    }
  };

  const toggleJobKeyword = () => {
    setShowJobKeyword(!showJobKeyword);
    if (errors.keyword) {
      setErrors({ ...errors, keyword: '' });
    }
  };

  const selectJobKeyword = (keyword) => {
    setSelectedJobKeyword(keyword);
    setFormData({ ...formData, keyword });
    setShowJobKeyword(false);
    if (errors.keyword) {
      setErrors({ ...errors, keyword: '' });
    }
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
                  <input className={`text-field-2 ${errors.name ? 'error' : ''}`}
                    type="text"
                    name="name" 
                    value={formData.name}
                    placeholder='이름 입력' 
                    onChange={handleChange}
                  />
                  {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                <div className="text-field">
                  <div className="label-wrapper">
                    <div className="label">아이디</div>
                  </div>
                  <div className="frame-3">
                    <input className={`text-field-3 ${isDuplicate ? 'duplicate' : ''} ${errors.id ? 'error' : ''}`}
                      type="text"
                      name="id"
                      value={formData.id}
                      placeholder='4~20자리 / 영문, 숫자 조합'
                      onChange={handleChange}
                    />
                    <div className="div-wrapper">
                      <button type="button" onClick={checkDuplicateId} className="text-wrapper">중복 확인</button>
                    </div>
                  </div>
                  {idCheckMessage && <p className={`id-check-message ${isDuplicate ? 'duplicate' : 'available'}`}>{idCheckMessage}</p>}
                  {errors.id && <p className="error-message">{errors.id}</p>}
                  {errors.idCheck && <p className="error-message">{errors.idCheck}</p>}
                </div>
                <div className="text-field">
                  <div className="label-wrapper">
                    <div className="label">비밀번호</div>
                  </div>
                  <input className={`text-field-2 ${errors.password ? 'error' : ''}`}
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder='8~16자리 / 대소문자, 숫자, 특수문자 조합'
                    onChange={handleChange}
                  />
                  {errors.password && <p className="error-message">{errors.password}</p>}
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
                      <div className={`A-text-field-3 ${errors.job ? 'error' : ''}`} onClick={toggleJob}>
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
                    {errors.job && <p className="error-message">{errors.job}</p>}
                    </div>
                    <div className="A-text-field-wrapper">
                      <div className={`A-text-field-3 ${errors.keyword ? 'error' : ''}`} onClick={toggleJobKeyword}>
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
                      {errors.keyword && <p className="error-message">{errors.keyword}</p>}
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
                    <input className={`text-field-5 ${errors.email ? 'error' : ''}`}
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder='chichipokpok@gmail.com'
                      onChange={handleChange}
                    />
                    <div className="div-wrapper">
                      <button type="button" className="text-wrapper">인증번호 전송</button>
                    </div>
                  </div>
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="text-field">
                  <div className="label-wrapper">
                    <div className="label">인증번호 입력</div>
                  </div>
                  <div className="frame-3">
                    <input className={`text-field-5 ${errors.emailCode ? 'error' : ''}`}
                      type="text"
                      name="emailCode"
                      value={formData.emailCode}
                      onChange={handleChange}
                    />
                    <div className="div-wrapper">
                      <button type="button" className="text-wrapper">확인</button>
                    </div>
                  </div>
                  {errors.emailCode && <p className="error-message">{errors.emailCode}</p>}
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
                />
              </div>
              {errors.isAdult && <p className="error-message-2">{errors.isAdult}</p>}
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
                />
              </div>
              {errors.isTerms && <p className="error-message-2">{errors.isTerms}</p>}
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
                />
              </div>
              {errors.isPrivacy && <p className="error-message-2">{errors.isPrivacy}</p>}
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
                />
              </div>
              {errors.isVoice && <p className="error-message-2">{errors.isVoice}</p>}
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
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <div className="B-frame-17">
              <div className="B-text-wrapper-12">회원가입 완료</div>
              <p className="B-text-wrapper-13">
                치치폭폭 회원이 되셨습니다!
                <br />
                환영합니다^^
              </p>
              <div className="B-frame-18">
                <div className="B-frame-19" onClick={() => setShowConfirmation(false)}>
                  <div className="B-text-wrapper-14" onClick={goToLogin}>로그인 이동</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default SignUpPage;