const { body } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const signBaseValidator = require("./sign-base");

const MESSAGE = "Не верный email или пароль";

module.exports = [
  ...signBaseValidator,
  body("email").custom(async (value, { req }) => {
    const user = await User.findOne({ email: value });
    if (!user) {
      return Promise.reject(MESSAGE);
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return Promise.reject(MESSAGE);
    }
  }),
];
