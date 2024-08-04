const express = require('express');
const jwt = require('../src/Backend/node_modules/jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('../src/Backend/node_modules/cors/lib');

const app = express();
const port = 4000;

// 미들웨어 설정
app.use(bodyParser.json());
app.use(cors());

// 사용자 데이터 예제 (실제 환경에서는 데이터베이스를 사용)
const users = [
  {
    "name": "아무개",
    "userId": "asdf1111",
    "password": "1234",
    "job": "IT 개발/데이터",
    "jobKeyword": "앱개발"
  },
  {
    "name": "홍길동",
    "userId": "qwer1111",
    "password": "1234",
    "job": "IT 개발/데이터",
    "jobKeyword": "머신러닝"
  },
  {
    "name": "테스트",
    "userId": "abcd1111",
    "password": "1234",
    "job": "IT 개발/데이터",
    "jobKeyword": "와이어샤크"
  }
];

// 모의면접 내역 예제 
const interviewHistory = [
  {
    interviewId: '11111111',
    date: "2024.05.04 23:00:02",
    userName: '테스트',
    selectedType: '형식 없음',
    selectedFeedback: '즉시 피드백',
    interviewHistory: [
      {
        question: '즉시 피드백 회사 문화와 가치관이 자신의 것과 다를 경우 어떻게 대처하시겠습니까?',
        answer: '사용자의 즉시피드백 답변 내용입니다.',
        feedback: '가나다라마바사아자차카타파하'
      },
      {
        question: '11즉시피드백 회사 문화와 가치관이 자신의 것과 다를 경우 어떻게 대처하시겠습니까?',
        answer: '11사용자의 즉시피드백 답변 내용입니다.',
        feedback: '갸냐댜랴먀뱌샤야쟈챠캬탸퍄햐'
      }
    ],
    currentQuestionIndex: 2
  },
  {
    interviewId: '22222222',
    date: "2024.05.04 23:00:05",
    userName: '테스트',
    selectedType: '형식 없음',
    selectedFeedback: '전체 피드백',
    interviewHistory: [
      {
        question: '전체피드백 회사 문화와 가치관이 자신의 것과 다를 경우 어떻게 대처하시겠습니까?',
        answer: '사용자의 전체피드백 답변 내용입니다.'
      },
      {
        question: '11전체피드백 회사 문화와 가치관이 자신의 것과 다를 경우 어떻게 대처하시겠습니까?',
        answer: '11사용자의 즉시피드백 답변 내용입니다.'
      }
    ],
    feedback: '갸냐댜랴먀뱌샤야쟈챠캬탸퍄햐',
    currentQuestionIndex: 2
  }
]

// 로그인 엔드포인트
app.post('/api/login', (req, res) => {
  const { userId, password } = req.body;
  const user = users.find(u => u.userId === userId && u.password === password);

  if (user) {
    const token = jwt.sign({ userId: user.userId }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, name: user.name });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// 인터뷰 내역 제공 엔드포인트
app.get('/api/interviews', (req, res) => {
  res.json(interviewHistory);
});

// 모의면접 내역 저장 엔드포인트 설정
app.post('/api/interviews/save', (req, res) => {
  const interviewDetails = req.body;

  // 수신된 데이터를 콘솔에 출력하여 확인
  console.log('Received interview details:', interviewDetails);

  // 클라이언트에 응답
  res.status(200).send('Interview details received successfully');
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

