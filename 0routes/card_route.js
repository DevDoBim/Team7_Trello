const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const CardController = require('../1controllers/card_controller');
const cardController = new CardController();

// 카드 생성
router.post('/cards', authMiddleware, cardController.NewCard);

// 카드 전체 조회
router.get('/cards/', authMiddleware, cardController.getCardAll);

// 카드 번호로 조회
router.get('/cards/:cardId', authMiddleware, cardController.getCard);

// 카드 수정
router.put('/cards/:cardId', authMiddleware, cardController.putCard);

// 카드 순서 이동
// router.put('', cardController);

// 카드 삭제
router.delete('/cards/:cardId', authMiddleware, cardController.deleteCard);

module.exports = router;
