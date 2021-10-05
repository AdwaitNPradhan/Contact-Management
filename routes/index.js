const router = require("express").Router();

router.use("/auth", require("./Auth/index"));
router.use("/v1", require("./V1/index"));

module.exports = router;
