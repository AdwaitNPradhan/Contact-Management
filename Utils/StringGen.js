const randomString = require("randomstring");

module.exports = {
  /**
   * Used for genrating Token strings
   * @returns An Alpha-Numeric String 20 charactes long
   */
  tokenGen: () => {
    return randomString.generate({
      length: 20,
      charset: "alphanumeric",
    });
  },
  /**
   * Used for Generating 'n' Characters long Alpha-Numeric String
   * @param length Number of characters that the string should have
   * @returns length characters long Alpha-Numeric String
   */
  genCode: (length) => {
    return randomString.generate({
      length: length,
      charset: "alphanumeric",
    });
  },
};
