import React, { useEffect, useState } from 'react';
import './AllPost.css';
import postData from '../../TestData/postData.json';

const PostList = ({ title, category, date, comments, favorites }) => (
  <div>
    <div className="AllPost-view-2">
      <div className="AllPost-frame-24">
        <div className="AllPost-frame-8">
          <p className="AllPost-text-wrapper-9">{title}</p>
          <div className={`AllPost-frame-${category === "정보 공유" ? "25" : "26"}`}>
            <div className="AllPost-text-wrapper-3">{category}</div>
          </div>
        </div>
        <div className="AllPost-frame-8">
          <div className="AllPost-frame-9">
            <div className="AllPost-frame-10">
              <img
                className="AllPost-img"
                alt="Sms"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/sms@2x.png"
              />
              <div className="AllPost-text-wrapper-10">{comments}</div>
            </div>
            <div className="AllPost-frame-10">
              <img
                className="AllPost-img"
                alt="Favorite"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6688fccfcda281749136af44/img/favorite@2x.png"
              />
              <div className="AllPost-text-wrapper-10">{favorites}</div>
            </div>
          </div>
          <div className="AllPost-text-wrapper-11">{date}</div>
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

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortToggle, setSortToggle] = useState(false);
  const [sortType, setSortType] = useState('최신순');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const postsPerPage = 8;

  useEffect(() => {
    const sortedPosts = [...postData].sort((a, b) => new Date(b.date) - new Date(a.date));
    setPosts(sortedPosts);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 600,
      behavior: 'smooth'
    });
  };

  const sortToggleShow = () => {
    setSortToggle(!sortToggle);
  };

  const sortPosts = (type) => {
    setSortType(type);
    setSortToggle(false);
    if (type === '인기순') {
      setPosts([...posts].sort((a, b) => b.favorites - a.favorites));
    }
    if (type === '댓글순') {
      setPosts([...posts].sort((a, b) => b.comments - a.comments));
    }
    if (type === '최신순') {
      setPosts([...posts].sort((a, b) => new Date(b.date) - new Date(a.date)));
    }
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 페이지를 1로 초기화
    let filteredPosts;
    if (category === '전체') {
      filteredPosts = postData;
    } else {
      filteredPosts = postData.filter(post => post.category === category);
    }
    // 현재 정렬 타입에 따라 정렬
    if (sortType === '최신순') {
      filteredPosts = filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortType === '인기순') {
      filteredPosts = filteredPosts.sort((a, b) => b.favorites - a.favorites);
    } else if (sortType === '댓글순') {
      filteredPosts = filteredPosts.sort((a, b) => b.comments - a.comments);
    }
    setPosts(filteredPosts);
  };

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
            className={`AllPost-frame-15 ${selectedCategory === '정보 공유' ? 'frame-selected' : 'frame-notSelected'}`}
            onClick={() => filterByCategory('정보 공유')}
          >
            <div className={`AllPost-text-wrapper-6 ${selectedCategory === '정보 공유' ? 'selected' : 'notSelected'}`}>정보 공유</div>
          </div>
          <div
            className={`AllPost-frame-16 ${selectedCategory === '취업 고민' ? 'frame-selected' : 'frame-notSelected'}`}
            onClick={() => filterByCategory('취업 고민')}
          >
            <div className={`AllPost-text-wrapper-6 ${selectedCategory === '취업 고민' ? 'selected' : 'notSelected'}`}>취업 고민</div>
          </div>
        </div>
        <div className="AllPost-frame-wrapper" style={{ height: `${frameWrapperHeight}px` }}>
          <div className="AllPost-frame-17">
            <div className="AllPost-frame-18">
              <div className="AllPost-header">
                <div className="AllPost-text-wrapper-8">전체 ({posts.length}건)</div>
                <div className="AllPost-write-button">게시글 작성</div>
              </div>
              <div className="AllPost-frame-19">
                <div className={`AllPost-frame-20 ${sortToggle ? 'active' : ''}`} onClick={sortToggleShow}>
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
                  <div className="AllPost-text-wrapper">제목, 키워드 등</div>
                  <img
                    className="AllPost-img"
                    alt="Search"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c0b3f3875b7815aadd85/img/search@2x.png"
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
                {currentPosts.map((post, index) => (
                  <PostList key={index} {...post} />
                ))}
              </div>
              <div className="AllPost-frame-27">
                {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(number => (
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

export default AllPost