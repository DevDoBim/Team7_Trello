const UserRepository = require('../3repositories/user_repository');
const jwt = require('jsonwebtoken');

class UserService {
  userRepository = new UserRepository();

  // 중복 이메일 검사
  checkExistUser = async email => {
    const existUser = await this.userRepository.findUserByEmail(email);
    if (existUser) {
      throw new Error('이미 존재하는 이메일입니다.');
    }
    return;
  };

  // UserRepository 인스턴스를 생성해서 사용자 관련 데이터베이스 작업을 수행할 준비를 합니다.

  // email로 사용자 조회
  findOneUser = async email => {
    const oneUser = await this.userRepository.findOneUser(email);
    return oneUser;
  };

  // 회원 가입
  createUser = async (email, password, confirm) => {
    const validEmailCheck = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]+$/;

    if (!validEmailCheck.test(email) || email.length < 3) {
      throw new Error('이메일의 형식이 올바르지 않습니다.');
    }

    if (!password || (password + '').length < 4) {
      throw new Error('패스워드는 4자이상이어야 합니다.');
    }

    if (!confirm || password !== confirm) {
      throw new Error(
        '패스워드가 일치하지 않습니다. 패스워드 재입력은 confirm 입니다.',
      );
    }

    // 에러 처리 통과 후 사용자 생성을 위해 repository로 넘김
    const createUserData = await this.userRepository.createUser(
      email,
      password,
    );

    return {
      email: createUserData.email,
      createdAt: createUserData.createdAt,
    };
  };

  // 로그인
  login = async (email, password) => {
    if (!email) {
      throw new Error('email을 입력해주세요.');
    } else if (!password) {
      throw new Error('password를 입력해주세요');
    }

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error('계정 정보를 다시 확인해주세요.');
    } else if (user.password !== password) {
      throw new Error('계정 정보를 다시 확인해주세요.');
    }

    try {
      // JWT 생성
      const token = jwt.sign(
        {
          userId: user.userId,
        },
        'customized_secret_key',
      );
      return token;
    } catch (error) {
      throw new Error(error);
    }
  };

  // 사용자 아이디로 사용자 정보 찾기
  findOneUserById = async (userId, token) => {
    // token 매개변수 추가
    try {
      const user = await this.userRepository.findOneUserById(userId);

      // 사용자 찾기
      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }

      // 인증되지 않은 요청 처리
      if (!token) {
        throw new Error('인증되지 않은 요청입니다.');
      }

      // 사용자 인증
      if (req.user) {
        const user = await this.userService.findOneUser(req.user.userId);
        return res.status(200).json({data: user});
      } else {
        return res.status(401).json({message: '승인되지 않음'});
      }

      return user; // 일단 여기까지는 리턴
    } catch (error) {
      throw error;
    }
  };

  // 패스워드 업데이트
  updateUserPassword = async (userId, newPassword) => {
    try {
      const user = await this.userRepository.findOneUserById(userId);

      if (!user) {
        return null;
      }

      user.password = newPassword;
      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
