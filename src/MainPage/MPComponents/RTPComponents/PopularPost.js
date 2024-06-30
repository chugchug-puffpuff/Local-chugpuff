import React from 'react';
import './PopularPost.css';

const PopularPost = ({ category, comments, favorites, date, title }) => {
    const getCategoryClass = () => {
    if (category === '정보 공유') return 'infoShare';
    if (category === '취업 고민') return 'jobDiscussion';
    return '';
  };

  return (
    <div className="frame-3">
      <div className="frame-4">
        <div className={`div-wrapper ${getCategoryClass()}`}>
          <div className="text-wrapper-2">{category}</div>
        </div>
        <div className="frame-5">
          <div className="frame-6">
            <div className="frame-7">
              <img
                className="img"
                alt="Sms"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/666f93a3d0304f0ceff1aa35/img/sms@2x.png"
              />
              <div className="text-wrapper-3">{comments}</div>
            </div>
            <div className="frame-7">
              <img
                className="img"
                alt="Favorite"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/666f93a3d0304f0ceff1aa35/img/favorite@2x.png"
              />
              <div className="text-wrapper-3">{favorites}</div>
            </div>
          </div>
          <div className="text-wrapper-4">{date}</div>
        </div>
      </div>
      <p className="text-wrapper-5">{title}</p>
    </div>
  );
};

export default PopularPost;