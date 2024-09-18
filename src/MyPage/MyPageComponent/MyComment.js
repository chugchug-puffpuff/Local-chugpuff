import React, { useState, useEffect } from 'react'
import './MyComment.css'
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

const Post = ({ boardNo, boardTitle, category, boardDate, commentCount, likes, liked }) => (
  <div className="MyComment-view">
    <div className="MyComment-frame-9">
      <div className="MyComment-frame-10">
        <Link to={`/communitypost/${boardNo}`}>
          <p className="MyComment-p">{boardTitle}</p>
        </Link>
        <div className={category === "정보공유" ? "MyComment-frame-11" : "MyComment-frame-14"}>
          <div className="MyComment-text-wrapper-5">{category}</div>
        </div>
      </div>
      <div className="MyComment-frame-10">
        <div className="MyComment-frame-12">
          <div className="MyComment-frame-13">
            <img
              className="MyComment-img"
              alt="Sms"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/sms@2x.png"
            />
            <div className="MyComment-text-wrapper-6">{commentCount}</div>
          </div>
          <div className="MyComment-frame-13">
            <img
              className={`MyComment-img ${liked ? 'liked' : ''}`}
              alt="Favorite"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/favorite@2x.png"
            />
            <div className="MyComment-text-wrapper-6">{likes}</div>
          </div>
        </div>
        <div className="MyComment-text-wrapper-7">{formatDate(boardDate)}</div>
      </div>
    </div>
  </div>
)

const MyComment = () => {
  const [selectedComment, setSelectedComment] = useState('post');
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // 사용자가 작성한 댓글이 달린 게시글 목록 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const commentResponse = await axios.get('http://localhost:8080/api/comment/user', config);
        const boardNos = [...new Set(commentResponse.data.map(comment => comment.boardNo))];

        const boardPromises = boardNos.map(boardNo => 
          axios.get(`http://localhost:8080/api/board/${boardNo}`, config)
        );

        const boardResponses = await Promise.all(boardPromises);
        const mappingData = boardResponses.map(response => ({
          boardNo: response.data.boardNo,
          boardTitle: response.data.boardTitle,
          category: response.data.category.categoryName,
          boardDate: response.data.boardDate,
          commentCount: response.data.commentCount,
          likes: response.data.likes
        }));

        setPosts(mappingData);
      } catch (error) {
        console.error('Error fetching data', error);
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
    fetchComments();
    fetchLikedPosts();
  }, []);

  // 탭 이동
  const navigate = useNavigate()
  const goToMyActivities = (component) => {
    navigate(`/myactivities/${component}`);
  };

  const handleCommentClick = (type) => {
    setSelectedComment(type);
  };

  const postsPerPage = 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const sortedPosts = [...posts].sort((a, b) => new Date(b.boardDate) - new Date(a.boardDate));
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="MyComment-frame">
      <div className="MyComment-text-wrapper">나의 활동</div>
      <div className="MyComment-div">
        <div className="MyComment-frame-2">
          <div className="MyComment-div-wrapper" onClick={() => goToMyActivities('myBoard')}>
            <div className="MyComment-text-wrapper-3">내가 작성한 게시물</div>
          </div>
          <div className="MyComment-frame-3">
            <div className="MyComment-text-wrapper-2">내가 작성한 댓글</div>
          </div>
          <div className="MyComment-frame-4" onClick={() => goToMyActivities('myLiked')}>
            <div className="MyComment-text-wrapper-3">좋아요 누른 게시물</div>
          </div>
        </div>
        <div className="MyComment-frame-wrapper">
          <div className="MyComment-frame-5">
            <div className="MyComment-frame-6">
              <div
                className={`${selectedComment === 'post' ? 'selected-comments' : 'MyComment-text-wrapper-4'}`}
                onClick={() => handleCommentClick('post')}
              >
                게시글 댓글 ({posts.length}건)
              </div>
              <div
                className={`${selectedComment === 'job' ? 'selected-comments' : 'MyComment-text-wrapper-4'}`}
                onClick={() => handleCommentClick('job')}
              >
                취업공고 댓글 (2건)
              </div>
            </div>
            <div className="MyComment-frame-7">
              <div className="MyComment-frame-8">
                {currentPosts.map((post, index) => (
                  <React.Fragment key={index}>
                    <Post {...post} liked={likedPosts.includes(post.boardNo)} />
                    {index < currentPosts.length - 1 && (
                      <img
                        className="MyComment-line"
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

export default MyComment