const {Users} = require('../0models');

class UserRepository {
  // DB에서 email 조회
  findUserByEmail = async email => {
    const oneUser = await Users.findOne({
      where: {email: email},
    });
    console.log('리포지터리1');

    return oneUser;
  };

  // 회원 가입, DB에 회원 email, password 입력
  createUser = async (email, password) => {
    const createUserData = await Users.create({
      email: email,
      password: password,
    });

    return createUserData;
  };

  // 사용자 정보 찾기
  findOneUserById = async userId => {
    try {
      const user = await Users.findOne({where: {userId}});
      return user;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserRepository;
