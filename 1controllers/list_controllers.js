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
      const {title, UserId, BoardId} = req.body;

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
      const {listId, BoardId} = req.params;

      const {status, message} = await this.listService.getList_Service(
        listId,
        BoardId,
      );
      return res.status(status).json({message});
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };

  //  리스트 수정하기 매서드
  putList_Controller = async (req, res) => {
    try {
      const {listId, BoardId} = req.params;
      const {title} = req.body;

      const {status, message} = await this.listService.putList_Service(
        listId,
        title,
        BoardId,
      );
      return res.status(status).json({message});
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };

  // 리스트 순서 바꾸기 매서드
  exchangeList_Controller = async (req, res) => {
    try {
      const {listOrder, BoardId} = req.params;
      const {listOrderNew} = req.body;

      const {status, message} = await this.listService.exchangeList_Service(
        listOrder,
        listOrderNew,
        BoardId,
      );
      return res.status(status).json({message});
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };

  //  리스트 밀기 매서드
  moveList_Controller = async (req, res) => {
    try {
      const {listOrder, BoardId} = req.params;
      const {listOrderNew} = req.body;

      const {status, message} = await this.listService.moveList_Service(
        listOrder,
        listOrderNew,
        BoardId,
      );
      return res.status(status).json({message});
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };

  // 리스트 지우기 매서드
  deleteList_Controller = async (req, res) => {
    try {
      const {BoardId, listId} = req.params;
      const {sureDeleteList} = req.body;

      const {status, message} = await this.listService.deleteList_Service(
        BoardId,
        listId,
        sureDeleteList,
      );
      return res.status(status).json({message});
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };
}

module.exports = ListController;
