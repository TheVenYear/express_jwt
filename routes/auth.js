const router = require("express").Router();

const auth = require("../controllers/auth");

router.post("/sign-up", auth.signUpController);
router.post("/sign-in", auth.signInController);
router.get("/me", auth.meController);

module.exports = router;
