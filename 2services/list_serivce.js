const ListRepository = require('../3repositories/list_repository');
const jwt = require('jsonwebtoken');

console.log('서비스 진입');

class ListService {
  listRepository = new ListRepository();

  createList_Service = async (BoardId, title, UserId, listOrder) => {
    console.log('createList_Service매서드 진입');
    console.log(BoardId, title);
    try {
      const cerateListComplete_Repository =
        await this.listRepository.createList_Repository(
          BoardId,
          title,
          UserId,
          listOrder,
        );

      if (cerateListComplete_Repository === null) {
        return {
          status: 400,
          message: '리스트 생성 실패',
        };
      }
      return {status: 200, message: '옵션 등록에 성공했습니다.'};
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };
}

module.exports = ListService;
