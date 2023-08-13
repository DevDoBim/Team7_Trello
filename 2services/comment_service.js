const {sequelize} = require('../0models');
const CommentRepository = require('../3repositories/comment_repository');

class CommentService {
  commentRepository = new CommentRepository();

  // 댓글 생성
  NewComment = async (cardId, userId, text) => {
    if (!cardId || !userId || !text) {
      throw new Error('내용을 입력해주세요.');
    }

    try {
      const newComment = await this.commentRepository.NewComment(
        cardId,
        userId,
        text,
      );
      return newComment;
    } catch (error) {
      throw error;
    }
  };

  // 댓글 조회
  findAllCmt = async cardId => {
    try {
      const comments = await this.commentRepository.getCommentById(cardId);
      return comments.map(cmt => {
        return {
          commentId: cmt.commentId,
          cardId: cmt.CardId,
          userId: cmt.UserId,
          text: cmt.text,
          createdAt: cmt.createdAt,
          updatedAt: cmt.updatedAt,
        };
      });
    } catch (error) {
      throw error;
    }
  };

  // 댓글 수정
  updateComment = async (cardId, commentId, text) => {
    try {
      const updatedComment = await this.commentRepository.updateComment(
        cardId,
        commentId,
        text,
      );
      return updatedComment;
    } catch (error) {
      throw new Error(error);
    }
  };

  // 댓글 삭제
  deleteComment = async (cardId, commentId) => {
    try {
      await this.commentRepository.deleteComment(cardId, commentId);

      return;
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = CommentService;
