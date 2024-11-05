import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./PopularPost.css";
import favorite_icon from '../../Icon/favorite.png'

// 날짜 형식을 0000-00-00 00:00:00으로 변환
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const datePart = date.toISOString().split('T')[0];
  const timePart = date.toTimeString().split(' ')[0];

  return `${datePart} ${timePart}`;
};

// 개별 게시물
const PostList = ({ boardNo, category, boardTitle, boardDate, commentCount, likes, liked }) => (
  <div className="PopularPost-view">
    <div className={`PopularPost-frame-${category === "정보공유" ? "6" : "11"}`}>
      <div className="PopularPost-text-wrapper-3">{category}</div>
    </div>
    <div className="PopularPost-frame-7">
      <div className="PopularPost-frame-8">
        <Link to={`/communitypost/${boardNo}`}>
          <p className="PopularPost-p">{boardTitle}</p>
        </Link>
        <div className="PopularPost-text-wrapper-4">{formatDate(boardDate)}</div>
      </div>
      <div className="PopularPost-frame-9">
        <div className="PopularPost-frame-10">
          <img
            className="PopularPost-img-2"
            alt="Sms"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c0b3f3875b7815aadd85/img/sms@2x.png"
          />
          <div className="PopularPost-text-wrapper-5">{commentCount}</div>
        </div>
        <div className="PopularPost-frame-10">
          <img
            className={`PopularPost-img-2 ${liked ? 'liked' : ''}`}
            alt="Favorite"
            src={favorite_icon}
          />
          <div className="PopularPost-text-wrapper-5">{likes}</div>
        </div>
      </div>
    </div>
  </div>
);

// 메인 랜더링
const PopularPost = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  // 게시글 좋아요 순 조회 엔드포인트로 데이터 호출
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/board/likes', {
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
        setPosts(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/board/liked', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setLikedPosts(response.data.map(post => post.boardNo));
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      }
    };

    fetchPosts();
    fetchLikedPosts();
  }, []);

  return (
    <div className="PopularPost-div-2">
      <div className="PopularPost-text-wrapper-2">🔥 실시간 인기글</div>
      <div className="PopularPost-frame-5">
        {posts
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 6)
          .map((post, index) => (
            <React.Fragment key={index}>
              <PostList {...post} liked={likedPosts.includes(post.boardNo)} />
              {index < 5 && (
                <img
                  className="PopularPost-line"
                  alt="Line"
                  src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c0b3f3875b7815aadd85/img/line-4.png"
                />
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default PopularPost;