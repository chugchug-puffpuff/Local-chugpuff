import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CommunityPost.css";
import NavBar from "../MainPage/MainComponent/NavBar.js";
import Board from "./CommunityComponent/Board.js";
import BoardComment from "./CommunityComponent/BoardComment.js";
import { useNavigate } from "react-router-dom";

const CommunityPost = ({ authenticate, setAuthenticate }) => {
  const navigate = useNavigate();
  const { boardNo } = useParams();
  const [post, setPost] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // 특정 게시물을 조회 하는 엔드포인트
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/board/${boardNo}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
    // 현재 로그인한 사용자의 이름을 가져오는 엔드포인트
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');

        const response = await fetch(`http://localhost:8080/api/members/username/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        console.error('Failed to fetch user name:', error);
      }
    };

    fetchPost();
    fetchUserName();
  }, [boardNo]);

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
              <BoardComment />
            </div>
            <div className="CommunityPost-frame-19" onClick={() => navigate('/community')}>
              <img
                className="CommunityPost-format-list-bulleted"
                alt="Format list bulleted"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c247830accd7d866283e/img/format-list-bulleted@2x.png"
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