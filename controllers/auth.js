const jwt = require("jsonwebtoken");

const {
  signInValidator,
  signUpValidator,
  verifyValidator,
} = require("../validators/auth");
const User = require("../models/User");
const withValidator = require("../validators/with-validator");

module.exports = {
  signUpController: withValidator(signUpValidator, async (req, res) => {
    const user = new User(req.body);

    try {
      const { id, email } = await user.save();
      res.send({ id, email });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }),

  signInController: withValidator(signInValidator, async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
      );
      res.header("auth-token", token);
      res.send();
    } catch (error) {
      res.status(400).send(error.message);
    }
  }),
  meController: withValidator(verifyValidator, (req, res) => {
    res.send(req.user);
  }),
};
