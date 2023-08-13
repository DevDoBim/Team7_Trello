const CommentService = require('../2services/comment_service');
// const {Comments} = require('../0models');

class CommentController {
  commentService = new CommentService();

  // 댓글 생성
  NewComment = async (req, res) => {
    const {userId} = res.locals.user;
    const {cardId} = req.params;
    const {text} = req.body;

    try {
      const createdComment = await this.commentService.NewComment(
        cardId,
        userId,
        text,
      );

      return res
        .status(201)
        .json({data: createdComment, message: '댓글 등록이 완료되었습니다.'});
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({errorMessage: '댓글 생성에 실패하였습니다.'});
    }
  };

  // 댓글 카드 번호로 조회
  getCommentAll = async (req, res) => {
    const {cardId} = req.params;

    try {
      const comments = await this.commentService.findAllCmt(cardId);

      return res.status(200).json({data: comments});
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({errorMessage: '댓글 조회에 실패하였습니다.'});
    }
  };

  // 댓글 수정
  putComment = async (req, res) => {
    const {cardId, commentId} = req.params;
    const {text} = req.body;

    try {
      const updatedComment = await this.commentService.updateComment(
        cardId,
        commentId,
        text,
      );

      return res
        .status(200)
        .json({message: '댓글 수정이 완료되었습니다.', data: updatedComment});
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({errorMessage: '댓글 수정에 실패하였습니다.'});
    }
  };

  // 댓글 삭제
  deleteComment = async (req, res) => {
    const {cardId, commentId} = req.params;

    try {
      await this.commentService.deleteComment(cardId, commentId);

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
