const { validationResult } = require("express-validator");

module.exports = (validator, callback) => [
  validator,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
      return;
    }
    callback(req, res);
  },
];
