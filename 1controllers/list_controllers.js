const ListService = require('../2services/list_serivce');
const jwt = require('jsonwebtoken');

console.log('컨트롤러 진입');

class ListController {
  listService = new ListService();

  createList_Controller = async (req, res) => {
    console.log('createList_Controller매서드 진입');
    try {
      const {BoardId, title, UserId, listOrder} = req.body;

      console.log(BoardId, title);

      const {status, message} = await this.listService.createList_Service(
        BoardId,
        title,
        UserId,
        listOrder,
      );
      return res.status(status).json({message});
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };
}

module.exports = ListController;
