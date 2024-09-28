import React, { useState, useEffect } from 'react'
import './InfoSquare.css'
import axios from 'axios';

const InfoSquare = ({ jobInfo }) => {
  const [imageUrl, setImageUrl] = useState('https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2d8cf4d8f7eb28bb7ce11/img/image-2.png');

  useEffect(() => {
    if (jobInfo && jobInfo.length > 0) {
      const job = jobInfo[0];
      const fetchImage = async () => {
        try {
          const response = await axios.get(`https://api.bing.microsoft.com/v7.0/images/search?q=${job.title} 로고`, {
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
    }
  }, [jobInfo]);

  if (!jobInfo || jobInfo.length === 0) {
    return <div>Loading...</div>;
  }

  const job = jobInfo[0];

  return (
    <div className="InfoSquare-frame-11" onClick={() => window.open(job.infoUrl, '_blank')}>
      <img
        className="InfoSquare-image"
        alt="기업 이미지 로고"
        src={imageUrl}
      />
      <div className="InfoSquare-frame-5">
        <div className="InfoSquare-text-wrapper-6">기업정보</div>
        <div className="InfoSquare-frame-12">
          <div className="InfoSquare-frame-5">
            <div className="InfoSquare-text-wrapper-7">{job.company}</div>
            <p className="InfoSquare-text-wrapper-8">{job.location.replace(/&gt;/g, '').split(',')[0]}</p>
          </div>
          <div className="InfoSquare-frame-13">
            <div className="InfoSquare-frame-14">
              <div className="InfoSquare-text-wrapper-9">산업</div>
              <div className="InfoSquare-text-wrapper-11">{job.industry}</div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default InfoSquare