const express = require('express');
const router = express.Router();

// 사용자 관련 API를 모두 /controllers/01_user_controller.js로 전송
const UsersController = require('../1controllers/user_controller');
const usersController = new UsersController();
const authMiddleware = require('../middlewares/auth-middleware');

// 회원 가입 API
router.post('/signup', usersController.createUser);

// 로그인 API
router.post('/login', usersController.logIn);

// 내 정보 확인 API
router.get('/profile', usersController.profile);

// 내 정보 수정 API
router.put('/profile', usersController.updateProfile);

module.exports = router;
