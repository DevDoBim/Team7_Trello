const UserService = require('../2services/user_service');

class UsersController {
  userService = new UserService();

  // 회원 가입 API
  createUser = async (req, res) => {
    const {email, password, confirm} = req.body;

    try {
      await this.userService.checkExistUser(email);

      const createUserData = await this.userService.createUser(
        email,
        password,
        confirm,
      );

      return res
        .status(201)
        .json({data: createUserData, message: '회원가입이 완료되었습니다.'});
    } catch (error) {
      return res.status(400).json({
        errorMessage: error.message,
      });
    }
  };

  // 로그인 API
  logIn = async (req, res) => {
    const {email, password} = req.body;

    try {
      const token = await this.userService.login(email, password);

      // 쿠키 발급
      res.cookie('authorization', `Bearer ${token}`);
      return res.status(200).json({message: '로그인에 성공하였습니다.'});
    } catch (error) {
      return res.status(400).json({errorMessage: error.message});
    }
  };

  // 내 정보 확인 API
  profile = async (req, res) => {
    try {
        // 토큰을 기준으로 사용자 정보 검색
        if (req.user) {
          const user = await this.userService.findOneUser(req.user.userId);
          return res.status(200).json({data: user});
        } else {
          return res.status(401).json({message: '승인되지 않음'});
        }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({errorMessage: '서버에 에러가 발생했습니다.'});
    }
  };

  // 내 정보 수정 API
  updateProfile = async (req, res) => {
    try {
      this.isAuthenticated(req, res, async () => {
        const {newPassword} = req.body;

        if (req.user) {
          // 토큰을 기준으로 사용자 정보 검색
          const user = await this.userService.findOneUser(req.user.userId);

          // 사용자 암호 업데이트
          user.password = newPassword;
          await user.save();

          return res.status(200).json({message: '정보가 업데이트되었습니다.'});
        } else {
          return res.status(401).json({message: '승인되지 않음'});
        }
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({errorMessage: '서버에 에러가 발생했습니다.'});
    }
  };
}

module.exports = UsersController;
