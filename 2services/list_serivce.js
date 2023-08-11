const ListRepository = require('../3repositories/list_repository');
const jwt = require('jsonwebtoken');

console.log('리스트 서비스 진입');

class ListService {
  listRepository = new ListRepository();

  //  리스트 만들기 매서드
  createList_Service = async (BoardId, title, UserId) => {
    // console.log('createList_Service매서드 진입');
    // console.log(BoardId, title);
    try {
      // ㄹ
      const cerateListComplete_Repository =
        await this.listRepository.createList_Repository(BoardId, title, UserId);

      console.log(
        'cerateListComplete_Repository :',
        typeof cerateListComplete_Repository,
        cerateListComplete_Repository,
      );
      if (cerateListComplete_Repository === null) {
        return {
          status: 400,
          message: '리스트 생성 실패',
        };
      }
      console.log(
        '컨트롤러 , cerateListComplete_Repository :',
        typeof cerateListComplete_Repository,
        cerateListComplete_Repository,
      );
      return {
        status: 200,
        message: cerateListComplete_Repository,
      };
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };
}

module.exports = ListService;
