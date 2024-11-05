import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CommunityPost.css";
import NavBar from "../MainPage/MainComponent/NavBar.js";
import Board from "./CommunityComponent/Board.js";
import BoardComment from "./CommunityComponent/BoardComment.js";
import { useNavigate } from "react-router-dom";
import format_list_bulleted_icon from '../Icon/format_list_bulleted.png'

const CommunityPost = ({ authenticate, setAuthenticate }) => {
  const navigate = useNavigate();
  const { boardNo } = useParams();
  const [post, setPost] = useState(null);
  const userName = localStorage.getItem('userName');
  const [isLiked, setIsLiked] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      await fetchPost();
      await fetchLikedPosts();
    };
    fetchData();
  }, [boardNo]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/board/${boardNo}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchLikedPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/board/liked', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const likedBoardNos = response.data.map(post => post.boardNo);
      setIsLiked(likedBoardNos.includes(parseInt(boardNo))); // boardNo를 사용하여 현재 게시물이 좋아요 상태인지 확인
    } catch (error) {
      console.error('Error fetching liked posts:', error);
    }
  };

  const handleLikeClick = async () => {
    try {
      await axios.post(`http://localhost:8080/api/board/${boardNo}/like`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      await fetchPost(); // 좋아요 상태 변경 후 게시물 데이터 갱신
      await fetchLikedPosts(); // 좋아요 목록 갱신
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const updateCommentCount = (newCount) => {
    setPost(prevPost => ({
      ...prevPost,
      commentCount: newCount
    }));
  };

  return (
    <div className="CommunityPost">
      <div className="CommunityPost-overlap-group">
        <div className="CommunityPost-frame">
          <div className="CommunityPost-frame-wrapper">
            <div className="CommunityPost-div">
              {post && (
                <Board
                  boardNo={post.boardNo}
                  category={post.category.categoryName}
                  boardTitle={post.boardTitle}
                  boardDate={post.boardDate}
                  memberName={post.memberName}
                  boardContent={post.boardContent}
                  storedUserName={userName}
                />
              )}
              <img
                className="CommunityPost-line"
                alt="Line"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/line-17.png"
              />
              <div className="CommunityPost-frame-7">
                <div className="CommunityPost-frame-8">
                  <div className="CommunityPost-frame-9">
                    <img
                      className={`CommunityPost-like ${isLiked ? 'liked' : ''}`}
                      alt="Favorite"
                      src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/favorite@2x.png"
                      onClick={handleLikeClick}
                    />
                    <div className="CommunityPost-text-wrapper-5">좋아요</div>
                    <div className="CommunityPost-text-wrapper-6">{post ? post.likes : 0}</div>
                  </div>
                </div>
                <div className="CommunityPost-frame-9">
                  <img
                    className="CommunityPost-comment"
                    alt="Sms"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/sms@2x.png"
                  />
                  <div className="CommunityPost-text-wrapper-5">댓글</div>
                  <div className="CommunityPost-text-wrapper-6">{post ? post.commentCount : 0}</div>
                </div>
              </div>
              {post && (
                <BoardComment
                  boardNo={post.boardNo}
                  comments={post.commentContents}
                  storedUserName={userName}
                  updateCommentCount={updateCommentCount}
                />
              )}
            </div>
            <div 
              className="CommunityPost-frame-19"onClick={() => navigate('/community')}>
              <img
                className="CommunityPost-format-list-bulleted"
                alt="Format list bulleted"
                src={format_list_bulleted_icon}
              />
              <div className="CommunityPost-text-wrapper-13">목록 보기</div>
            </div>
          </div>
        </div>
      </div>
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} />
    </div>
  );
};

export default CommunityPost;