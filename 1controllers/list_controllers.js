const ListService = require('../2services/list_serivce');

console.log('리스트 컨트롤러 진입');

class ListController {
  listService = new ListService();

  //  리스트 만들기 API
  createList_Controller = async (req, res) => {
    try {
      const {UserId} = res.locals.user;
      const {title, BoardId} = req.body;

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

  //  리스트 불러오기 API
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

  //  리스트 수정하기 API
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

  // 리스트 순서 바꾸기 API
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

  //  리스트 밀기 API
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

  // 리스트 지우기 API
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
