const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

// 멤버쉽 관련 API를 모두 /1controllers/membership_controller로 전송
const MembershipController = require('../1controllers/membership_controller');
const listController = new ListController();

//  멤버쉽은 보드를 생성/삭제할 때 자동으로 생성/삭제된다.

//  멤버쉽 주인 바꾸기
router.post(
  '/boards/:boardId/lists',
  authMiddleware,
  listController.createList_Controller,
);
