import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RTPosts.css';
import PopularPostMain from './RTPComponents/PopularPostMain';
import axios from 'axios';

const RTPosts = ({ authenticate }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  // 게시글 좋아요 순 조회 엔드포인트로 데이터 호출
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/board/likes');
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
      if (authenticate) { // 좋아요 클릭 여부는 사용자가 로그인 했을 때만 활성화 되도록
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
      }
    };

    fetchPosts();
    fetchLikedPosts();
  }, [authenticate]);

  return (
    <div>
      <div className="RTPosts-frame">
        <div className="RTPosts-text-wrapper">실시간 인기글</div>
        <div className="RTPosts-div" onClick={() => navigate('/community')}>더보기</div>
      </div>
      <div className="RTPosts-frame-2">
        {posts
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 7)
          .map((post, index) => (
            <React.Fragment key={index}>
              <PopularPostMain {...post} liked={likedPosts.includes(post.boardNo)} authenticate={authenticate}/>
            </React.Fragment>
          ))}
      </div>
    </div>
  )
}

export default RTPosts;