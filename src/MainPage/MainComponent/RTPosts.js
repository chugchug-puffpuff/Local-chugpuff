import React from 'react';
import './RTPosts.css';
import PopularPost from './RTPComponents/PopularPost';

const RTPosts = () => {
  return (
    <div>
      <div className="RTPosts-frame">
        <div className="RTPosts-text-wrapper">실시간 인기글</div>
        <div className="RTPosts-div">더보기</div>
      </div>
      <div className="RTPosts-frame-2">
        <PopularPost
          category="정보 공유"
          date="2024.05.07"
          title="이직 결정 전 고려해야 할 사항들 - 현직자 경험담 공유"
          comments="15"
          favorites="15"
        />
        <PopularPost
          category="취업 고민"
          date="2024.05.07"
          title="공정관리와 생산관리 직무 차이"
          comments="15"
          favorites="15"
        />
        <PopularPost
          category="취업 고민"
          date="2024.05.07"
          title="휴학 사유 솔직하게 말해도 될까요?"
          comments="15"
          favorites="15"
        />
        <PopularPost
          category="정보 공유"
          date="2024.05.07"
          title="전자공 전공인데 배터리 반도체는 연관성 없는 사업인가요?"
          comments="15"
          favorites="15"
        />
        <PopularPost
          category="취업 고민"
          date="2024.05.07"
          title="전자공 전공인데 배터리 반도체는 연관성 없는 사업인가요?"
          comments="15"
          favorites="15"
        />
        <PopularPost
          category="취업 고민"
          date="2024.05.07"
          title="전자공 전공인데 배터리 반도체는 연관성 없는 사업인가요?"
          comments="15"
          favorites="15"
        />
        <PopularPost
          category="취업 고민"
          date="2024.05.07"
          title="전자공 전공인데 배터리 반도체는 연관성 없는 사업인가요?"
          comments="15"
          favorites="15"
        />
      </div>
    </div>
  )
}

export default RTPosts;