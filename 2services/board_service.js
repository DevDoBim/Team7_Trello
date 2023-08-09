const BoardRepository = require('../repositories/board_repository');

class BoardService {
  boardRepository = new BoardRepository();

  // # 보드 생성 API
  createBoard = async (UserId, title, desc) => {
    const boardData = await this.boardRepository.createBoard(
      UserId,
      title,
      desc,
    );
    return {
      boardId: boardData.boardId,
      title: boardData.title,
      desc: boardData.desc,
      createdAt: boardData.createdAt,
      updatedAt: boardData.updatedAt,
    };
  };

  // # 보드 조회 API
  getBoard = async () => {
    return await this.boardRepository.getBoard();
  };

  // # 보드 수정 API
  updateBoard = async (UserId, boardId, title, desc) => {
    const updatedBoard = await this.boardRepository.findBoard(boardId);
    if (!updatedBoard) {
      return res.status(404).json({errorMessage: '보드가 존재하지 않습니다.'});
    }
    if (UserId !== updatedBoard.UserId) {
      return res.status(412).json({errorMessage: '권한이 존재하지 않습니다.'});
    }
    await this.boardRepository.updateBoard(boardId, title, desc);
  };

  // # 보드 삭제 API
  deleteBoard = async (UserId, boardId) => {
    const deletedBoard = await this.boardRepository.findBoard(boardId);
    if (!deletedBoard) {
      return res.status(404).json({errorMessage: '보드가 존재하지 않습니다.'});
    }
    if (UserId !== deletedBoard.UserId) {
      return res.status(412).json({errorMessage: '권한이 존재하지 않습니다.'});
    }
    await this.boardRepository.deleteBoard(boardId);
  };

  // # 보드 초대 API
  inviteBoard = async (UserId, boardId, invitedUserId) => {
    const board = await this.boardRepository.findBoard(boardId);
    if (!board) {
      return res.status(404).json({errorMessage: '보드가 존재하지 않습니다.'});
    }
    if (board.UserId !== UserId) {
      return res.status(412).json({errorMessage: '초대 권한이 없습니다.'});
    }
    const invitedUser = await this.boardRepository.findById(invitedUserId);
    if (!invitedUser) {
      return res.status(401).json({errorMessage: '대상이 존재하지 않습니다.'});
    }
    await this.boardRepository.inviteBoard(boardId, invitedUserId);
  };
}
module.exports = BoardService;
