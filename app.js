const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const userRouter = require('./0routes/user_route');
const listRouter = require('./0routes/list_route');
const boardRouter = require('./0routes/board_route');

app.use(express.json());
app.use(cookieParser());
app.use('/api', [userRouter, boardRouter, listRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});
