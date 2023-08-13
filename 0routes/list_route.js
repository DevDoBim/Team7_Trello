const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

// 사용자 관련 API를 모두 /controllers/01_user_controller.js로 전송
const ListController = require('../1controllers/list_controllers');
const listController = new ListController();

// 리스트 만들기 API
router.post(
  '/boards/:boardId/lists',
  authMiddleware,
  listController.createList_Controller,
);

// 리스트 조회 API
router.get(
  '/boards/:boardId/lists/:listId',
  authMiddleware,
  listController.getList_Controller,
);

// 리스트 수정 API
router.put(
  '/boards/:boardId/lists/:listId',
  authMiddleware,
  listController.putList_Controller,
);

// 카드 순서 변경같은데 시연 보여달라고 해야지
router.put(
  '/boards/:boardId/lists/:listOrder/exchange',
  listController.exchangeList_Controller,
);
router.put(
  '/boards/:boardId/lists/:listOrder/move',
  listController.moveList_Controller,
);

// 리스트 삭제 API
router.delete(
  '/boards/:boardId/lists/:listId',
  authMiddleware,
  listController.deleteList_Controller,
);

module.exports = router;
