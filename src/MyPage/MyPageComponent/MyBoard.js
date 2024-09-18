import React, { useState, useEffect } from 'react'
import './MyBoard.css'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import Pagination from '../../Route/Pagination.js';

// 날짜 형식을 0000-00-00 00:00:00으로 변환
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const datePart = date.toISOString().split('T')[0];
  const timePart = date.toTimeString().split(' ')[0];

  return `${datePart} ${timePart}`;
};

// 개별 게시물
const Board = ({ boardNo, boardTitle, category, boardDate, commentCount, likes, liked}) => (
  <div className="MyBoard-view">
    <div className="MyBoard-frame-9">
      <div className="MyBoard-frame-10">
        <Link to={`/communitypost/${boardNo}`}>
          <p className="MyBoard-p">{boardTitle}</p>
        </Link>
        <div className={category === "정보공유" ? "MyBoard-frame-11" : "MyBoard-frame-14"}>
          <div className="MyBoard-text-wrapper-5">{category}</div>
        </div>
      </div>
      <div className="MyBoard-frame-10">
        <div className="MyBoard-frame-12">
          <div className="MyBoard-frame-13">
            <img
              className="MyBoard-img"
              alt="Sms"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/sms@2x.png"
            />
            <div className="MyBoard-text-wrapper-6">{commentCount}</div>
          </div>
          <div className="MyBoard-frame-13">
            <img
              className={`MyBoard-img ${liked ? 'liked' : ''}`}
              alt="Favorite"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/favorite@2x.png"
            />
            <div className="MyBoard-text-wrapper-6">{likes}</div>
          </div>
        </div>
        <div className="MyBoard-text-wrapper-7">{formatDate(boardDate)}</div>
      </div>
    </div>
  </div>
)

const MyBoard = () => {
  const [boards, setBoards] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate()
  const goToMyActivities = (component) => {
    navigate(`/myactivities/${component}`);
  };
  // 사용자가 작성한 게시글 호출
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/board/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const mappingData = response.data.map(board => ({ // 호출한 데이터 매핑
          boardNo: board.boardNo,
          boardTitle: board.boardTitle,
          category: board.category.categoryName,
          boardDate: board.boardDate,
          commentCount: board.commentCount,
          likes: board.likes
        }));
        setBoards(mappingData);
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
    fetchBoards();
    fetchLikedPosts();
  }, []);

  const postsPerPage = 5;
  const totalPages = Math.ceil(boards.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBoards = boards.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="MyBoard-frame">
      <div className="MyBoard-text-wrapper">나의 활동</div>
      <div className="MyBoard-div">
        <div className="MyBoard-frame-2">
          <div className="MyBoard-div-wrapper">
            <div className="MyBoard-text-wrapper-2">내가 작성한 게시물</div>
          </div>
          <div className="MyBoard-frame-3" onClick={() => goToMyActivities('myComment')}>
            <div className="MyBoard-text-wrapper-3">내가 작성한 댓글</div>
          </div>
          <div className="MyBoard-frame-4" onClick={() => goToMyActivities('myLiked')}>
            <div className="MyBoard-text-wrapper-3">좋아요 누른 게시물</div>
          </div>
        </div>
        <div className="MyBoard-frame-wrapper">
          <div className="MyBoard-frame-5">
            <div className="MyBoard-frame-6">
              <div className="MyBoard-text-wrapper-4">전체 ({boards.length}건)</div>
            </div>
            <div className="MyBoard-frame-7">
              <div className="MyBoard-frame-8">
                {currentBoards.map((board, index) => (
                  <React.Fragment key={index}>
                    <Board {...board} liked={likedPosts.includes(board.boardNo)} />
                    {index < currentBoards.length - 1 && (
                      <img
                        className="MyBoard-line"
                        alt="Line"
                        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/line-4.svg"
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

export default MyBoard