const ListRepository = require('../3repositories/list_repository');
const jwt = require('jsonwebtoken');

console.log('리스트 서비스 진입');

const validationCheck =
  /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~ㄱ-ㅎ가-힣ㅏ-ㅣ]+$/;
const validationMessage =
  '리스트의 이름은 영어 대/소문자, 숫자 사용가능, 일부 특수문자 사용불가';

class ListService {
  listRepository = new ListRepository();

  //  리스트 만들기 매서드
  createList_Service = async (BoardId, title, UserId) => {
    // console.log('createList_Service매서드 진입');
    // console.log(BoardId, title);
    try {
      // 검증
      if (!BoardId || !title || !UserId) {
        return {
          status: 400,
          message: '필요한 값을 모두 입력해주세요.',
        };
      }

      if (!validationCheck.test(title)) {
        return {
          status: 400,
          message: validationMessage,
        };
      }

      const cerateListComplete_Repository =
        await this.listRepository.createList_Repository(BoardId, title, UserId);

      console.log(
        'cerateListComplete_Repository :',
        typeof cerateListComplete_Repository,
        cerateListComplete_Repository,
      );
      if (cerateListComplete_Repository === null) {
        return {
          status: 400,
          message: '리스트 생성 실패',
        };
      }
      // console.log(
      //   '컨트롤러 , cerateListComplete_Repository :',
      //   typeof cerateListComplete_Repository,
      //   cerateListComplete_Repository,
      // );
      return {
        status: 200,
        message: cerateListComplete_Repository,
      };
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };

  //  리스트 불러오기 매서드
  getList_Service = async (listId, BoardId) => {
    try {
      const getListResult = await this.listRepository.getList_Repository(
        listId,
      );
      if (getListResult === null) {
        return {
          status: 400,
          message: `리스트 번호 ${listId}를 찾을 수 없습니다.`,
        };
      }
      // console.log(getListResult);
      return {
        status: 200,
        message: `리스트 ${getListResult.listId}번 불러오기 성공`,
      };
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };

  //  리스트 수정하기 매서드
  putList_Service = async (listId, title, BoardId) => {
    try {
      // 입력 값 검증
      if (!listId || !title) {
        return {
          status: 400,
          message: '필요한 값을 모두 입력해주세요.',
        };
      }

      if (!validationCheck.test(title)) {
        return {
          status: 400,
          message: validationMessage,
        };
      }

      // 일단 리스트 조회하기
      const getListResult = await this.listRepository.getList_Repository(
        listId,
      );

      if (getListResult === null) {
        return {
          status: 400,
          message: '리스트를 찾을 수 없습니다.',
        };
      }
      // console.log(getListResult);

      // 리스트 조회한 값을 기반으로 타이틀제목이 입력 안됐다면 유지하기
      if (title === '') {
        return {
          status: 400,
          message: '리스트의 이름을 입력해주세요',
        };
      }
      const putListResult = await this.listRepository.putList_Repository(
        listId,
        title,
      );

      if (putListResult === null) {
        return {
          status: 400,
          message: '리스트 정보 업데이트 요청이 유효하지 않습니다.',
        };
      }
      // console.log(getListResult);
      return {
        status: 200,
        message: `리스트 ${listId}번 수정하기 성공`,
      };
    } catch (err) {
      return {status: 400, message: err.message};
    }
  };

  //  리스트 순서 바꾸기 매서드
  exchangeList_Service = async (listOrder, listOrderNew) => {
    try {
      // 유효성 검증
      // 바꿀 순서와 현재 순서가 같다면 거른다. (DB 참조 최소화)
      const isNumber = Number(listOrderNew);
      if (isNaN(isNumber) || isNumber === 0 || isNumber === Number(listOrder)) {
        return {
          status: 400,
          message:
            '리스트의 순서는 0 이외의 숫자여야하며, 같은 숫자로 바꿀 수 없습니다.',
        };
      }

      console.log('유효성검증 통과');

      // 실제로 있는 순서인지 확인
      const getListByOrderResult1 =
        await this.listRepository.getListByOrder_Repository(listOrder);
      if (getListByOrderResult1 === null) {
        return {
          status: 400,
          message: '순서를 바꾸려는 리스트를 찾을 수 없습니다.',
        };
      }

      // 가장 큰 순서를 가져온다.
      const getListByOrderResult2 =
        await this.listRepository.getListByOrder_Repository2();
      if (getListByOrderResult2 === null) {
        return {
          status: 400,
          message: '리스트를 찾을 수 없습니다.',
        };
      }

      // console.log(getListByOrderResult2.listOrder, Number(listOrderNew));

      if (getListByOrderResult2.listOrder < Number(listOrderNew)) {
        listOrderNew = getListByOrderResult2.listOrder;
      }

      // console.log(getListByOrderResult2.listOrder, Number(listOrderNew));

      const moveListResult = await this.listRepository.exchangeList_Repository(
        listOrder,
        listOrderNew,
      );

      // console.log(moveListResult);
      return moveListResult;
    } catch (err) {}
  };

  //  리스트 밀기 매서드
  moveList_Service = async (listOrder, listOrderNew, BoardId) => {
    try {
      // 유효성 검증
      // 바꿀 순서와 현재 순서가 같다면 거른다. (DB 참조 최소화)
      const isNumber = Number(listOrderNew);
      if (isNaN(isNumber) || isNumber === 0 || isNumber === Number(listOrder)) {
        return {
          status: 400,
          message:
            '리스트의 순서는 0 이외의 숫자여야하며, 같은 숫자로 바꿀 수 없습니다.',
        };
      }

      // console.log('유효성검증 통과');

      // 실제로 있는 순서인지 확인
      const getListByOrderResult1 =
        await this.listRepository.getListByOrder_Repository(listOrder);
      if (getListByOrderResult1 === null) {
        return {
          status: 400,
          message: '순서를 바꾸려는 리스트를 찾을 수 없습니다.',
        };
      }

      // 가장 큰 순서를 가져온다.
      const getListByOrderResult2 =
        await this.listRepository.getListByOrder_Repository2();
      if (getListByOrderResult2 === null) {
        return {
          status: 400,
          message: '리스트를 찾을 수 없습니다.',
        };
      }

      // console.log(getListByOrderResult2.listOrder, Number(listOrderNew));

      if (getListByOrderResult2.listOrder < Number(listOrderNew)) {
        listOrderNew = getListByOrderResult2.listOrder;
      }

      // console.log(getListByOrderResult2.listOrder, Number(listOrderNew));

      const moveListResult = await this.listRepository.moveList_Repository(
        listOrder,
        listOrderNew,
      );

      // console.log(moveListResult);
      return moveListResult;
    } catch (err) {}
  };

  //  리스트 삭제 매서드
  deleteList_Service = async (BoardId, listId, sureDeleteList) => {
    // 유효성 검증
    if (sureDeleteList !== '1') {
      return {
        status: 400,
        message: '적절하지 않은 요청으로 리스트 삭제 취소',
      };
    }

    // 삭제할 리스트가 실존하는지 확인
    const getListResult = await this.listRepository.getList_Repository(listId);
    if (!getListResult) {
      return {
        status: 400,
        message: `리스트 번호 ${listId}를 찾을 수 없습니다.`,
      };
    }

    const deleteListResult = await this.listRepository.deleteList_Repository(
      listId,
    );
    if (!deleteListResult) {
      return {
        status: 400,
        message: '삭제 실패',
      };
    }

    return {
      status: 200,
      message: `리스트 ${getListResult.listId}번 삭제하기 성공`,
    };
  };
}

module.exports = ListService;
