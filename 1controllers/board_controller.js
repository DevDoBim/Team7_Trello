const BoardService = require('../2services/board_service');

class BoardController {
  boardService = new BoardService();

  // # 보드 생성 API
  createBoard = async (req, res) => {
    const {userId} = res.locals.user;
    const {title, desc} = req.body;
    try {
      if (!title || !desc) {
        return res
          .status(412)
          .json({errorMessage: 'title과 desc 모두 작성해주세요.'});
      }
      const boardData = await this.boardService.createBoard(
        userId,
        title,
        desc,
      );
      return res
        .status(201)
        .json({data: boardData, message: '보드가 생성되었습니다.'});
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({errorMessage: '보드 생성에 실패하였습니다.'});
    }
  };

  // # 보드 조회 API
  getBoard = async (req, res) => {
    try {
      const boards = await this.boardService.getBoard();
      return res.status(200).json({boards});
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({errorMessage: '보드 조회에 실패하였습니다.'});
    }
  };

  // 보드 상세 조회 API
  getOneBoard = async (req, res) => {
    const {boardId} = req.params;
    try {
      const board = await this.boardService.findOneBoard(boardId);
      return res.status(200).json(board);
    } catch (error) {
      return res.status(400).json({errorMessage: error.message});
    }
  };

  // # 보드 수정 API
  updateBoard = async (req, res) => {
    const {userId} = res.locals.user;
    const {boardId} = req.params;
    const {title, content} = req.body;
    try {
      await this.boardService.updateBoard(userId, boardId, title, content);
      return res.status(200).json({message: '게시글을 수정하였습니다.'});
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({errorMessage: '보드 수정에 실패하였습니다.'});
    }
  };

  // # 보드 삭제 API
  deleteBoard = async (req, res) => {
    const {userId} = res.locals.user;
    const {boardId} = req.params;
    try {
      await this.boardService.deleteBoard(userId, boardId);
      return res.status(200).json({message: '보드를 삭제하였습니다.'});
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({errorMessage: '보드 삭제에 실패하였습니다.'});
    }
  };

  // # 보드 초대 API
  inviteBoard = async (req, res) => {
    // 초대할 보드 + 초대할 유저
    const {userId} = res.locals.user;
    const {boardId, invitedUserId} = req.body;
    try {
      await this.boardService.inviteBoard(userId, boardId, invitedUserId);
      return res.status(200).json({message: '보드에 초대하였습니다.'});
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({errorMessage: '보드 초대에 실패하였습니다.'});
    }
  };
}
module.exports = BoardController;
