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
  const postsPerPage = 8;

  useEffect(() => {
    setPosts(postData);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const frameWrapperHeight = 300 + currentPosts.length * 114; // 예: 각 PostList의 높이를 100px로 가정

  return (
    <div className="AllPost-div-2">
      <div className="AllPost-text-wrapper-2">📄 모든 게시글</div>
      <div className="AllPost-frame-12">
        <div className="AllPost-frame-13">
          <div className="AllPost-frame-14">
            <div className="AllPost-text-wrapper-6">전체</div>
          </div>
          <div className="AllPost-frame-15">
            <div className="AllPost-text-wrapper-7">정보 공유</div>
          </div>
          <div className="AllPost-frame-16">
            <div className="AllPost-text-wrapper-7">취업 고민</div>
          </div>
        </div>
        <div className="AllPost-frame-wrapper" style={{ height: `${frameWrapperHeight}px` }}>
          <div className="AllPost-frame-17">
            <div className="AllPost-frame-18">
              <div className="AllPost-text-wrapper-8">전체 ({posts.length}건)</div>
              <div className="AllPost-frame-19">
                <div className="AllPost-frame-20">
                  <div className="AllPost-text-wrapper">인기순</div>
                  <img
                    className="AllPost-img"
                    alt="Keyboard arrow down"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/keyboard-arrow-down@2x.png"
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