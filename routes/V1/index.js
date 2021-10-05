const { CreateContact } = require("./Contacts");
const passport = require("passport");
const { getProfile } = require("./profile");
const router = require("express").Router();

router.get(
  "/contacts",
  passport.authenticate(["User"], {
    session: false,
  }),
  (req, res) => {
    res.status(200).send({ state: "OK", url: req.originalUrl });
  }
);
router.get(
  "/contacts/:cid",
  passport.authenticate(["User"], {
    session: false,
  }),
  (req, res) => {
    res.status(200).send({ state: "OK", url: req.originalUrl });
  }
);
router.post(
  "/contacts",
  passport.authenticate(["User"], {
    session: false,
  }),
  CreateContact
);
router.put(
  "/contacts/:cid",
  passport.authenticate(["User"], {
    session: false,
  }),
  (req, res) => {
    res.status(200).send({ state: "OK", url: req.originalUrl });
  }
);
router.delete(
  "/contacts/:cid",
  passport.authenticate(["User"], {
    session: false,
  }),
  (req, res) => {
    res.status(200).send({ state: "OK", url: req.originalUrl });
  }
);
router.get("/profile",passport.authenticate(["User"], {
  session: false,
}),
getProfile)
module.exports = router;
