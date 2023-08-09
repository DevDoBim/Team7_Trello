const express = require('express');
const router = express.Router();

// 사용자 관련 API를 모두 /controllers/01_user_controller.js로 전송
const ListController = require('../controllers/list_controllers');
const listController = new ListController();

console.log('라우터 진입');

// 회원 가입 API
router.post('/createList', listController.createList_Controller);

module.exports = router;
