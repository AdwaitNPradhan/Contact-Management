const { SignUp } = require("./SignUp");

const router = require("express").Router();

router.post("/signin", (req, res) => {
  res.status(200).send({ state: "OK", url: req.originalUrl });
});
router.post("/signup", SignUp);
router.post("/signout", (req, res) => {
  res.status(200).send({ state: "OK", url: req.originalUrl });
});

module.exports = router;
