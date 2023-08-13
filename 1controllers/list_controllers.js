const ListService = require('../2services/list_service');

class ListController {
  listService = new ListService();

  //  리스트 만들기 API
  createList_Controller = async (req, res) => {
    try {
      const {userId} = res.locals.user;
      const {boardId} = req.params;
      const {title} = req.body;

      const {status, message} = await this.listService.createList_Service(
        userId,
        boardId,
        title,
      );
      return res.status(status).json({message});
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };

  //  리스트 불러오기 API
  getList_Controller = async (req, res) => {
    try {
      const {boardId, listId} = req.params;

      const message = await this.listService.getList_Service(boardId, listId);

      return res.status(200).json(message);
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };

  //  리스트 수정하기 API
  putList_Controller = async (req, res) => {
    try {
      const {boardId, listId} = req.params;
      const {title} = req.body;

      const {status, message} = await this.listService.putList_Service(
        boardId,
        listId,
        title,
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
      const {boardId, listId} = req.params;
      const {sureDeleteList} = req.body;

      const {status, message} = await this.listService.deleteList_Service(
        boardId,
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
