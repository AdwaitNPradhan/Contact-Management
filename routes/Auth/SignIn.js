const { error4xx, error5xx } = require("../../Controllers/ErrResponse");
const User = require("../../Models/User");
const issueJWT = require("../../Utils/JWTmaker");
const bcrypt = require("bcrypt");
exports.SignIn = (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    let error = error4xx("Sign In", "Email, Password fields are required");
    console.error(error);
    res.send(400).send(error);
  } else {
    User.findOne({ "contact.email": email })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            let tokenObject = issueJWT("user", user);
            res
              .cookie("jwt", tokenObject.token)
              .status(200)
              .json({
                success: true,
                User: {
                  uName: user.uName,
                  fName: user.fName,
                  lName: user.lName,
                  contact: {
                    email: user.contact.email,
                    phone: user.contact.phone,
                  },
                },
                token: tokenObject.token,
              });
          } else {
            let error = error4xx(
              "Sign In",
              "Either the Email or the Password you entered is wrong"
            );
            res.status(401).send(error);
          }
        } else {
          let error = error4xx(
            "Sign In",
            "Either the Email or the Password you entered is wrong"
          );
          res.status(404).send(error);
        }
      })
      .catch((err) => {
        let error = error5xx(err, "Sign In", "Error while Sign In look up");
        console.error(err);
        res.status(500).send(error);
      });
  }
};
