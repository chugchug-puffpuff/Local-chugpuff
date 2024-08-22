import React, { useState, useEffect } from 'react'
import "./PopularPost.css";
import postData from '../../TestData/postData.json';

const PostList = ({ category, title, date, comments, favorites }) => (
  <div className="PopularPost-view">
    <div className={`PopularPost-frame-${category === "정보 공유" ? "6" : "11"}`}>
      <div className="PopularPost-text-wrapper-3">{category}</div>
    </div>
    <div className="PopularPost-frame-7">
      <div className="PopularPost-frame-8">
        <p className="PopularPost-p">{title}</p>
        <div className="PopularPost-text-wrapper-4">{date}</div>
      </div>
      <div className="PopularPost-frame-9">
        <div className="PopularPost-frame-10">
          <img
            className="PopularPost-img-2"
            alt="Sms"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c0b3f3875b7815aadd85/img/sms@2x.png"
          />
          <div className="PopularPost-text-wrapper-5">{comments}</div>
        </div>
        <div className="PopularPost-frame-10">
          <img
            className="PopularPost-img-2"
            alt="Favorite"
            src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2c0b3f3875b7815aadd85/img/favorite@2x.png"
          />
          <div className="PopularPost-text-wrapper-5">{favorites}</div>
        </div>
      </div>
    </div>
  </div>
);

const PopularPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postData);
  }, []);

  return (
    <div className="PopularPost-div-2">
      <div className="PopularPost-text-wrapper-2">🔥 실시간 인기글</div>
      <div className="PopularPost-frame-5">
        {posts
          .sort((a, b) => b.favorites - a.favorites)
          .slice(0, 6)
          .map((post, index) => (
            <React.Fragment key={index}>
              <PostList {...post} />
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
  )
}

export default PopularPost