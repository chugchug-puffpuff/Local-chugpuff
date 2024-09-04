import React, { useState, useEffect } from 'react';
import './SignUpPage.css';
import NavBar from '../MainPage/MainComponent/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = ({ authenticate, setAuthenticate }) => {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    email: '',
    job: '',
    jobKeyword: '',
    isAbove15: false,
    privacyPolicyAccepted: false,
    recordingAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [idCheckMessage, setIdCheckMessage] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [jobKeywordList, setJobKeywordList] = useState([]);
  const [selectedJob, setSelectedJob] = useState('희망 직무');
  const [selectedJobKeyword, setSelectedJobKeyword] = useState('직무 키워드');
  const [showJob, setShowJob] = useState(false);
  const [showJobKeyword, setShowJobKeyword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const jobList = ["기획·전략", "마케팅·홍보·조사", "회계·세무·재무", "인사·노무·HRD", "총무·법무·사무", "IT개발·데이터", "디자인", "영업·판매·무역", "고객상담·TM", "구매·자재·물류", "상품기획·MD", "운전·운송·배송", "서비스", "생산", "건설·건축", "의료", "연구·R&D", "교육", "미디어·문화·스포츠", "금융·보험", "공공·복지"];

  // 사용자 등록을 위한 API 호출
  const registerUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/members', userData);
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

    if (name === 'email') {
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
        setErrors({ ...errors, email: '이메일 형식이 아닙니다' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }

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
    if (!formData.email) newErrors.email = '이메일을 입력해주세요';
    if (selectedJob === '희망 직무') newErrors.job = '희망 직무를 선택해주세요';
    if (selectedJobKeyword === '직무 키워드') newErrors.jobKeyword = '직무 키워드를 선택해주세요';
    if (!formData.isAbove15) newErrors.isAbove15 = '만 15세 이상임을 확인해주세요';
    if (!formData.privacyPolicyAccepted) newErrors.privacyPolicyAccepted = '개인정보 수집 및 이용에 동의해주세요';
    if (!formData.recordingAccepted) newErrors.recordingAccepted = 'AI모의면접 진행 시 목소리 녹음에 동의해주세요';
    if (!idCheckMessage || isDuplicate) newErrors.idCheck = '아이디 중복 확인을 해주세요';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const userData = {
          name: formData.name,
          id: formData.id,
          password: formData.password,
          email: formData.email,
          job: formData.job,
          jobKeyword: formData.jobKeyword,
          isAbove15: formData.isAbove15,
          privacyPolicyAccepted: formData.privacyPolicyAccepted,
          recordingAccepted: formData.recordingAccepted,
        };

        const result = await registerUser(userData);
        console.log('회원가입 성공:', result);
        setShowConfirmation(true);
      } catch (error) {
        console.error('회원가입 실패:', error);
      }
    }
  };

  // 아이디 중복 확인
  const checkDuplicateId = async () => {

    if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,20}$/.test(formData.id)) {
      setIdCheckMessage('올바른 형식으로 ID를 입력해주세요');
      setIsDuplicate(true);
    } else {
      try {
        const response = await axios.get(`http://localhost:8080/api/members/checkUserId?id=${formData.id}`);
        if (response.data) {
          setIdCheckMessage('이미 등록된 아이디입니다');
          setIsDuplicate(true);
        } else {
          setIdCheckMessage('사용가능한 아이디입니다');
          setIsDuplicate(false);
        }
      } catch (error) {
        console.error('중복 확인 에러:', error);
        setIdCheckMessage('중복 확인 중 오류가 발생했습니다');
        setIsDuplicate(true);
      }
    }
    setErrors({ ...errors, idCheck: '' });
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const toggleJob = () => {
    setShowJob(!showJob);
    if (errors.job) {
      setErrors({ ...errors, job: '' });
    }
  };
  
  const selectJob = async (job) => {
    setSelectedJob(job);
    setFormData({ ...formData, job });
    setShowJob(false);
    // 직무키워드 엔드포인트
    try {
      const response = await axios.get(`http://localhost:8080/api/job-postings/job-names?jobMidName=${job}`);
      setJobKeywordList(response.data);
    } catch (error) {
      console.error('직무 키워드 로드 에러:', error);
    }

    if (errors.job) {
      setErrors({ ...errors, job: '' });
    }
  };

  const toggleJobKeyword = () => {
    if (selectedJob !== '희망 직무') {
      setShowJobKeyword(!showJobKeyword);
    }
    if (errors.jobKeyword) {
      setErrors({ ...errors, jobKeyword: '' });
    }
  };

  const selectJobKeyword = (jobKeyword) => {
    setSelectedJobKeyword(jobKeyword);
    setFormData({ ...formData, jobKeyword });
    setShowJobKeyword(false);
    if (errors.jobKeyword) {
      setErrors({ ...errors, jobKeyword: '' });
    }
  };

  return (
      <div className="SignUpPage">
        <div className="SignUpPage-sign-up">
          <div className="SignUpPage-content">
            <form className="SignUpPage-frame" onSubmit={handleSubmit}>
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
                  <div className="SignUpPage-text-field">
                    <div className="SignUpPage-label-wrapper">
                      <div className="SignUpPage-label">이메일</div>
                    </div>
                    <div className="SignUpPage-frame-3">
                      <input className={`SignUpPage-text-field-6 ${errors.email ? 'SignUpPage-error' : ''}`}
                             type="email"
                             name="email"
                             value={formData.email}
                             placeholder='chichipokpok@gmail.com'
                             onChange={handleChange}
                      />
                    </div>
                    {errors.email && <p className="SignUpPage-error-message">{errors.email}</p>}
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
                        <div className={`SignUpPage-text-field-5 ${errors.jobKeyword ? 'SignUpPage-error' : ''}`} onClick={toggleJobKeyword}>
                          <div className="SignUpPage-text-wrapper-2">{selectedJobKeyword}</div>
                          <img
                              className={showJobKeyword ? "SignUpPage-arrow-drop-up" : "SignUpPage-arrow-drop-down"}
                              alt={showJobKeyword ? "Arrow drop up" : "Arrow drop down"}
                              src={showJobKeyword ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccfaca48cce45c95d9d30/img/arrow-drop-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/arrow-drop-down@2x.png"}
                          />
                        </div>
                        {showJobKeyword && (
                            <div className="SignUpPage-frame-6">
                              {jobKeywordList.map((jobKeyword, index) => (
                                  <div key={index} className="SignUpPage-text-wrapper-3" onClick={() => selectJobKeyword(jobKeyword)}>
                                    {jobKeyword}
                                  </div>
                              ))}
                            </div>
                        )}
                        {errors.jobKeyword && <p className="SignUpPage-error-message">{errors.jobKeyword}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <img
                    className="SignUpPage-line"
                    alt="Line"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/line-3.svg"
                />
              </div>
              <div className="SignUpPage-frame-7">
                <div className="SignUpPage-check-box">
                  <p className="SignUpPage-p">
                    <span className="SignUpPage-span">[필수]</span>
                    <span className="SignUpPage-text-wrapper-4"> 만 15세 이상입니다</span>
                  </p>
                  <input
                      type="checkbox"
                      name="isAbove15"
                      checked={formData.isAbove15}
                      onChange={handleChange}
                  />
                </div>
                {errors.isAbove15 && <p className="SignUpPage-error-message-2">{errors.isAbove15}</p>}
                <div className="SignUpPage-check-box">
                  <p className="SignUpPage-p">
                    <span className="SignUpPage-span">[필수]</span>
                    <span className="SignUpPage-text-wrapper-4"> 개인정보 수집 및 이용 동의</span>
                  </p>
                  <input
                      type="checkbox"
                      name="privacyPolicyAccepted"
                      checked={formData.privacyPolicyAccepted}
                      onChange={handleChange}
                  />
                </div>
                {errors.privacyPolicyAccepted && <p className="SignUpPage-error-message-2">{errors.privacyPolicyAccepted}</p>}
                <div className="SignUpPage-check-box">
                  <p className="SignUpPage-p">
                    <span className="SignUpPage-span">[필수]</span>
                    <span className="SignUpPage-text-wrapper-4"> AI모의면접 진행 시 귀하의 목소리가 녹음됩니다.</span>
                  </p>
                  <input
                      type="checkbox"
                      name="recordingAccepted"
                      checked={formData.recordingAccepted}
                      onChange={handleChange}
                  />
                </div>
                {errors.recordingAccepted && <p className="SignUpPage-error-message-2">{errors.recordingAccepted}</p>}
              </div>
              <div className="SignUpPage-frame-8">
                <button type="submit" className="SignUpPage-frame-9">
                  <div className="SignUpPage-text-wrapper-5">회원가입</div>
                </button>
                <p className="SignUpPage-div-2">
                  <span className="SignUpPage-text-wrapper-4">이미 가입된 회원이신가요? </span>
                  <button className="SignUpPage-text-wrapper-6" onClick={goToLogin}>로그인</button>
                </p>
              </div>
            </form>
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
      </div>
  );
};

export default SignUpPage;