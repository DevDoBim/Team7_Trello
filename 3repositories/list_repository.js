const {Lists, Cards} = require('../0models');
const {Op} = require('sequelize');
const sequelize = Lists.sequelize;

class ListRepository {
  //  리스트 만들기 매서드
  createList_Repository = async (UserId, BoardId, title) => {
    try {
      // 리스트를 만든다.
      const createList_DB = await Lists.create({
        BoardId,
        title,
        UserId,
        listOrder: 0,
      });

      // 리스트 id와 같은 값으로 리스트 순서를 업데이트한다.
      const updateListOrder = await Lists.update(
        {listOrder: createList_DB.listId},
        {where: {listId: createList_DB.listId}},
      );

      const listIdForRes = createList_DB.listId;
      const titleForRes = createList_DB.title;

      return {listIdForRes, titleForRes};
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };

  //  보드 id와 리스트 id로 불러오기 매서드
  getList_Repository = async (boardId, listId) => {
    console.log('리포지터리1');
    const getList = await Lists.findOne({
      where: {
        [Op.and]: [{listId: listId}, {BoardId: boardId}],
      },
    });

    console.log('리포지터리2');

    if (!getList) {
      return {
        status: 400,
        message: `${boardId}번 보드에서 리스트 번호 ${listId}를 찾을 수 없습니다.`,
      };
    }

    console.log('리포지터리3');
    const getCard = await Cards.findAll({where: {ListId: listId}});

    if (!getCard) {
      getCard = [];
    }

    return {getList, getCard};
  };

  //  리스트 순서로 불러오기 매서드
  getListByOrder_Repository = async listOrder => {
    console.log('리스트 순서 불러오기 매서드 진입');
    const getListByOrder = await Lists.findOne({
      where: {listOrder: listOrder},
    });

    return getListByOrder;
  };

  //  리스트 수정하기 매서드
  putList_Repository = async (boardId, listId, title, listOrder) => {
    // console.log('listId :', listId);
    const putList = await Lists.update(
      {title, listOrder},
      {where: {[Op.and]: [{BoardId: boardId}, {listId: listId}]}},
    );
    return putList;
  };

  //  리스트 가장 큰 순서 불러오기 매서드
  getListByOrder_Repository2 = async () => {
    const getMaxListByOrder = await Lists.findOne({
      order: [['listOrder', 'DESC']],
    });

    return getMaxListByOrder;
  };

  //  리스트 순서 바꾸기 바꾸기 매서드
  exchangeList_Repository = async (listOrder, listOrderNew) => {
    // console.log('옮기기 메서드 실행');
    const t = await sequelize.transaction();
    let moveList;

    try {
      await Lists.update(
        {listOrder: 0},
        {where: {listOrder: listOrderNew}, transaction: t},
      );
      await Lists.update(
        {listOrder: listOrderNew},
        {where: {listOrder: listOrder}, transaction: t},
      );
      await Lists.update(
        {listOrder: listOrder},
        {where: {listOrder: 0}, transaction: t},
      );

      await t.commit();
      // console.log('트랜잭션 성공');
      moveList = {status: 200, message: '리스트 순서 교체 성공'};
      return moveList;
    } catch (error) {
      // console.error('트랜잭션 실패', error);
      await t.rollback();
      throw error;
    }
  };

  //  리스트 밀기 매서드
  moveList_Repository = async (listOrder, listOrderNew) => {
    console.log(listOrder, listOrderNew);
    const t = await sequelize.transaction();
    let moveList;

    try {
      // 바꿀 레코드 순서를 0으로
      await Lists.update(
        {listOrder: 0},
        {where: {listOrder: listOrderNew}, transaction: t},
      );

      // 순서밀기
      if (listOrder < listOrderNew) {
        for (let i = listOrderNew; i >= listOrder; i--) {
          let nowOrder = Number(i);
          let newOrder = Number(i) + Number(1);
          console.log(i, newOrder);
          Lists.update(
            {listOrder: newOrder},
            {where: {listOrder: nowOrder}, transaction: t},
          );
        }
      } else {
        for (let i = listOrderNew; i <= listOrder; i++) {
          let nowOrder = Number(i);
          let newOrder = Number(i) - Number(1);
          Lists.update(
            {listOrder: newOrder},
            {where: {listOrder: nowOrder}, transaction: t},
          );
        }
      }

      // 0으로 바꾼 레코드를 목표 순서로
      await Lists.update(
        {listOrder: listOrder},
        {where: {listOrder: 0}, transaction: t},
      );

      await t.commit();
      moveList = {status: 200, message: '리스트 순서 밀기 성공'};
      return moveList;
    } catch (err) {
      await t.rollback();
    }
  };

  // 리스트 삭제 매서드
  deleteList_Repository = async (boardId, listId) => {
    try {
      const deleteList = await Lists.destroy({
        where: {[Op.and]: [{BoardId: boardId}, {listId: listId}]},
      });

      return deleteList;
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };
}

module.exports = ListRepository;
