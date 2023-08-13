const {Cards, Comments} = require('../0models');
const {Op} = require('sequelize');

class CardRepository {
  // 카드 생성
  addCard = async (listId, userId, title, content, status) => {
    const addCardData = await Cards.create({
      ListId: listId,
      UserId: userId,
      title: title,
      content: content,
      status: status,
    });

    return addCardData;
  };

  // 카드 전제 조회
  findAllCard = async listId => {
    const cards = await Cards.findAll({where: {ListId: listId}});

    return cards;
  };

  // 카드 번호로 조회
  findOneCard = async (listId, cardId) => {
    const foundedCard = await Cards.findOne({
      where: {[Op.and]: [{ListId: listId}, {cardId: cardId}]},
    });
    const ownComments = await Comments.findAll({where: {CardId: cardId}});

    return {foundedCard, ownComments};
  };

  // 카드 수정
  updateCard = async (listId, cardId, title, content, status) => {
    await Cards.update(
      {
        title: title,
        content: content,
        status: status,
      },
      {
        where: {[Op.and]: [{ListId: listId}, {cardId: cardId}]},
      },
    );

    const updatedCard = await this.findOneCard(listId, cardId);

    return updatedCard;
  };

  // 카드 순서 이동

  // 카드 삭제
  deleteCard = async (listId, cardId) => {
    await Cards.destroy({
      where: {[Op.and]: [{ListId: listId}, {cardId: cardId}]},
    });

    return;
  };
}

module.exports = CardRepository;
