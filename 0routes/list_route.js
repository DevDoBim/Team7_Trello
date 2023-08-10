const express = require('express');
const router = express.Router();

console.log('리스트 라우터 진입');

// 사용자 관련 API를 모두 /controllers/01_user_controller.js로 전송
const ListController = require('../1controllers/list_controllers');
const listController = new ListController();

//  리스트 만들기 API
router.post('/lists', listController.createList_Controller);

module.exports = router;
