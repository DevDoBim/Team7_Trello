const ListService = require('../2services/list_serivce');
const jwt = require('jsonwebtoken');

// console.log('리스트 컨트롤러 진입');

class ListController {
  listService = new ListService();

  //  리스트 만들기 매서드
  createList_Controller = async (req, res) => {
    // console.log('createList_Controller매서드 진입');
    // console.log(BoardId, title);

    try {
      const {BoardId, title, UserId} = req.body;

      const {status, message} = await this.listService.createList_Service(
        BoardId,
        title,
        UserId,
      );
      return res.status(status).json({message});
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };
}

module.exports = ListController;
