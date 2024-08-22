import React from 'react';
import './PopularPostMain.css';

const PopularPostMain = ({ category, comments, favorites, date, title }) => {
    const getCategoryClass = () => {
    if (category === '정보 공유') return 'infoShare';
    if (category === '취업 고민') return 'jobDiscussion';
    return '';
  };

  return (
    <div className="PopularPostMain-frame">
      <div className="PopularPostMain-frame-2">
        <div className={`PopularPostMain-div-wrapper ${getCategoryClass()}`}>
          <div className="PopularPostMain-text-wrapper">{category}</div>
        </div>
        <div className="PopularPostMain-frame-3">
          <div className="PopularPostMain-frame-4">
            <div className="PopularPostMain-frame-5">
              <img
                className="PopularPostMain-img"
                alt="댓글 아이콘"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/666f93a3d0304f0ceff1aa35/img/sms@2x.png"
              />
              <div className="PopularPostMain-text-wrapper-2">{comments}</div>
            </div>
            <div className="PopularPostMain-frame-5">
              <img
                className="PopularPostMain-img"
                alt="좋아요 아이콘"
                src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/666f93a3d0304f0ceff1aa35/img/favorite@2x.png"
              />
              <div className="PopularPostMain-text-wrapper-2">{favorites}</div>
            </div>
          </div>
          <div className="PopularPostMain-text-wrapper-3">{date}</div>
        </div>
      </div>
      <p className="PopularPostMain-text-wrapper-4">{title}</p>
    </div>
  );
};

export default PopularPostMain;