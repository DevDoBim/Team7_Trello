const ListService = require('../2services/list_serivce');
const jwt = require('jsonwebtoken');

console.log('리스트 컨트롤러 진입');

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

  //  리스트 불러오기 매서드
  getList_Controller = async (req, res) => {
    try {
      const {listId} = req.params;

      const {status, message} = await this.listService.getList_Service(listId);
      return res.status(status).json({message});
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };

  //  리스트 수정하기 매서드
  putList_Controller = async (req, res) => {
    try {
      const {listId} = req.params;
      const {title} = req.body;

      const {status, message} = await this.listService.putList_Service(
        listId,
        title,
      );
      return res.status(status).json({message});
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };

  // 리스트 순서 바꾸기 매서드
  exchangeList_Controller = async (req, res) => {
    try {
      const {listOrder} = req.params;
      const {listOrderNew} = req.body;

      const {status, message} = await this.listService.exchangeList_Service(
        listOrder,
        listOrderNew,
      );
      return res.status(status).json({message});
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };

  //  리스트 밀기 매서드
  moveList_Controller = async (req, res) => {
    try {
      const {listOrder} = req.params;
      const {listOrderNew} = req.body;

      const {status, message} = await this.listService.moveList_Service(
        listOrder,
        listOrderNew,
      );
      return res.status(status).json({message});
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };
}

module.exports = ListController;
