const express = require('express');
const router = express.Router();

// console.log('리스트 라우터 진입');

// 사용자 관련 API를 모두 /controllers/01_user_controller.js로 전송
const ListController = require('../1controllers/list_controllers');
const listController = new ListController();

//  리스트 만들기 API
router.post('/lists', listController.createList_Controller);
router.get('/lists/:listId', listController.getList_Controller);
router.put('/lists/:listId', listController.putList_Controller);
router.put(
  '/lists/:listOrder/exchange',
  listController.exchangeList_Controller,
);
router.put('/lists/:listOrder/move', listController.moveList_Controller);

module.exports = router;
