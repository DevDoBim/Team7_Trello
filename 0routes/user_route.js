const express = require('express');
const router = express.Router();
const {Users, sequelize, Transaction} = require('../models'); // Import the Users model

// 사용자 관련 API를 모두 /controllers/01_user_controller.js로 전송
const UsersController = require('../1controllers/user_controller');
const usersController = new UsersController();

// 회원 가입 API
router.post('/signup', async (req, res) => {
  const {email, password, confirm} = req.body;
  const isExistUser = await Users.findOne({where: {email}});

  // user 중복 확인
  if (isExistUser) {
    return res.status(409).json({message: '이미 존재하는 user입니다.'});
  }

  // 비밀번호 일치 확인
  if (password !== confirm) {
    return res.status(409).json({message: '비밀번호가 일치하지 않습니다.'});
  }

  // 비밀번호 형식 검증
  // 최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패
  const passwordRegex =
    /^(?=.*[a-zA-Z0-9])(?!.*[^\x21-\x7E])(?!.*([a-zA-Z0-9])\1{3}).{4,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(409).json({
      message:
        '비밀번호는 최소 4자 이상이어야 하며, 닉네임과 같은 값이 포함될 수 없습니다.',
    });
  }

  const t = await sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
  });

  try {
    const user = await Users.create({email, password}, {transaction: t});

    await t.commit();
  } catch (transactionError) {
    console.error(transactionError);
    await t.rollback();
    return res.status(400).json({errorMessage: '유저 생성에 실패하였습니다.'});
  }

  return res.status(201).json({message: '회원가입이 완료되었습니다.'});
});

// 로그인 API
router.post('/login', async (req, res) => {
  const {nickname, password} = req.body;
  const user = await Users.findOne({where: {nickname}});

  if (!user) {
    return res.status(401).json({message: '존재하지 않는 닉네임입니다.'});
  } else if (user.password !== password) {
    return res.status(401).json({message: '비밀번호가 일치하지 않습니다.'});
  }

  const token = jwt.sign(
    {
      userId: user.userId,
    },
    'customized_secret_key',
  );
  res.cookie('authorization', `Bearer ${token}`);
  return res.status(200).json({message: '로그인 성공'});
});

module.exports = router;
