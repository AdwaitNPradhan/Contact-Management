const {
  DeleteContact,
  CreateContact,
  GetContacts,
  GetContact,
  UpdateContact,
} = require("./Contacts");
const passport = require("passport");
const { getProfile } = require("./profile");
const router = require("express").Router();

router.get(
  "/contacts",
  passport.authenticate(["User"], {
    session: false,
  }),
  GetContacts
);
router.get(
  "/contacts/:cid",
  passport.authenticate(["User"], {
    session: false,
  }),
  GetContact
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
  UpdateContact
);
router.delete(
  "/contacts/:cid",
  passport.authenticate(["User"], {
    session: false,
  }),
  DeleteContact
);
router.get(
  "/profile",
  passport.authenticate(["User"], {
    session: false,
  }),
  getProfile
);
module.exports = router;
