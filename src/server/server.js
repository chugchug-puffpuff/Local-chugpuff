const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});