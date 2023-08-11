const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const CommentController = require('../1controllers/comment_controller');
const commentController = new CommentController();

// 댓글 생성
router.post(
  '/cards/:cardId/comments',
  authMiddleware,
  commentController.NewComment.bind(commentController),
);

// 댓글 카드 번호로 조회
router.get(
  '/cards/:cardId/comments/:commentId',
  authMiddleware,
  commentController.getCommentAll.bind(commentController),
);

// 댓글 수정
router.put(
  '/cards/:cardId/comments/:commentId',
  authMiddleware,
  commentController.putComment.bind(commentController),
);

// 댓글 삭제
router.delete(
  '/cards/:cardId/comments/:commentId',
  authMiddleware,
  commentController.deleteComment.bind(commentController),
);

module.exports = router;
