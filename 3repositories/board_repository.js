const {Boards, Memberships, Lists, MembershipUsers} = require('../0models');
const sequelize = Lists.sequelize;

class BoardRepository {
  // # 보드 작성 API
  createBoard = async (UserId, title, desc) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // 보드 생성
      const boardData = await Boards.create(
        {UserId, title, desc},
        {transaction},
      );

      // 멤버쉽 생성
      await Memberships.create({ownerId: UserId}, {transaction});

      // 멤버쉽에서 가장 높은 id 가져오기
      const maxMembershipId = await Memberships.findOne({
        attributes: [
          [
            sequelize.fn('max', sequelize.col('membershipId')),
            'maxMembershipId',
          ],
        ],
        transaction,
      });

      // 멤버쉽 유저 생성
      await MembershipUsers.create(
        {
          UserId: UserId,
          MembershipId: maxMembershipId.dataValues.maxMembershipId || 0,
        },
        {transaction},
      );

      await transaction.commit();

      return boardData;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  };

  // # 보드 조회 API
  getBoard = async () => {
    return await Boards.findAll({});
  };

  //  보드 접근 권한 조회
  boardAuth = async (boardId, userId) => {
    try {
      const haveAuth = await MembershipUsers.findOne({
        where: {UserId: userId, MembershipId: boardId},
        attributes: ['UserId'],
      });
      console.log('haveAuth :', typeof haveAuth, haveAuth);
      return haveAuth;
    } catch (error) {
      return {status: 400, message: `보드 읽기 권한 조회 실패`};
    }
  };

  // # 보드 id로 조회
  findOneBoard = async boardId => {
    const board = await Boards.findOne({where: {boardId: boardId}});
    const lists = await Lists.findAll({where: {BoardId: boardId}});

    return {
      board,
      lists,
    };
  };
  
  // # 수정, 삭제, 초대에 필요한 id 조회
  findBoard = async boardId => {
    return await Boards.findByPk(boardId);
  };

  // # 수정, 삭제, 초대에 필요한 id 조회
  findBoard = async boardId => {
    return await Boards.findByPk(boardId);
  };

  // # 보드 수정 API
  updateBoard = async (boardId, title, desc) => {
    const updateValues = {};
    if (title) updateValues.title = title;
    if (desc) updateValues.desc = desc;
    const updateBoard = await Boards.update(updateValues, {where: {boardId}});
    return updateBoard;
  };

  // # 보드 삭제 API
  deleteBoard = async boardId => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      await Boards.destroy({where: {boardId}, transaction});
      await Memberships.destroy({where: {membershipId: boardId}, transaction});
      await MembershipUsers.destroy({
        where: {membershipId: boardId},
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  };

  // // # 초대 대상 확인
  // findById = async invitedUserId => {
  //   return await Boards.findByPk(invitedUserId);
  // };
  // // # 보드 초대 API
  // inviteBoard = async (boardId, invitedUserId) => {
  //   await Memberships.findOrCreate({
  //     where: {boardId, invitedUserId},
  //   });
  // };
}

module.exports = BoardRepository;
