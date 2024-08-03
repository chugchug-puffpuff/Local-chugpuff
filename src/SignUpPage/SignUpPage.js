import React, { useState, useEffect } from 'react';
import './SignUpPage.css';
import NavBar from '../MainPage/MainComponent/NavBar';
import { useNavigate } from 'react-router-dom';
import userData from '../TestData/userData.json';
import jobCode from '../TestData/jobCode.json';
import axios from 'axios';

const SignUpPage = ({ authenticate, setAuthenticate }) => {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    job: '',
    keyword: '',
    // email: '',
    // emailCode: '',
    isAdult: false,
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

  // 컴포넌트 마운트 시 직무 리스트 초기화
  useEffect(() => {
    const uniqueJobs = [...new Set(jobCode.map(job => job.jobName))];
    setJobList(uniqueJobs);
  }, []);

  // 사용자 등록을 위한 API 호출
  const registerUser = async (userData) => {
    try {
      const response = await axios.post('http://your-backend-url/api/register', userData);
      return response.data;
    } catch (error) {
      console.error('회원가입 에러:', error);
      throw error;
    }
  };

  // 입력 필드 변경 처리
  const handleChange = (e) => { // 경고문구가 출력된 상태에서 입력란에 값을 입력 시 경고문구 사라짐 
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });

    // 각 필드별 유효성 검사
    if (name === 'name') {
      if (value.length === 0) {
        setErrors({ ...errors, name: '이름을 입력해주세요' });
      } else {
        setErrors({ ...errors, name: '' });
      }
    }

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
    
    // 이메일 인증 추가 시 사용
    // if (name === 'email') {
    //   if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
    //     setErrors({ ...errors, email: '이메일 형식이 아닙니다' });
    //   } else {
    //     setErrors({ ...errors, email: '' });
    //   }
    // }

    // if (name === 'emailCode') {
    //   if (value.length === 0) {
    //     setErrors({ ...errors, emailCode: '인증번호를 입력해주세요' });
    //   } else {
    //     setErrors({ ...errors, emailCode: '' });
    //   }
    // }

    if (type === 'checkbox') {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = '이름을 입력해주세요';
    if (!formData.id) newErrors.id = '아이디를 입력해주세요';
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요';
    if (selectedJob === '희망 직무') newErrors.job = '희망 직무를 선택해주세요';
    if (selectedJobKeyword === '직무 키워드') newErrors.keyword = '직무 키워드를 선택해주세요';
    // if (!formData.email) newErrors.email = '이메일을 입력해주세요';
    // if (!formData.emailCode) newErrors.emailCode = '인증번호를 입력해주세요';
    if (!formData.isAdult) newErrors.isAdult = '만 15세 이상임을 확인해주세요';
    if (!formData.isPrivacy) newErrors.isPrivacy = '개인정보 수집 및 이용에 동의해주세요';
    if (!formData.isVoice) newErrors.isVoice = 'AI모의면접 진행 시 목소리 녹음에 동의해주세요';
    if (!idCheckMessage || isDuplicate) newErrors.idCheck = '아이디 중복 확인을 해주세요';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const userData = {
          name: formData.name,
          id: formData.id,
          password: formData.password,
          job: formData.job,
          keyword: formData.keyword,
          isAdult: formData.isAdult,
          isPrivacy: formData.isPrivacy,
          isVoice: formData.isVoice,
        };
        
        const result = await registerUser(userData);
        console.log('회원가입 성공:', result);
        setShowConfirmation(true);
      } catch (error) {
        console.error('회원가입 실패:', error);
        // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
      }
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
    if (selectedJob !== '희망 직무') {
      setShowJobKeyword(!showJobKeyword);
    }
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
    <form className="SignUpPage" onSubmit={handleSubmit}>
      <div className="SignUpPage-sign-up">
        <div className="SignUpPage-content">
          <div className="SignUpPage-frame">
            <div className="SignUpPage-div">
              <div className="SignUpPage-frame-2">
                <div className="SignUpPage-text-field">
                  <div className="SignUpPage-label-wrapper">
                    <div className="SignUpPage-label">이름(실명)</div>
                  </div>
                  <input className={`SignUpPage-text-field-2 ${errors.name ? 'SignUpPage-error' : ''}`}
                    type="text"
                    name="name" 
                    value={formData.name}
                    placeholder='이름 입력' 
                    onChange={handleChange}
                  />
                  {errors.name && <p className="SignUpPage-error-message">{errors.name}</p>}
                </div>
                <div className="SignUpPage-text-field">
                  <div className="SignUpPage-label-wrapper">
                    <div className="SignUpPage-label">아이디</div>
                  </div>
                  <div className="SignUpPage-frame-3">
                    <input className={`SignUpPage-text-field-3 ${isDuplicate ? 'SignUpPage-duplicate' : ''} ${errors.id ? 'SignUpPage-error' : ''}`}
                      type="text"
                      name="id"
                      value={formData.id}
                      placeholder='4~20자리 / 영문, 숫자 조합'
                      onChange={handleChange}
                    />
                    <div className="SignUpPage-div-wrapper">
                      <button type="button" onClick={checkDuplicateId} className="SignUpPage-text-wrapper">중복 확인</button>
                    </div>
                  </div>
                  {idCheckMessage && <p className={`SignUpPage-id-check-message ${isDuplicate ? 'SignUpPage-duplicate' : 'SignUpPage-available'}`}>{idCheckMessage}</p>}
                  {errors.id && <p className="SignUpPage-error-message">{errors.id}</p>}
                  {errors.idCheck && <p className="SignUpPage-error-message">{errors.idCheck}</p>}
                </div>
                <div className="SignUpPage-text-field">
                  <div className="SignUpPage-label-wrapper">
                    <div className="SignUpPage-label">비밀번호</div>
                  </div>
                  <input className={`SignUpPage-text-field-2 ${errors.password ? 'SignUpPage-error' : ''}`}
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder='8~16자리 / 대소문자, 숫자, 특수문자 조합'
                    onChange={handleChange}
                  />
                  {errors.password && <p className="SignUpPage-error-message">{errors.password}</p>}
                </div>
              </div>
              <img
                className="SignUpPage-line"
                alt="Line"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/line-3.svg"
              />
              <div className="SignUpPage-frame-4">
                <div className="SignUpPage-text-field-4">
                  <div className="SignUpPage-frame-5">
                    <div className="SignUpPage-text-field-wrapper">
                      <div className={`SignUpPage-text-field-5 ${errors.job ? 'SignUpPage-error' : ''}`} onClick={toggleJob}>
                        <div className="SignUpPage-text-wrapper-2">{selectedJob}</div>
                        <img
                          className={showJob ? "SignUpPage-arrow-drop-up" : "SignUpPage-arrow-drop-down"}
                          alt={showJob ? "Arrow drop up" : "Arrow drop down"}
                          src={showJob ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccfaca48cce45c95d9d30/img/arrow-drop-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/arrow-drop-down@2x.png"}
                        />
                      </div>
                      {showJob && (
                        <div className="SignUpPage-frame-6">
                          {jobList.map((job, index) => (
                            <div key={index} className="SignUpPage-text-wrapper-3" onClick={() => selectJob(job)}>
                              {job}
                            </div>
                          ))}
                        </div>
                      )}
                      {errors.job && <p className="SignUpPage-error-message">{errors.job}</p>}
                    </div>
                    <div className="SignUpPage-text-field-wrapper">
                      <div className={`SignUpPage-text-field-5 ${errors.keyword ? 'SignUpPage-error' : ''}`} onClick={toggleJobKeyword}>
                        <div className="SignUpPage-text-wrapper-2">{selectedJobKeyword}</div>
                        <img
                          className={showJobKeyword ? "SignUpPage-arrow-drop-up" : "SignUpPage-arrow-drop-down"}
                          alt={showJobKeyword ? "Arrow drop up" : "Arrow drop down"}
                          src={showJobKeyword ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccfaca48cce45c95d9d30/img/arrow-drop-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/arrow-drop-down@2x.png"}
                        />
                      </div>
                      {showJobKeyword && (
                        <div className="SignUpPage-frame-6">
                          {jobKeywordList.map((keyword, index) => (
                            <div key={index} className="SignUpPage-text-wrapper-3" onClick={() => selectJobKeyword(keyword)}>
                              {keyword}
                            </div>
                          ))}
                        </div>
                      )}
                      {errors.keyword && <p className="SignUpPage-error-message">{errors.keyword}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <img
                className="SignUpPage-line"
                alt="Line"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/line-3.svg"
              />
              {/* <div className="SignUpPage-frame-2">
                <div className="SignUpPage-text-field">
                  <div className="SignUpPage-label-wrapper">
                    <div className="SignUpPage-label">이메일 인증</div>
                  </div>
                  <div className="SignUpPage-frame-3">
                    <input className={`SignUpPage-text-field-6 ${errors.email ? 'SignUpPage-error' : ''}`}
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder='chichipokpok@gmail.com'
                      onChange={handleChange}
                    />
                    <div className="SignUpPage-div-wrapper">
                      <button type="button" className="SignUpPage-text-wrapper">인증번호 전송</button>
                    </div>
                  </div>
                  {errors.email && <p className="SignUpPage-error-message">{errors.email}</p>}
                </div>
                <div className="SignUpPage-text-field">
                  <div className="SignUpPage-label-wrapper">
                    <div className="SignUpPage-label">인증번호 입력</div>
                  </div>
                  <div className="SignUpPage-frame-3">
                    <input className={`SignUpPage-text-field-6 ${errors.emailCode ? 'SignUpPage-error' : ''}`}
                      type="text"
                      name="emailCode"
                      value={formData.emailCode}
                      onChange={handleChange}
                    />
                    <div className="SignUpPage-div-wrapper">
                      <button type="button" className="SignUpPage-text-wrapper">확인</button>
                    </div>
                  </div>
                  {errors.emailCode && <p className="SignUpPage-error-message">{errors.emailCode}</p>}
                </div>
              </div> */}
            </div>
            <div className="SignUpPage-frame-7">
              <div className="SignUpPage-check-box">
                <p className="SignUpPage-p">
                  <span className="SignUpPage-span">[필수]</span>
                  <span className="SignUpPage-text-wrapper-4"> 만 15세 이상입니다</span>
                </p>
                <input
                  type="checkbox"
                  name="isAdult"
                  checked={formData.isAdult}
                  onChange={handleChange}
                />
              </div>
              {errors.isAdult && <p className="SignUpPage-error-message-2">{errors.isAdult}</p>}
              <div className="SignUpPage-check-box">
                <p className="SignUpPage-p">
                  <span className="SignUpPage-span">[필수]</span>
                  <span className="SignUpPage-text-wrapper-4"> 개인정보 수집 및 이용 동의</span>
                </p>
                <input
                  type="checkbox"
                  name="isPrivacy"
                  checked={formData.isPrivacy}
                  onChange={handleChange}
                />
              </div>
              {errors.isPrivacy && <p className="SignUpPage-error-message-2">{errors.isPrivacy}</p>}
              <div className="SignUpPage-check-box">
                <p className="SignUpPage-p">
                  <span className="SignUpPage-span">[필수]</span>
                  <span className="SignUpPage-text-wrapper-4"> AI모의면접 진행 시 귀하의 목소리가 녹음됩니다.</span>
                </p>
                <input
                  type="checkbox"
                  name="isVoice"
                  checked={formData.isVoice}
                  onChange={handleChange}
                />
              </div>
              {errors.isVoice && <p className="SignUpPage-error-message-2">{errors.isVoice}</p>}
            </div>
            <div className="SignUpPage-frame-8">
              <div className="SignUpPage-frame-9">
                <button type="submit" className="SignUpPage-text-wrapper-5">회원가입</button>
              </div>
              <p className="SignUpPage-div-2">
                <span className="SignUpPage-text-wrapper-4">이미 가입된 회원이신가요? </span>
                <button className="SignUpPage-text-wrapper-6" onClick={goToLogin}>로그인</button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} />
      {showConfirmation && (
        <div className="SignUpPage-confirmation-overlay">
          <div className="SignUpPage-confirmation-box">
            <div className="SignUpPage-frame-10">
              <div className="SignUpPage-text-wrapper-7">회원가입 완료</div>
              <p className="SignUpPage-text-wrapper-8">
                치치폭폭 회원이 되셨습니다!
                <br />
                환영합니다^^
              </p>
              <div className="SignUpPage-frame-11">
                <div className="SignUpPage-frame-12" onClick={() => setShowConfirmation(false)}>
                  <div className="SignUpPage-text-wrapper-9" onClick={goToLogin}>로그인 이동</div>
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