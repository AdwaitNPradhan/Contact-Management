const router = require("express").Router();

router.get("/contacts", (req, res) => {
  res.status(200).send({ state: "OK", url: req.originalUrl });
});
router.get("/contacts/:cid", (req, res) => {
  res.status(200).send({ state: "OK", url: req.originalUrl });
});
router.post("/contacts", (req, res) => {
  res.status(200).send({ state: "OK", url: req.originalUrl });
});
router.put("/contacts/:cid", (req, res) => {
  res.status(200).send({ state: "OK", url: req.originalUrl });
});
router.delete("/contacts/:cid", (req, res) => {
  res.status(200).send({ state: "OK", url: req.originalUrl });
});
module.exports = router;
