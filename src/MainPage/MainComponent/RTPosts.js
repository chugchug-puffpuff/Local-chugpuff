import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RTPosts.css';
import PopularPostMain from './RTPComponents/PopularPostMain';
import postData from '../../TestData/postData.json';

const RTPosts = () => {
  const navigate = useNavigate();
  const [sortedPostData, setSortedPostData] = useState([]);

  useEffect(() => {
    const sortedData = postData.sort((a, b) => b.favorites - a.favorites).slice(0, 7);
    setSortedPostData(sortedData);
  }, []);

  return (
    <div>
      <div className="RTPosts-frame">
        <div className="RTPosts-text-wrapper">실시간 인기글</div>
        <div className="RTPosts-div" onClick={() => navigate('/community')}>더보기</div>
      </div>
      <div className="RTPosts-frame-2">
        {sortedPostData.map((post, index) => (
          <PopularPostMain
            key={index}
            category={post.category}
            date={post.date}
            title={post.title}
            comments={post.comments}
            favorites={post.favorites}
          />
        ))}
      </div>
    </div>
  )
}

export default RTPosts;