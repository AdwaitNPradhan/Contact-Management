const { error4xx, error5xx } = require("../../Controllers/ErrResponse");
const { JWTPull } = require("../../Controllers/JWTPuller");
const User = require("../../Models/User");
exports.getProfile = (req, res, next) => {
  let { sub: uid } = JWTPull(req);
  if (!uid) {
    let error = error4xx("Get Profile", "Missing UID Fields");
    console.error(error);
    res.status(400).send(error);
  } else {
    User.findById(uid, { password: 0, _id: 0, "meta.valid": 0, __v: 0 })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        let error = error5xx(
          err,
          "Get Profile",
          "Failed to Contact Data base Servers"
        );
        console.error(error);
        res.status(500).send(error);
      });
  }
};
