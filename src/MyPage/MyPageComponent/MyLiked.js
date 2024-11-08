import React, { useState, useEffect } from 'react'
import './MyLiked.css'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import Pagination from '../../Route/Pagination.js';
import sms_icon from '../../Icon/sms.png'
import favorite_icon from '../../Icon/favorite.png'
import line_4_icon from '../../Icon/Line_4.png'

// 날짜 형식을 0000-00-00 00:00:00으로 변환
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const datePart = date.toISOString().split('T')[0];
  const timePart = date.toTimeString().split(' ')[0];

  return `${datePart} ${timePart}`;
};

const Post = ({ boardNo, boardTitle, category, commentCount, likes, boardDate }) => (
  <div className="MyLiked-view">
    <div className="MyLiked-frame-9">
      <div className="MyLiked-frame-10">
        <Link to={`/communitypost/${boardNo}`}>
          <p className="MyLiked-p">{boardTitle}</p>
        </Link>
        <div className={category === "정보공유" ? "MyLiked-frame-11" : "MyLiked-frame-14"}>
          <div className="MyLiked-text-wrapper-5">{category}</div>
        </div>
      </div>
      <div className="MyLiked-frame-10">
        <div className="MyLiked-frame-12">
          <div className="MyLiked-frame-13">
            <img
              className="MyLiked-img"
              alt="Sms"
              src={sms_icon}
            />
            <div className="MyLiked-text-wrapper-6">{commentCount}</div>
          </div>
          <div className="MyLiked-frame-13">
            <img
              className="MyLiked-img liked"
              alt="Favorite"
              src={favorite_icon}
            />
            <div className="MyLiked-text-wrapper-6">{likes}</div>
          </div>
        </div>
        <div className="MyLiked-text-wrapper-7">{formatDate(boardDate)}</div>
      </div>
    </div>
  </div>
)

const MyLiked = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()
  const goToMyActivities = (component) => {
    navigate(`/myactivities/${component}`);
  };

  // 게시글 좋아요 순 조회 엔드포인트로 데이터 호출
  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/board/liked', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const formattedData = response.data.map(post => ({
          boardNo: post.boardNo,
          category: post.category.categoryName,
          boardTitle: post.boardTitle,
          boardDate: post.boardDate,
          commentCount: post.commentCount,
          likes: post.likes
        }));
        formattedData.sort((a, b) => new Date(b.boardDate) - new Date(a.boardDate));
        setLikedPosts(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLikedPosts();
  }, []);

  const postsPerPage = 5;
  const totalPages = Math.ceil(likedPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentLikedPosts = likedPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="MyLiked-frame">
      <div className="MyLiked-text-wrapper">나의 활동</div>
      <div className="MyLiked-div">
        <div className="MyLiked-frame-2">
          <div className="MyLiked-div-wrapper" onClick={() => goToMyActivities('myBoard')}>
            <div className="MyLiked-text-wrapper-3">내가 작성한 게시물</div>
          </div>
          <div className="MyLiked-frame-3" onClick={() => goToMyActivities('myComment')}>
            <div className="MyLiked-text-wrapper-3">내가 작성한 댓글</div>
          </div>
          <div className="MyLiked-frame-4">
            <div className="MyLiked-text-wrapper-2">좋아요 누른 게시물</div>
          </div>
        </div>
        <div className="MyLiked-frame-wrapper">
          <div className="MyLiked-frame-5">
            <div className="MyLiked-frame-6">
              <div className="MyLiked-text-wrapper-4">전체 ({likedPosts.length}건)</div>
            </div>
            <div className="MyLiked-frame-7">
              <div className="MyLiked-frame-8">
                {currentLikedPosts.map((post, index) => (
                  <React.Fragment key={index}>
                    <Post {...post} />
                    {index < currentLikedPosts.length - 1 && (
                      <img
                        className="MyLiked-line"
                        alt="Line"
                        src={line_4_icon}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} scrollTop={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyLiked
