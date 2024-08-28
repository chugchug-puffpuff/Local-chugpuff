// 커뮤니티 메인 - 모든 게시글
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AllPost.css';

// 날짜 형식을 0000-00-00 00:00:00으로 변환
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const datePart = date.toISOString().split('T')[0];
  const timePart = date.toTimeString().split(' ')[0];

  return `${datePart} ${timePart}`;
};

// 개별 게시물
const PostList = ({ boardNo, boardTitle, category, boardDate, commentCount, likes}) => (
  <div>
    <div className="AllPost-view-2">
      <div className="AllPost-frame-24">
        <div className="AllPost-frame-8">
          <Link to={`/communitypost/${boardNo}`}>
            <p className="AllPost-text-wrapper-9">{boardTitle}</p>
          </Link>
          <div className={`AllPost-frame-${category === "정보공유" ? "25" : "26"}`}>
            <div className="AllPost-text-wrapper-3">{category}</div>
          </div>
        </div>
        <div className="AllPost-frame-8">
          <div className="AllPost-frame-9">
            <div className="AllPost-frame-10">
              <img
                className="AllPost-comment"
                alt="Sms"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/sms@2x.png"
              />
              <div className="AllPost-text-wrapper-10">{commentCount}</div>
            </div>
            <div className="AllPost-frame-10">
              <img
                className="AllPost-like"
                alt="Favorite"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/favorite@2x.png"
              />
              <div className="AllPost-text-wrapper-10">{likes}</div>
            </div>
          </div>
          <div className="AllPost-text-wrapper-11">{formatDate(boardDate)}</div>
        </div>
      </div>
    </div>
    <img
      className="AllPost-line"
      alt="Line"
      src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c0b3f3875b7815aadd85/img/line-4-1.png"
    />
  </div>
);

// 메인 랜더링
const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortToggle, setSortToggle] = useState(false);
  const [sortType, setSortType] = useState('최신순');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [noResults, setNoResults] = useState(false);
  const postsPerPage = 8;
  const navigate = useNavigate();

  // 전체 게시글 조회 엔드포인트로 데이터 호출
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/board', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const formattedData = response.data.map(post => ({ // 호출한 데이터 매핑
          boardNo: post.boardNo,
          boardTitle: post.boardTitle,
          category: post.category.categoryName,
          boardDate: post.boardDate,
          commentCount: post.commentCount,
          likes: post.likes
        }));
        // 처음 랜더링 될때 최신순으로 정렬
        const sortedData = formattedData.sort((a, b) => new Date(b.boardDate) - new Date(a.boardDate));
        setPosts(sortedData);
        setFilteredPosts(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);

  // 검색 기능 엔드포인트
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/board/search?keyword=${searchKeyword}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const formattedData = response.data.map(post => ({
        boardTitle: post.boardTitle,
        category: post.category.categoryName,
        boardDate: post.boardDate,
        commentCount: post.commentCount,
        likes: post.likes
      }));
      // 검색하면 처음에는 최신순으로 정렬
      const sortedData = formattedData.sort((a, b) => new Date(b.boardDate) - new Date(a.boardDate));
      setFilteredPosts(sortedData);
      setCurrentPage(1); // 검색 후 첫 페이지로 초기화
      setNoResults(formattedData.length === 0); // 검색 결과 없음 상태 업데이트
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ // 페이지 이동시 스크롤 이동
      top: 600,
      behavior: 'smooth'
    });
  };

  const sortToggleShow = () => {
    setSortToggle(!sortToggle);
  };

  // 정렬 타입에 따라 정렬
  const sortPosts = (type) => {
    setSortType(type);
    setSortToggle(false);
    let sortedPosts = [...filteredPosts];
    if (type === '인기순') {
      sortedPosts = sortedPosts.sort((a, b) => b.likes - a.likes);
    }
    if (type === '댓글순') {
      sortedPosts = sortedPosts.sort((a, b) => b.commentCount - a.commentCount);
    }
    if (type === '최신순') {
      sortedPosts = sortedPosts.sort((a, b) => new Date(b.boardDate) - new Date(a.boardDate));
    }
    setFilteredPosts(sortedPosts);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 페이지 이동 후 탭 이동 시 첫 페이지로 초기화
    let filtered;
    if (category === '전체') {
      filtered = posts;
    } else {
      filtered = posts.filter(post => post.category === category);
    }
    // 현재 정렬 타입에 따라 정렬
    if (sortType === '최신순') {
      filtered = filtered.sort((a, b) => new Date(b.boardDate) - new Date(a.boardDate));
    } else if (sortType === '인기순') {
      filtered = filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortType === '댓글순') {
      filtered = filtered.sort((a, b) => b.commentCount - a.commentCount);
    }
    setFilteredPosts(filtered);
  };

  // 모든 게시글 프레임 높이 계산(게시글 목록 수에 따라 동적으로 변화)
  const frameWrapperHeight = 300 + currentPosts.length * 114 + (sortToggle ? 123 : 0);

  return (
    <div className="AllPost-div-2">
      <div className="AllPost-text-wrapper-2">📄 모든 게시글</div>
      <div className="AllPost-frame-12">
        <div className="AllPost-frame-13">
          <div
            className={`AllPost-frame-14 ${selectedCategory === '전체' ? 'frame-selected' : 'frame-notSelected'}`}
            onClick={() => filterByCategory('전체')}
          >
            <div className={`AllPost-text-wrapper-6 ${selectedCategory === '전체' ? 'selected' : 'notSelected'}`}>전체</div>
          </div>
          <div
            className={`AllPost-frame-15 ${selectedCategory === '정보공유' ? 'frame-selected' : 'frame-notSelected'}`}
            onClick={() => filterByCategory('정보공유')}
          >
            <div className={`AllPost-text-wrapper-6 ${selectedCategory === '정보공유' ? 'selected' : 'notSelected'}`}>정보공유</div>
          </div>
          <div
            className={`AllPost-frame-16 ${selectedCategory === '취업고민' ? 'frame-selected' : 'frame-notSelected'}`}
            onClick={() => filterByCategory('취업고민')}
          >
            <div className={`AllPost-text-wrapper-6 ${selectedCategory === '취업고민' ? 'selected' : 'notSelected'}`}>취업고민</div>
          </div>
        </div>
        <div className="AllPost-frame-wrapper" style={{ height: `${frameWrapperHeight}px` }}>
          <div className="AllPost-frame-17">
            <div className="AllPost-frame-18">
              <div className="AllPost-header">
                <div className="AllPost-text-wrapper-8">전체 ({filteredPosts.length}건)</div>
                <div className="AllPost-write-button" onClick={() => navigate('/postregister')}>게시글 작성</div>
              </div>
              <div className="AllPost-frame-19">
                <div className={`AllPost-frame-20 ${sortToggle ? 'active' : ''}`} onClick={sortToggleShow} style={{ height: '43px' }}>
                  <div className="AllPost-text-wrapper">{sortType}</div>
                  <img
                    className="AllPost-img"
                    alt="Keyboard arrow down & up"
                    src={sortToggle 
                      ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-up@2x.png" 
                      : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-down@2x.png"}
                  />
                </div>
                <div className="AllPost-frame-21">
                  <input
                    type="text"
                    className="AllPost-text-wrapper search-input"
                    placeholder="제목, 키워드 등"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                  <img
                    className="AllPost-img"
                    alt="Search"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c0b3f3875b7815aadd85/img/search@2x.png"
                    style={{ filter: 'grayscale(1) brightness(0.2)' }}
                    onClick={handleSearch}
                  />
                </div>
              </div>
              {sortToggle && (
                <div className="AllPost-frame-2">
                  {sortType !== '최신순' && (
                    <div className="AllPost-frame-3" onClick={() => sortPosts('최신순')}>
                      <div className="AllPost-text-wrapper">최신순</div>
                    </div>
                  )}
                  {sortType !== '인기순' && (
                    <div className="AllPost-frame-3" onClick={() => sortPosts('인기순')}>
                      <div className="AllPost-text-wrapper">인기순</div>
                    </div>
                  )}
                  {sortType !== '댓글순' && (
                    <div className="AllPost-frame-3" onClick={() => sortPosts('댓글순')}>
                      <div className="AllPost-text-wrapper">댓글순</div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="AllPost-frame-22">
              <div className="AllPost-frame-23">
              {noResults ? (
                <div className="AllPost-no-results">검색결과가 없습니다.</div>
              ) : (
                currentPosts.map((post, index) => (
                  <PostList key={index} {...post} />
                ))
              )}
              </div>
              <div className="AllPost-frame-27">
                {[...Array(Math.ceil(filteredPosts.length / postsPerPage)).keys()].map(number => (
                  <div
                    key={number + 1}
                    className={`AllPost-frame-28 ${currentPage === number + 1 ? 'active' : ''}`}
                    onClick={() => paginate(number + 1)}
                  >
                    <div className="AllPost-text-wrapper-12">{number + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllPost;