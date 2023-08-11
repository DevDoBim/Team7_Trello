const {Comments} = require('../0models');

class CommentRepository {
  // 댓글 생성
  NewComment = async (cardId, userId, text) => {
    try {
      const newComment = await Comments.create({
        cardId: cardId,
        userId: userId,
        text: text,
      });

      return newComment;
    } catch (error) {
      throw error;
    }
  };

  // 댓글 조회
  getCommentById = async commentId => {
    try {
      const comment = await Comments.findOne({
        where: {id: commentId},
      });

      return comment;
    } catch (error) {
      throw error;
    }
  };

  // 댓글 수정
  updateComment = async (commentId, text) => {
    try {
      const [rowsUpdated, updatedComments] = await Comments.update(
        {text: text},
        {where: {id: commentId}, returning: true},
      );

      if (rowsUpdated === 0) {
        throw new Error('댓글을 찾을 수 없습니다.');
      }

      return updatedComments[0];
    } catch (error) {
      throw error;
    }
  };

  // 댓글 삭제
  deleteComment = async commentId => {
    try {
      const rowsDeleted = await Comments.destroy({
        where: {id: commentId},
      });

      return true;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CommentRepository;
