import React from 'react';
import './PopularPost.css';

const PopularPost = ({ category, comments, favorites, date, title }) => {
    const getCategoryClass = () => {
    if (category === '정보 공유') return 'infoShare';
    if (category === '취업 고민') return 'jobDiscussion';
    return '';
  };

  return (
    <div className="PopularPost-frame">
      <div className="PopularPost-frame-2">
        <div className={`PopularPost-div-wrapper ${getCategoryClass()}`}>
          <div className="PopularPost-text-wrapper">{category}</div>
        </div>
        <div className="PopularPost-frame-3">
          <div className="PopularPost-frame-4">
            <div className="PopularPost-frame-5">
              <img
                className="PopularPost-img"
                alt="Sms"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/666f93a3d0304f0ceff1aa35/img/sms@2x.png"
              />
              <div className="PopularPost-text-wrapper-2">{comments}</div>
            </div>
            <div className="PopularPost-frame-5">
              <img
                className="PopularPost-img"
                alt="Favorite"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/666f93a3d0304f0ceff1aa35/img/favorite@2x.png"
              />
              <div className="PopularPost-text-wrapper-2">{favorites}</div>
            </div>
          </div>
          <div className="PopularPost-text-wrapper-3">{date}</div>
        </div>
      </div>
      <p className="PopularPost-text-wrapper-4">{title}</p>
    </div>
  );
};

export default PopularPost;