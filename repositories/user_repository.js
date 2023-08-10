const {Users} = require('../models');

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
}

module.exports = UserRepository;
