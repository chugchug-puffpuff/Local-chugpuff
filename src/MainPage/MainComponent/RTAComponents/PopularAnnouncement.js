import React, { useState, useEffect } from 'react';
import './PopularAnnouncement.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PopularAnnouncement = ({ authenticate, jobId, company, title, expirationDay, scrapCount, scraped }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2d8cf4d8f7eb28bb7ce11/img/image-2.png');

  useEffect(() => {
    // 이미지 Url 가져오기
    const fetchImage = async () => {
      try {
        const response = await axios.get(`https://api.bing.microsoft.com/v7.0/images/search?q=${title} 로고`, {
          headers: { 'Ocp-Apim-Subscription-Key': '1e1ba0956772408883e8692f800bb01e' }
        });
        if (response.data.value && response.data.value.length > 0) {
          setImageUrl(response.data.value[0].contentUrl);
        }
      } catch (error) {
        console.error('Error fetching image from Bing API', error);
      }
    };

    fetchImage();
  }, [title]);

  // 로그인하지 않은 상태에서 클릭 시 로그인페이지로 이동
  const handleLinkClick = (e) => {
    if (!authenticate) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <div>
      <Link to={`/recruitinfo/${jobId}`} onClick={handleLinkClick}>
      <img 
        className="PopularAnnouncement-image" 
        alt="기업 이미지" 
        src={imageUrl}
      />
        <div className="PopularAnnouncement-frame">
          <div className="PopularAnnouncement-text-wrapper">{company}</div>
          <div className="PopularAnnouncement-frame-2">
            <div className="PopularAnnouncement-frame-3">
              <p className="PopularAnnouncement-text-wrapper-2">{title}</p>
            </div>
            <div className="PopularAnnouncement-frame-4">
              <div className="PopularAnnouncement-frame-5">
                <div className="PopularAnnouncement-grade-wrapper">
                  <img 
                    className={`PopularAnnouncement-grade ${scraped ? 'scraped' : ''}`} 
                    alt="scrap" 
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66ba069ad632e20f0c1152a0/img/grade@2x.png" />
                </div>
                <div className="PopularAnnouncement-frame-6">
                  <div className="PopularAnnouncement-text-wrapper-3">{scrapCount}</div>
                </div>
              </div>
              <div className="PopularAnnouncement-text-wrapper-4">{expirationDay}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PopularAnnouncement;