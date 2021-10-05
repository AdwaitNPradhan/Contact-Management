require("dotenv/config");
const jwt = require("jsonwebtoken");

exports.JWTPull = (req) => {
  var token = null;
  if (req && req.cookies) {
    try {
      token = req.cookies["jwt"].split(" ")[1];
    } catch (error) {}
  }

  return jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
    } else {
      return decoded;
    }
  });
};
