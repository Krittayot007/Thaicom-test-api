const { User } = require("../models");

exports.checkUserByEmail = (emailInput) =>
  User.findOne({
    where: {
      email: emailInput,
    },
  });

exports.createUser = (user) => User.create(user);

exports.getUserByEmail = (emailInput) => {
  const user = User.findOne({
    where: {
      email: emailInput,
    },
  });
  return user;
};

exports.getUserById = (id) => User.findByPk(id);
