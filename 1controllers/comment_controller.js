const CommentService = require('../2services/comment_service');
const {Comments} = require('../0models');

class CommentController {
  commentService = new CommentService();

  // 댓글 생성
  NewComment = async (req, res) => {
    const {userId} = res.locals.user;
    const {cardId} = req.params;
    const {text} = req.body;

    try {
      const createdComment = await Comments.create({
        UserId: userId,
        CardId: cardId,
        text,
      });

      return res.status(201).json({data: createdComment});
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({errorMessage: '댓글 생성에 실패하였습니다.'});
    }
  };

  // 댓글 카드 번호로 조회
  getCommentAll = async (req, res) => {
    const {cardId} = req.params;

    try {
      const comment = await Comments.findAll({
        where: {CardId: cardId},
        attributes: [
          'commentId',
          'UserId',
          'CardId',
          'text',
          'createdAt',
          'updatedAt',
        ],
      });

      return res.status(200).json({data: comment});
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({errorMessage: '댓글 조회에 실패하였습니다.'});
    }
  };

  // 댓글 수정
  putComment = async (req, res) => {
    const {commentId} = req.params;
    const {text} = req.body;

    try {
      const commentToUpdate = await Comments.findOne({
        where: {commentId},
      });

      await Comments.update(
        {text},
        {
          where: {commentId},
        },
      );

      const updatedComment = await Comments.findOne({
        where: {commentId},
        attributes: [
          'commentId',
          'UserId',
          'CardId',
          'text',
          'createdAt',
          'updatedAt',
        ],
      });

      return res.status(200).json({data: updatedComment});
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({errorMessage: '댓글 수정에 실패하였습니다.'});
    }
  };

  // 댓글 삭제
  deleteComment = async (req, res) => {
    const {commentId} = req.params;

    try {
      const commentToDelete = await Comments.findOne({
        where: {commentId},
      });

      await Comments.destroy({
        where: {commentId},
      });

      return res.status(200).json({message: '댓글 삭제를 완료하였습니다.'});
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({errorMessage: '댓글 삭제에 실패하였습니다.'});
    }
  };
}

module.exports = CommentController;
