import React, { useState, useEffect } from 'react'
import './EditInformation.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const EditInformation = ({setAuthenticate}) => {
  const jobList = ["기획·전략", "마케팅·홍보·조사", "회계·세무·재무", "인사·노무·HRD", "총무·법무·사무", "IT개발·데이터", "디자인", "영업·판매·무역", "고객상담·TM", "구매·자재·물류", "상품기획·MD", "운전·운송·배송", "서비스", "생산", "건설·건축", "의료", "연구·R&D", "교육", "미디어·문화·스포츠", "금융·보험", "공공·복지"];
  const [selectedJob, setSelectedJob] = useState(localStorage.getItem('job') || '희망 직무');
  const [showJob, setShowJob] = useState(false);
  const [jobKeywordList, setJobKeywordList] = useState([]);
  const [selectedJobKeyword, setSelectedJobKeyword] = useState(localStorage.getItem('jobKeyword') || '직무 키워드');
  const [showJobKeyword, setShowJobKeyword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [passwordConfirmation, setPasswordConfirmation] = useState(false);
  const [jobKeywordConfirmation, setJobKeywordConfirmation] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);
  const [showWithdrawFail, setShowWithdrawFail] = useState(false);
  const [withdrawPassword, setWithdrawPassword] = useState('');
  useEffect(() => {
    const fetchJobKeywords = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/job-postings/job-names?jobMidName=${selectedJob}`);
        setJobKeywordList(response.data);
      } catch (error) {
        console.error('직무 키워드 로드 에러:', error);
      }
    };

    if (selectedJob !== '희망 직무') {
      fetchJobKeywords();
    }
  }, [selectedJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'newPassword') {
      const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
      if (!passwordPattern.test(value)) {
        setErrors({
          ...errors,
          newPasswordFormat: '조합이 일치하지 않습니다.'
        });
      } else {
        const { newPasswordFormat, ...rest } = errors;
        setErrors(rest);
      }
    }

    if (name === 'confirmPassword') {
      const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
      if (!passwordPattern.test(value)) {
        setErrors({
          ...errors,
          confirmPasswordFormat: '조합이 일치하지 않습니다.'
        });
      } else {
        const { confirmPasswordFormat, ...rest } = errors;
        setErrors(rest);
      }
    }

    // 경고 메시지 출력 후 재 입력 시 경고 메시지 사라짐
    if (name === 'currentPassword' && errors.currentPassword) {
      const { currentPassword, ...rest } = errors;
      setErrors(rest);
    }
    if (name === 'newPassword' && errors.newPassword) {
      const { newPassword, ...rest } = errors;
      setErrors(rest);
    }
    if (name === 'confirmPassword' && errors.confirmPassword) {
      const { confirmPassword, ...rest } = errors;
      setErrors(rest);
    }
    if (errors.samePassword) {
      const { samePassword, ...rest } = errors;
      setErrors(rest);
    }
    if (errors.currentPassword) {
      const { currentPassword, ...rest } = errors;
      setErrors(rest);
    }
    if (errors.confirmPassword) {
      const { confirmPassword, ...rest } = errors;
      setErrors(rest);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.currentPassword) newErrors.currentPassword = '현재 비밀번호를 입력해주세요';
    if (!formData.newPassword) newErrors.newPassword = '새로운 비밀번호를 입력해주세요';
    if (!formData.confirmPassword) newErrors.confirmPassword = '새로운 비밀번호 확인을 입력해주세요';
    if (formData.currentPassword === formData.newPassword && formData.newPassword === formData.confirmPassword) newErrors.samePassword = '현재 비밀번호와 동일한 비밀번호입니다.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    const user_id = localStorage.getItem('user_id');
    const { currentPassword, newPassword, confirmPassword } = formData;

    try {
      await axios.put(`http://localhost:8080/api/members/${user_id}/password?oldPassword=${currentPassword}`, {
        newPassword,
        confirmPassword
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPasswordConfirmation(true);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        if (error.response.data === '새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.') {
          setErrors({ confirmPassword: '새로운 비밀번호와 새로운 비밀번호 확인이 일치하지 않습니다.' });
        } else {
          setErrors({ currentPassword: '현재 비밀번호가 일치하지 않습니다.' });
        }
      }
    }
  };

  const toggleJob = () => {
    setShowJob(!showJob);
    if (errors.job) {
      setErrors({ ...errors, job: '' });
    }
  };
  
  const selectJob = async (job) => {
    setSelectedJob(job);
    setSelectedJobKeyword('직무 키워드');
    setFormData({ ...formData, job });
    setShowJob(false);
    // 직무키워드 엔드포인트
    try {
      const response = await axios.get(`http://localhost:8080/api/job-postings/job-names?jobMidName=${job}`);
      setJobKeywordList(response.data);
    } catch (error) {
      console.error('직무 키워드 로드 에러:', error);
    }
  };

  const toggleJobKeyword = () => {
    if (selectedJob !== '희망 직무') {
      setShowJobKeyword(!showJobKeyword);
    }
    if (errors.jobKeyword) {
      const { jobKeyword, ...rest } = errors;
      setErrors(rest);
    }
  };

  const selectJobKeyword = (jobKeyword) => {
    setSelectedJobKeyword(jobKeyword);
    setFormData({ ...formData, jobKeyword });
    setShowJobKeyword(false);
  };

  const handleJobKeywordSubmit = async () => {
    if (selectedJobKeyword === '직무 키워드') {
      setErrors({ jobKeyword: '직무 키워드를 선택해주세요' });
      return;
    }

    const user_id = localStorage.getItem('user_id');
    const data = {
      job: selectedJob,
      jobKeyword: selectedJobKeyword
    };

    try {
      await axios.put(`http://localhost:8080/api/members/${user_id}`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setJobKeywordConfirmation(true);
    } catch (error) {
      console.error('직무 및 직무 키워드 변경 에러:', error);
    }
  };

  const handleWithdraw = async () => {
    const storedPassword = localStorage.getItem('password');
    const user_id = localStorage.getItem('user_id');
    setShowDeleteAccount(false)

    if (withdrawPassword === storedPassword) {
      try {
        await axios.delete(`http://localhost:8080/api/members/${user_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setShowWithdrawSuccess(true);
    } catch (error) {
      console.error('계정 탈퇴 에러:', error);
      setShowWithdrawFail(true);
    }
    } else {
      setShowWithdrawFail(true);
      setWithdrawPassword('')
    }
  };

  return (
    <div className="EditInformation-div">
      <div className="EditInformation-text-wrapper">내 정보 변경</div>
      <div className="EditInformation-frame-wrapper">
        <div className="EditInformation-frame-2">
          <div className="EditInformation-frame-3">
            <div className="EditInformation-frame-4">
              <div className="EditInformation-label-wrapper">
                <div className="EditInformation-label">비밀번호 변경</div>
              </div>
              <div className="EditInformation-frame-5">
                <div className="EditInformation-text-field">
                  <div className="EditInformation-label-wrapper">
                    <div className="EditInformation-label-2">현재 비밀번호 확인</div>
                  </div>
                  <input className="SignUpPage-text-field-2"
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    placeholder='현재 비밀번호를 입력해주세요'
                    onChange={handleChange}
                    />
                    {errors.currentPassword && <div className="error-message">{errors.currentPassword}</div>}
                </div>
                <div className="EditInformation-text-field">
                  <div className="EditInformation-label-wrapper">
                    <div className="EditInformation-label-2">새로운 비밀번호</div>
                  </div>
                  <input className="SignUpPage-text-field-2"
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    placeholder='8~16자리 / 대소문자, 숫자, 특수문자 조합'
                    onChange={handleChange}
                  />
                  {errors.newPassword && <div className="error-message">{errors.newPassword}</div>}
                  {errors.newPasswordFormat && <div className="error-message">{errors.newPasswordFormat}</div>}
                </div>
                <div className="EditInformation-text-field">
                  <div className="EditInformation-label-wrapper">
                    <div className="EditInformation-label-2">새로운 비밀번호 확인</div>
                  </div>
                  <input className="SignUpPage-text-field-2"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder='8~16자리 / 대소문자, 숫자, 특수문자 조합'
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                  {errors.confirmPasswordFormat && <div className="error-message">{errors.confirmPasswordFormat}</div>}
                  {errors.samePassword && <div className="error-message">{errors.samePassword}</div>}
                </div>
              </div>
              <div className="EditInformation-frame-13" onClick={handlePasswordSubmit}>
                <div className="EditInformation-text-wrapper-5">변경하기</div>
              </div>
            </div>
          </div>
          <div className="EditInformation-frame-7">
            <div className="EditInformation-frame-8">
              <div className="EditInformation-label-wrapper">
                <p className="EditInformation-label">직무 · 직무 키워드 변경</p>
              </div>
              <div className="EditInformation-frame-9">
                <div className="EditInformation-text-field">
                  <div className="EditInformation-frame-10">
                    <div className="EditInformation-text-field-wrapper">
                      <div className="SignUpPage-text-field-5" onClick={toggleJob}>
                        <div className="SignUpPage-text-wrapper-2">{selectedJob}</div>
                        <img
                          className={showJob ? "SignUpPage-arrow-drop-up" : "SignUpPage-arrow-drop-down"}
                          alt={showJob ? "Arrow drop up" : "Arrow drop down"}
                          src={showJob ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccfaca48cce45c95d9d30/img/arrow-drop-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/arrow-drop-down@2x.png"}
                        />
                      </div>
                      {showJob && (
                        <div className="jobAndKeywordSelect-frame">
                          {jobList.map((job, index) => (
                            <div key={index} className="SignUpPage-text-wrapper-3" onClick={() => selectJob(job)}>
                              {job}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="EditInformation-text-field-wrapper">
                      <div className="SignUpPage-text-field-5" onClick={toggleJobKeyword}>
                        <div className="SignUpPage-text-wrapper-2">{selectedJobKeyword}</div>
                        <img
                            className={showJobKeyword ? "SignUpPage-arrow-drop-up" : "SignUpPage-arrow-drop-down"}
                            alt={showJobKeyword ? "Arrow drop up" : "Arrow drop down"}
                            src={showJobKeyword ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccfaca48cce45c95d9d30/img/arrow-drop-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/arrow-drop-down@2x.png"}
                        />
                      </div>
                      {showJobKeyword && (
                        <div className="jobAndKeywordSelect-frame">
                          {jobKeywordList.map((jobKeyword, index) => (
                            <div key={index} className="SignUpPage-text-wrapper-3" onClick={() => selectJobKeyword(jobKeyword)}>
                              {jobKeyword}
                            </div>
                          ))}
                        </div>
                      )}
                      {errors.jobKeyword && <div className="error-message">{errors.jobKeyword}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="EditInformation-frame-14" onClick={handleJobKeywordSubmit}>
              <div className="EditInformation-text-wrapper-5">변경하기</div>
            </div>
          </div>
        </div>
        <div className="EditInformation-frame-15" onClick={() => setShowDeleteAccount(true)}>
          <div className="EditInformation-text-wrapper-6">계정탈퇴</div>
        </div>
      </div>
      {passwordConfirmation && (
        <div className="SignUpPage-confirmation-overlay">
          <div className="SignUpPage-confirmation-box">
            <div className="SignUpPage-frame-10">
              <div className="SignUpPage-text-wrapper-7">비밀번호 변경 완료</div>
              <p className="SignUpPage-text-wrapper-8">비밀번호가 성공적으로 변경되었습니다.</p>
              <div className="SignUpPage-frame-11">
                <div className="SignUpPage-frame-12" 
                  onClick={() => {
                    setPasswordConfirmation(false);
                    setAuthenticate(false);
                    navigate('/login');
                  }}>
                  <div className="SignUpPage-text-wrapper-9">확인</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {jobKeywordConfirmation && (
        <div className="SignUpPage-confirmation-overlay">
          <div className="SignUpPage-confirmation-box">
            <div className="SignUpPage-frame-10">
              <div className="SignUpPage-text-wrapper-7">직무&키워드 변경 완료</div>
              <p className="SignUpPage-text-wrapper-8">직무 및 직무 키워드가 성공적으로 변경되었습니다.</p>
              <div className="SignUpPage-frame-11">
                <div className="SignUpPage-frame-12" 
                  onClick={() => {
                    setJobKeywordConfirmation(false);
                    navigate('/myactivities/editInformation');
                  }}>
                  <div className="SignUpPage-text-wrapper-9">확인</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteAccount && (
        <div className="SignUpPage-confirmation-overlay">
          <div className="SignUpPage-confirmation-box">
            <div className="SignUpPage-frame-10">
              <div className="SignUpPage-text-wrapper-7">치치폭폭 계정 탈퇴</div>
              <p className="SignUpPage-text-wrapper-8">현재 비밀번호를 입력해주세요.</p>
              <div className="SignUpPage-frame-11">
                <input
                  className="SignUpPage-text-field-2"
                  type="password"
                  value={withdrawPassword}
                  onChange={(e) => setWithdrawPassword(e.target.value)}
                />
              </div>
              <div className="InterviewHistoryBar-frame-81">
                <div className="InterviewHistoryBar-frame-82" onClick={() => setShowDeleteAccount(false)}>
                  <div className="InterviewHistoryBar-text-wrapper-62">취소</div>
                </div>
                <div className="InterviewHistoryBar-frame-83" onClick={handleWithdraw}>
                  <div className="InterviewHistoryBar-text-wrapper-63">탈퇴</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showWithdrawSuccess && (
        <div className="SignUpPage-confirmation-overlay">
          <div className="SignUpPage-confirmation-box">
            <div className="SignUpPage-frame-10">
              <div className="SignUpPage-text-wrapper-7">탈퇴 완료</div>
              <p className="SignUpPage-text-wrapper-8">치치폭폭 계정이 성공적으로 탈퇴되었습니다.</p>
              <div className="SignUpPage-frame-11">
                <div className="SignUpPage-frame-12" onClick={() => {
                  setShowWithdrawSuccess(false);
                  setAuthenticate(false);
                  navigate('/');
                }}>
                  <div className="SignUpPage-text-wrapper-9">확인</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showWithdrawFail && (
        <div className="SignUpPage-confirmation-overlay">
          <div className="SignUpPage-confirmation-box">
            <div className="SignUpPage-frame-10">
              <div className="SignUpPage-text-wrapper-7">탈퇴 실패</div>
              <p className="SignUpPage-text-wrapper-8">비밀번호가 일치하지 않습니다.</p>
              <div className="SignUpPage-frame-11">
                <div className="SignUpPage-frame-12" onClick={() => setShowWithdrawFail(false)}>
                  <div className="SignUpPage-text-wrapper-9">확인</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>  
  )
}

export default EditInformation