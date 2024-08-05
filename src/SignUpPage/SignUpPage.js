import React, { useState, useEffect } from 'react';
import './SignUpPage.css';
import NavBar from '../MainPage/MainComponent/NavBar';
import { useNavigate } from 'react-router-dom';
import userData from '../TestData/userData.json';
import jobCode from '../TestData/jobCode.json';
import axios from 'axios';

const SignUpPage = ({ authenticate, setAuthenticate }) => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    job: '',
    jobKeyword: '',
    email: '', // 이메일 필드 추가
    isAbove15: false,
    privacyPolicyAccepted: false,
    recordingAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [idCheckMessage, setIdCheckMessage] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [jobKeywordList, setJobKeywordList] = useState([]);
  const [selectedJob, setSelectedJob] = useState('희망 직무');
  const [selectedJobKeyword, setSelectedJobKeyword] = useState('직무 키워드');
  const [showJob, setShowJob] = useState(false);
  const [showJobKeyword, setShowJobKeyword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const uniqueJobs = [...new Set(jobCode.map(job => job.jobName))];
    setJobList(uniqueJobs);
  }, []);

  const registerUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/members', userData);
      return response.data;
    } catch (error) {
      console.error('회원가입 에러:', error);
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });

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
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        setErrors({ ...errors, email: '유효한 이메일 주소를 입력해주세요' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }

    if (type === 'checkbox') {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = '이름을 입력해주세요';
    if (!formData.id) newErrors.id = '아이디를 입력해주세요';
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요';
    if (selectedJob === '희망 직무') newErrors.job = '희망 직무를 선택해주세요';
    if (selectedJobKeyword === '직무 키워드') newErrors.jobKeyword = '직무 키워드를 선택해주세요';
    if (!formData.email) newErrors.email = '이메일을 입력해주세요';
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
          job: formData.job,
          jobKeyword: formData.jobKeyword,
          email: formData.email, // 이메일 필드 추가
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
      <div>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름"
          />
          {errors.name && <p>{errors.name}</p>}
          <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="아이디"
          />
          {errors.id && <p>{errors.id}</p>}
          <button type="button" onClick={checkDuplicateId}>아이디 중복 확인</button>
          {idCheckMessage && <p>{idCheckMessage}</p>}
          <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
          />
          {errors.password && <p>{errors.password}</p>}
          <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일"
          />
          {errors.email && <p>{errors.email}</p>}
          <div>
            <button type="button" onClick={toggleJob}>{selectedJob}</button>
            {showJob && (
                <ul>
                  {jobList.map(job => (
                      <li key={job} onClick={() => selectJob(job)}>{job}</li>
                  ))}
                </ul>
            )}
          </div>
          {errors.job && <p>{errors.job}</p>}
          <div>
            <button type="button" onClick={toggleJobKeyword}>{selectedJobKeyword}</button>
            {showJobKeyword && (
                <ul>
                  {jobKeywordList.map(keyword => (
                      <li key={keyword} onClick={() => selectJobKeyword(keyword)}>{keyword}</li>
                  ))}
                </ul>
            )}
          </div>
          {errors.jobKeyword && <p>{errors.jobKeyword}</p>}
          <label>
            <input
                type="checkbox"
                name="isAbove15"
                checked={formData.isAbove15}
                onChange={handleChange}
            />
            만 15세 이상입니다
          </label>
          {errors.isAbove15 && <p>{errors.isAbove15}</p>}
          <label>
            <input
                type="checkbox"
                name="privacyPolicyAccepted"
                checked={formData.privacyPolicyAccepted}
                onChange={handleChange}
            />
            개인정보 수집 및 이용에 동의합니다
          </label>
          {errors.privacyPolicyAccepted && <p>{errors.privacyPolicyAccepted}</p>}
          <label>
            <input
                type="checkbox"
                name="recordingAccepted"
                checked={formData.recordingAccepted}
                onChange={handleChange}
            />
            AI모의면접 진행 시 목소리 녹음에 동의합니다
          </label>
          {errors.recordingAccepted && <p>{errors.recordingAccepted}</p>}
          <button type="submit">회원가입</button>
        </form>
        {showConfirmation && (
            <div>
              <p>회원가입이 완료되었습니다!</p>
              <button onClick={goToLogin}>로그인 페이지로 이동</button>
            </div>
        )}
      </div>
  );
};

export default SignUpPage;