import React , {useState, useEffect} from 'react'
import './MyInfoBar.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const MyInfoBar = ({ setAuthenticate }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userIdentifier, setUserIdentifier] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('id'); // 사용자 ID 가져오기

        if (!userId) {
          throw new Error('User ID not found in local storage');
        }

        const response = await axios.get(`http://localhost:8080/api/members/username/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserName(response.data.name);
        setUserIdentifier(response.data.id);
      } catch (error) {
        console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchUserData();
  });

  const handleLogout = async () => {
    try {
      // JWT 토큰 삭제
      localStorage.removeItem("token");
      setAuthenticate(false);
      navigate("/"); // 메인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  const goToMyActivities = (component) => {
    navigate(`/myactivities/${component}`);
  };

  return (
    <div className="MyInfoBar-frame-15">
      <div className="MyInfoBar-frame-16">
        <img
          className="MyInfoBar-account-circle"
          alt="Account circle"
          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/account-circle.svg"
        />
        <div className="MyInfoBar-frame-17">
          <div className="MyInfoBar-frame-18">
            <div className="MyInfoBar-text-wrapper-8">{userName}</div>
            <div className="MyInfoBar-text-wrapper-9">{userIdentifier}</div>
          </div>
          <div className="MyInfoBar-frame-19" onClick={() => goToMyActivities('editInformation')}>
            <div className="MyInfoBar-text-wrapper-10">내 정보 변경</div>
          </div>
        </div>
      </div>
      <img
        className="MyInfoBar-line-2"
        alt="Line"
        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/line-18.svg"
      />
      <div className="MyInfoBar-frame-20">
        <div className="MyInfoBar-frame-21">
          <div className="MyInfoBar-text-wrapper-11" onClick={() => goToMyActivities('myScrap')}>스크랩한 공고</div>
        </div>
        <div className="MyInfoBar-frame-21">
          <div className="MyInfoBar-text-wrapper-11">나의 활동</div>
          <div className="MyInfoBar-frame-21">
            <div className="MyInfoBar-frame-22">
              <div className="MyInfoBar-frame-23" />
              <div className="MyInfoBar-text-wrapper-12" onClick={() => goToMyActivities('myBoard')}>내가 작성한 게시물</div>
            </div>
            <div className="MyInfoBar-frame-22">
              <div className="MyInfoBar-frame-23" />
              <div className="MyInfoBar-text-wrapper-12" onClick={() => goToMyActivities('myComment')}>내가 작성한 댓글</div>
            </div>
            <div className="MyInfoBar-frame-22">
              <div className="MyInfoBar-frame-23" />
              <div className="MyInfoBar-text-wrapper-12" onClick={() => goToMyActivities('myLiked')}>좋아요 누른 게시물</div>
            </div>
          </div>
        </div>
      </div>
      <div className="MyInfoBar-frame-24" onClick={handleLogout}>
        <img
          className="MyInfoBar-line-3"
          alt="Line"
          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/line-18.svg"
        />
        <div className="MyInfoBar-text-wrapper-13">로그아웃</div>
      </div>
    </div>
  )
}

export default MyInfoBar