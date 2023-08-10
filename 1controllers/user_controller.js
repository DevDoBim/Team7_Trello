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
}

module.exports = UsersController;
