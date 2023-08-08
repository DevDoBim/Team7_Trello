const {Boards, Memberships} = require('../models');

class BoardRepository {
  // # 보드 작성 API
  createBoard = async (UserId, title, desc) => {
    const boardData = await Boards.create({UserId, title, desc});
    return boardData;
  };

  // # 보드 조회 API
  getBoard = async () => {
    return await Boards.findAll({});
  };
  // # 보드 id로 조회
  findBoard = async boardId => {
    return await Boards.findByPk(boardId);
  };

  // # 보드 수정 API
  updateBoard = async (boardId, title, desc) => {
    const updateValues = {};
    if (title) updateValues.title = title;
    if (desc) updateValues.desc = desc;
    await Boards.update(updateValues, {where: {boardId}});
  };

  // # 보드 삭제 API
  deleteBoard = async boardId => {
    await Boards.destroy({where: {boardId}});
  };

  // # 초대 대상 확인
  findById = async invitedUserId => {
    return await Boards.findByPk(invitedUserId);
  };
  // # 보드 초대 API
  inviteBoard = async (boardId, invitedUserId) => {
    await Memberships.findOrCreate({
        where:{boardId, invitedUserId}
    })
  }
}

module.exports = BoardRepository;
