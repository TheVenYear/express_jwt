const jwt = require("jsonwebtoken");
const { header } = require("express-validator");

module.exports = [
  header("auth-token")
    .exists()
    .withMessage("Токен jwt не найден")
    .bail()
    .custom(async (value, { req }) => {
      try {
        req.user = jwt.verify(value, process.env.JWT_SECRET);
      } catch (error) {
        return Promise.reject("Неверный jwt токен");
      }
    })
    .bail(),
];
