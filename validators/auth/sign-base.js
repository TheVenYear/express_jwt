const { body } = require("express-validator");

module.exports = [
  body("email").isEmail().withMessage("Некорректный email адрес"),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Пароль должен содержать хотя бы 5 символов"),
];
