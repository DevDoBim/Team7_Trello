const CardRepository = require('../3repositories/card_repository');

class CardService {
  cardRepository = new CardRepository();

  // 카드 생성
  addCard = async (userId, title, content) => {
    if (!userId) {
      throw new Error('로그인 후 사용 가능합니다..');
    } else if (!title) {
      throw new Error('카드의 제목을 입력해주세요.');
    } else if (!content) {
      throw new Error('카드의 내용을 입력해주세요.');
    }

    try {
      console.log('서비스1');
      const addCardData = await this.cardRepository.addCard(
        userId,
        title,
        content,
      );

      console.log('서비스2');
      return {
        userId: addCardData.userId,
        title: addCardData.title,
        content: addCardData.content,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  // 카드 전체 조회
  findAllCard = async () => {
    console.log('카드 전제 조회 서비스 1');
    try {
      const allCard = await this.cardRepository.findAllCard();

      allCard.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      console.log('카드 전제 조회 서비스 2');

      return allCard.map(card => {
        return {
          cardId: card.cardId,
          userId: card.UserId,
          title: card.title,
          content: card.content,
          createdAt: card.createdAt,
          updatedAt: card.updatedAt,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  // 카드 번호로 조회
  findOneCard = async cardId => {
    if (!cardId) {
      throw new Error('카드 번호를 다시 확인해주세요.');
    }
    console.log('카드 번호로 조회 서비스 1');
    try {
      const foundedCard = await this.cardRepository.findOneCard(cardId);
      if (!foundedCard) {
        throw new Error('카드 번호를 다시 확인해주세요.');
      }

      console.log('카드 번호로 조회 서비스 2');
      return {
        cardId: foundedCard.cardId,
        userId: foundedCard.UserId,
        title: foundedCard.title,
        content: foundedCard.content,
        createdAt: foundedCard.createdAt,
        updatedAt: foundedCard.updatedAt,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  // 카드 수정
  updateCard = async (cardId, title, content) => {
    const cardExistCheck = await this.cardRepository.findOneCard(cardId);
    if (!cardId) {
      throw new Error('카드 번호를 다시 확인해주세요.');
    } else if (!title) {
      throw new Error('수정할 카드의 제목을 입력해주세요.');
    } else if (!content) {
      throw new Error('수정할 카드의 내용을 입력해주세요.');
    } else if (!cardExistCheck) {
      throw new Error('카드 번호를 다시 확인해주세요.');
    }

    try {
      console.log('카드 수정 서비스 1');
      await this.cardRepository.updateCard(cardId, title, content);

      const updatedCard = await this.cardRepository.findOneCard(cardId);

      return {
        cardId: updatedCard.cardId,
        userId: updatedCard.UserId,
        title: updatedCard.title,
        content: updatedCard.content,
        createdAt: updatedCard.createdAt,
        updatedAt: updatedCard.updatedAt,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  // 카드 순서 이동

  // 카드 삭제
  deleteCard = async cardId => {
    const cardExistCheck = await this.cardRepository.findOneCard(cardId);
    if (!cardExistCheck) {
      throw new Error('카드 번호를 다시 확인해주세요.');
    }

    try {
      console.log('카드 삭제 서비스 1');
      await this.cardRepository.deleteCard(cardId);
      console.log('카드 삭제 서비스 2');
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = CardService;
