// repositories/list_repository.js

const {Lists} = require('../0models');

console.log('리스트 레포지토리 진입');

class ListRepository {
  //  리스트 만들기 매서드
  createList_Repository = async (BoardId, title, UserId) => {
    // console.log('createList_Repository매서드 진입');
    // console.log(BoardId, title);

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

      console.log('000');
      const listIdForRes = createList_DB.listId;
      const titleForRes = createList_DB.title;

      console.log('1111 : ', createList_DB, listIdForRes, titleForRes);

      return {listIdForRes, titleForRes};
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };
}

module.exports = ListRepository;
