const CardService = require('../2services/card_service');

class CardController {
  cardService = new CardService();

  // 카드 생성
  NewCard = async (req, res) => {
    const {listId} = req.params;
    const {userId} = res.locals.user;
    const {title, content, status} = req.body;

    try {
      console.log('컨트롤러1');
      const addCardData = await this.cardService.addCard(
        listId,
        userId,
        title,
        content,
        status,
      );
      console.log('컨트롤러2');
      return res
        .status(200)
        .json({data: addCardData, message: '카드 등록이 완료되었습니다.'});
    } catch (error) {
      return res.status(400).json({errorMessage: error.message});
    }
  };

  // 카드 전제 조회
  getCardAll = async (req, res) => {
    try {
      console.log('카드 전제 조회 컨트롤러 1');
      const allCard = await this.cardService.findAllCard();
      console.log('카드 전제 조회 컨트롤러 2');
      return res.status(200).json({data: allCard});
    } catch (error) {
      return res.status(400).json({errorMessage: error.message});
    }
  };

  // 카드 번호로 조회(title, content, comment 등)
  getCard = async (req, res) => {
    const {listId, cardId} = req.params;
    try {
      console.log('카드 번호로 조회 컨트롤러 1');
      const card = await this.cardService.findOneCard(listId, cardId);
      console.log('카드 번호로 조회 컨트롤러 2');
      return res.status(200).json(card);
    } catch (error) {
      return res.status(400).json({errorMessage: error.message});
    }
  };

  // 카드 수정
  putCard = async (req, res) => {
    const {cardId} = req.params;
    const {title, content, status} = req.body;

    try {
      console.log('카드 수정 컨트롤러 1');
      const card = await this.cardService.updateCard(
        cardId,
        title,
        content,
        status,
      );
      console.log('카드 수정 컨트롤러 2');
      return res
        .status(200)
        .json({message: '카드 수정이 완료되었습니다.', data: card});
    } catch (error) {
      return res.status(400).json({errorMessage: error.message});
    }
  };

  // 카드 순서 이동

  // 카드 삭제
  deleteCard = async (req, res) => {
    const {listId, cardId} = req.params;
    try {
      console.log('카드 삭제 컨트롤러 1');
      await this.cardService.deleteCard(listId, cardId);
      console.log('카드 삭제 컨트롤러 2');
      return res
        .status(200)
        .json({cardId, message: '카드 삭제가 완료되었습니다.'});
    } catch (error) {
      return res.status(400).json({errorMessage: error.message});
    }
  };
}

module.exports = CardController;
