import React, { useState, useEffect } from 'react'
import './MyComment.css'
import { useNavigate} from 'react-router-dom'
import MyCommentBoard from './MyCommentComponent/MyCommentBoard.js';
import MyCommentJob from './MyCommentComponent/MyCommentJob.js';
import axios from 'axios';

const MyComment = () => {
  const [selectedComment, setSelectedComment] = useState('post');
  const [postCount, setPostCount] = useState(0); // MyCommentBoard.js에서 받아온 게시글 댓글 개수
  const [jobCount, setJobCount] = useState(0);

  // 탭 이동
  const navigate = useNavigate()
  const goToMyActivities = (component) => {
    navigate(`/myactivities/${component}`);
  };

  const handleCommentClick = (type) => {
    setSelectedComment(type);
  };
  // 취업공고 댓글 개수 받아오기
  useEffect(() => {
    const fetchJobComments = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const commentResponse = await axios.get('http://localhost:8080/api/job-postings/comments/user', config);
        const jobIds = [...new Set(commentResponse.data.map(comment => comment.jobId))];

        const jobPromises = jobIds.map(jobId => 
          axios.get(`http://localhost:8080/api/job-postings/${jobId}`, config)
        );
        
        const jobResponses = await Promise.all(jobPromises);
        const mappingData = jobResponses.filter(response => response.data.jobs.job.length > 0) // 마감되거나 삭제된 공고는 제외

        setJobCount(mappingData.length);
      } catch (error) {
        console.error('Error fetching job comments', error);
      }
    };

    fetchJobComments();
  }, []);

  return (
    <div className="MyComment-frame">
      <div className="MyComment-text-wrapper">나의 활동</div>
      <div className="MyComment-div">
        <div className="MyComment-frame-2">
          <div className="MyComment-div-wrapper" onClick={() => goToMyActivities('myBoard')}>
            <div className="MyComment-text-wrapper-3">내가 작성한 게시물</div>
          </div>
          <div className="MyComment-frame-3">
            <div className="MyComment-text-wrapper-2">내가 작성한 댓글</div>
          </div>
          <div className="MyComment-frame-4" onClick={() => goToMyActivities('myLiked')}>
            <div className="MyComment-text-wrapper-3">좋아요 누른 게시물</div>
          </div>
        </div>
        <div className="MyComment-frame-wrapper">
          <div className="MyComment-frame-5">
            <div className="MyComment-frame-6">
              <div
                className={`${selectedComment === 'post' ? 'selected-comments' : 'MyComment-text-wrapper-4'}`}
                onClick={() => handleCommentClick('post')}
              >
                게시글 댓글 ({postCount}건)
              </div>
              <div
                className={`${selectedComment === 'job' ? 'selected-comments' : 'MyComment-text-wrapper-4'}`}
                onClick={() => handleCommentClick('job')}
              >
                취업공고 댓글 ({jobCount}건)
              </div>
            </div>
            {selectedComment === 'post' ? (
              <MyCommentBoard setPostCount={setPostCount} />
            ) : (
              <MyCommentJob />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyComment