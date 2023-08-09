const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const userRouter = require('./routes/user_route');
<<<<<<< HEAD
const listRouter = require('./routes/list_route');

app.use(express.json());
app.use(cookieParser());
app.use('/api', [userRouter, listRouter]);
=======
const boardRouter = require('./routes/board_route');

app.use(express.json());
app.use(cookieParser());
app.use('/api', [userRouter, boardRouter]);
>>>>>>> de7902c6a512876f9b98557c48a9d7bbd77e2de3

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});
