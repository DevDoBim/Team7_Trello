const CardRepository = require('../3repositories/card_repository');

class CardService {
  cardRepository = new CardRepository();

  // 카드 생성
  addCard = async (listId, userId, title, content, status) => {
    if (!listId) {
      throw new Error('리스트 번호를 확인해주세요.');
    } else if (!userId) {
      throw new Error('로그인 후 사용 가능합니다.');
    } else if (!title) {
      throw new Error('카드의 제목을 입력해주세요.');
    } else if (!content) {
      throw new Error('카드의 내용을 입력해주세요.');
    }
    if (
      !(
        status === '준비' ||
        status === '진행' ||
        status === '완료' ||
        status === '장애'
      )
    ) {
      throw new Error(
        '알맞은 상태(status)를 지정해주세요. 사용 가능한 상태는 "준비", "진행", "완료","장애"가 있습니다.',
      );
    }

    try {
      console.log('서비스1');
      const addCardData = await this.cardRepository.addCard(
        listId,
        userId,
        title,
        content,
        status,
      );

      console.log('서비스2');
      return {
        listId: addCardData.listId,
        userId: addCardData.userId,
        title: addCardData.title,
        content: addCardData.content,
        status: addCardData.status,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  // 카드 전체 조회
  findAllCard = async listId => {
    console.log('카드 전제 조회 서비스 1');
    try {
      const allCard = await this.cardRepository.findAllCard(listId);

      allCard.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      console.log('카드 전제 조회 서비스 2');

      return allCard.map(card => {
        return {
          cardId: card.cardId,
          listId: card.ListId,
          userId: card.UserId,
          status: card.status,
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
  findOneCard = async (listId, cardId) => {
    if (!listId) {
      throw new Error('리스트 번호를 다시 확인해주세요.');
    } else if (!cardId) {
      throw new Error('카드 번호를 다시 확인해주세요.');
    }
    console.log('카드 번호로 조회 서비스 1');
    try {
      const {foundedCard, ownComments} = await this.cardRepository.findOneCard(
        listId,
        cardId,
      );
      if (!foundedCard) {
        throw new Error('카드 번호를 다시 확인해주세요.');
      }

      const ownCmt = ownComments.map(cmt => cmt.cardId);

      console.log('카드 번호로 조회 서비스 2');
      return {
        cardId: foundedCard.cardId,
        userId: foundedCard.UserId,
        status: foundedCard.status,
        title: foundedCard.title,
        content: foundedCard.content,
        createdAt: foundedCard.createdAt,
        updatedAt: foundedCard.updatedAt,
        ownComments: ownCmt,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  // 카드 수정
  updateCard = async (listId, cardId, title, content, status) => {
    const cardExistCheck = await this.cardRepository.findOneCard(
      listId,
      cardId,
    );
    if (!cardId) {
      throw new Error('카드 번호를 다시 확인해주세요.');
    } else if (!title) {
      throw new Error('수정할 카드의 제목을 입력해주세요.');
    } else if (!content) {
      throw new Error('수정할 카드의 내용을 입력해주세요.');
    } else if (!cardExistCheck.foundedCard) {
      throw new Error('카드 번호를 다시 확인해주세요.');
    } else if (
      !(
        status === '준비' ||
        status === '진행' ||
        status === '완료' ||
        status === '장애'
      )
    ) {
      throw new Error(
        '알맞은 상태(status)를 지정해주세요. 사용 가능한 상태는 "준비", "진행", "완료","장애"가 있습니다.',
      );
    }

    try {
      console.log('카드 수정 서비스 1');
      const updatedCard = await this.cardRepository.updateCard(
        listId,
        cardId,
        title,
        content,
        status,
      );
      console.log('카드 수정 서비스 2');

      return {
        cardId: updatedCard.foundedCard.cardId,
        userId: updatedCard.foundedCard.UserId,
        title: updatedCard.foundedCard.title,
        content: updatedCard.foundedCard.content,
        status: updatedCard.foundedCard.status,
        createdAt: updatedCard.foundedCard.createdAt,
        updatedAt: updatedCard.foundedCard.updatedAt,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  // 카드 순서 이동

  // 카드 삭제
  deleteCard = async (listId, cardId) => {
    const cardExistCheck = await this.cardRepository.findOneCard(
      listId,
      cardId,
    );
    if (!cardExistCheck.foundedCard) {
      throw new Error('카드 번호를 다시 확인해주세요.');
    }

    try {
      console.log('카드 삭제 서비스 1');
      await this.cardRepository.deleteCard(listId, cardId);
      console.log('카드 삭제 서비스 2');
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = CardService;
