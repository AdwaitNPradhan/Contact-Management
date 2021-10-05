const User = require("../../Models/User");
const issueJWT = require("../../Utils/JWTmaker");
const bcrypt = require("bcrypt");
const { error4xx, error5xx } = require("../../Controllers/ErrResponse");
exports.SignUp = (req, res, next) => {
    let { fName, lName, uName, email, phone, password } = req.body;
  if (!fName || !lName || !uName || !email || !phone || !password) {
    let error = error4xx("Sign Up", "Missing Fields");
    console.error(error);
    res.status(400).send(error);
  } else {
    let hashPass = bcrypt.hashSync(password.trim(), 10);
    User.findOne({
      uName: uName,
      "meta.valid": true,
      "contact.email": email,
      "contact.phone": phone,
    })
      .then((user) => {
        if (!user) {
          let newUser = new User({
            fName: fName.trim(),
            lName: lName.trim(),
            uName: uName.trim(),
            contact: {
              email: email.trim(),
              phone: phone.trim(),
            },
            password: hashPass,
          });
          newUser
            .save()
            .then((user) => {
              res.status(201).send({ state: "OK" });
            })
            .catch((err) => {
              let error = error5xx(
                err,
                "Sign Up",
                "Cant Contact Database Servers"
              );
              console.error(error);
              res.status(500).send(error);
            });
        } else {
          let error = error4xx(
            "Sign up",
            "UserName, Email or Phone are already in use"
          );
          console.error(error);
          res.status(400).send(error);
        }
      })
      .catch((err) => {
        let error = error5xx(err, "Sign Up", "Cant Contact Database Servers");
        console.error(error);
        res.status(500).send(error);
      });
  }
};
