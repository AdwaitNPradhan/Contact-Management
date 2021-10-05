const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../Models/User");
// const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();
var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    try {
      token = req.cookies["jwt"].split(" ")[1];
    } catch (error) {}
  }
  return token;
};
var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.TOKEN_SECRET;
opts.algorithm = ["HS384"];

module.exports = function (passport) {
  passport.use(
    "User",
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne(
        {
          _id: jwt_payload.sub,
        },
        function (err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
            // or you could create a new account
          }
        }
      );
    })
  );
};
