// repositories/list_repository.js

const {Lists} = require('../0models');

console.log('레포지토리 진입');

class ListRepository {
  createList_Repository = async (BoardId, title, UserId, listOrder) => {
    console.log('createList_Repository매서드 진입');
    console.log(BoardId, title);

    try {
      const createList_DB = await Lists.create({
        BoardId,
        title,
        UserId,
        listOrder,
      });
      console.log('createList_DB :', createList_DB);

      return createList_DB;
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };
}

module.exports = ListRepository;
