const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validator");
const createError = require("../utils/create-error");
const userService = require("../services/user-service");
const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);
    const hadUser = await userService.checkUserByEmail(value.email);
    if (!!hadUser) {
      createError("user is already in use", 400);
    }

    value.password = await bcryptService.hash(value.password); // hash password

    const user = await userService.createUser(value); // value = object user

    const accessToken = tokenService.sign({ id: user.id });

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    const user = await userService.getUserByEmail(value.email);
    // console.log(user, "-----------");
    if (!user) {
      createError("invalid credential", 400);
    }

    const isCorrect = await bcryptService.compare(
      value.password,
      user.password
    );

    if (!isCorrect) {
      createError("invalid credential");
    }
    const accessToken = tokenService.sign({
      id: user.id,
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
