import React from 'react';
import './EditingComponent.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const EditingComponent = ({ details, es_feedback }) => {

  const formattedText = es_feedback
    .replace(/\n\n/g, '\n\n&nbsp;\n\n')
    .replace(/피드백:/g, '피드백')
    .replace(/자기소개서:/g, '자기소개서')
    .replace(/맞춤법 및 문법:/g, '<span class="bold">맞춤법 및 문법:</span>')
    .replace(/대체 단어 추천:/g, '<span class="bold">대체 단어 추천:</span>')
    .replace(/질문 의도와 답변 방향성:/g, '<span class="bold">질문 의도와 답변 방향성:</span>')
    .replace(/(질문\d+:)/g, '<span class="bold">$1</span>')
    .replace(/(답변\d+:)/g, '<span class="bold">$1</span>')
    .replace(/(질문 \d+:)/g, '<span class="bold">$1</span>')
    .replace(/(답변 \d+:)/g, '<span class="bold">$1</span>');

  return (
    <div className="EditingComponent-frame-12">
      <div className="EditingComponent-frame-wrapper">
        <div className="EditingComponent-frame-13">
          <div className="EditingComponent-frame-14">
            {details && details.map((detail, index) => (
              <div key={index} className="EditingComponent-frame-15">
                <div className="EditingComponent-text-wrapper-7">자기소개서 문항 {index + 1}</div>
                <p className="EditingComponent-text-wrapper-8">{detail.eS_question}</p>
                <div className="EditingComponent-text-wrapper-7">답변 {index + 1}</div>
                <p className="EditingComponent-text-wrapper-8">{detail.eS_answer}</p>
              </div>
            ))}
            <img
              className="EditingComponent-img"
              alt="Line"
              src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/6698aa612be89236643e00e3/img/line-2.png"
            />
            <div className="EditingComponent-frame-15">
              <div className="EditingComponent-text-wrapper-7">피드백</div>
                <ReactMarkdown
                  className="HistoryComponent-text-wrapper-8"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {formattedText}
                </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditingComponent;
