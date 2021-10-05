// File: ./lib/utils.js
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
/**
 *
 * @param {*} type
 * @param {*} user
 * @returns
 */
function issueJWT(type, user) {
  const _id = user._id;
  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };
  if (type === "owner") {
    payload.isOwner = user.meta.isOwner;
  }
  const signedToken = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expiresIn,
    algorithm: "HS384",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

module.exports = issueJWT;
