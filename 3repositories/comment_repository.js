const {Comments} = require('../0models');
const {Op} = require('sequelize');

class CommentRepository {
  // 댓글 생성
  NewComment = async (cardId, userId, text) => {
    try {
      const newComment = await Comments.create({
        CardId: cardId,
        UserId: userId,
        text: text,
      });

      return newComment;
    } catch (error) {
      throw error;
    }
  };

  // 댓글 조회
  getCommentById = async cardId => {
    try {
      const comments = await Comments.findAll({
        where: {CardId: cardId},
      });

      return comments;
    } catch (error) {
      throw error;
    }
  };

  // 댓글 수정
  updateComment = async (cardId, commentId, text) => {
    try {
      await Comments.update(
        {text: text},
        {where: {[Op.and]: [{CardId: cardId}, {commentId: commentId}]}},
      );

      const updatedComment = await Comments.findOne({
        where: {[Op.and]: [{CardId: cardId}, {commentId: commentId}]},
      });

      return updatedComment;
    } catch (error) {
      throw error;
    }
  };

  // 댓글 삭제
  deleteComment = async (cardId, commentId) => {
    try {
      await Comments.destroy({
        where: {[Op.and]: [{CardId: cardId}, {commentId: commentId}]},
      });

      return;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CommentRepository;
