const CommentRepository = require('../3repositories/comment_repository');

class CommentService {
  commentRepository = new CommentRepository();

  // 댓글 생성
  NewComment = async (cardId, userId, text) => {
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
  getComment = async (cardId, commentId) => {
    try {
      const comment = await this.commentRepository.getCommentById(commentId);
      return comment;
    } catch (error) {
      throw error;
    }
  };

  // 댓글 수정
  updateComment = async (commentId, userId, text) => {
    try {
      const updatedComment = await this.commentRepository.updateComment(
        commentId,
        text,
      );

      if (!updatedComment) {
        throw new Error('댓글을 찾을 수 없습니다.');
      }

      if (updatedComment.UserId !== userId) {
        throw new Error('댓글을 수정할 권한이 없습니다.');
      }

      return updatedComment;
    } catch (error) {
      throw error;
    }
  };

  // 댓글 삭제
  deleteComment = async (commentId, userId) => {
    try {
      const isDeleted = await this.commentRepository.deleteComment(commentId);

      if (!isDeleted) {
        throw new Error('댓글을 찾을 수 없습니다.');
      }

      return true;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CommentService;
