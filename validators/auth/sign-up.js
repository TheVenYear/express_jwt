const { body } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const signBaseValidator = require("./sign-base");

module.exports = [
  ...signBaseValidator,
  body("email").custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
      return Promise.reject("Email уже зарегестрирован");
    }
  }),

  body("password").customSanitizer(async (value) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(value, salt);
  }),
];
