const chalk = require("chalk");

require("dotenv/config");
let errors = [];
let checkC = 0;
console.log(
  chalk.magentaBright.green.bold.underline(
    "Checking Environment Variables for the App..."
  )
);
/**
 *
 * @returns null
 */
const envValidator = () => {
  if (!process.env.MONGODB_URI) {
    errors.push("MongoDB URI String is not DEFINED !!!");
  }
  if (!process.env.GMAIL_ID) {
    errors.push("GMAIL_ID is not DEFINED !!!");
  }
  if (!process.env.GMAIL_PASS) {
    errors.push("GMAIL_PASS is not DEFINED !!!");
  }
  if (!process.env.TOKEN_SECRET) {
    errors.push("Password for DataBase Connection is not DEFINED !!!");
  }
  if (!process.env.TOKEN_SECRET) {
    errors.push("Password for DataBase Connection is not DEFINED !!!");
  }
  if (errors && checkC === 1) {
    console.log(chalk.bgRed.white.bold("\n  FAILED!!  "));
    console.log(
      chalk.bgWhite.red.bold(
        "\n============================!!!ERRORS!!!============================"
      )
    );
    errors.forEach((error) => {
      console.log(
        chalk.bgWhite.bold.red(" ") +
          chalk.bgRed.white.bold(" ERROR: ") +
          chalk.bgWhite.bold.red(" ") +
          chalk.underline.bgWhite.bold.red(error) +
          chalk.bgWhite.bold.red(" ")
      );
    });
    console.log(
      chalk.bgWhite.red.bold(
        "============================!!!ERRORS!!!============================\n"
      )
    );
    console.log(
      chalk.bgRed.white.bold(
        "\n  Exitting App!! Please Re-check the ENV Variables.  "
      )
    );
    process.exit(1);
  } else {
    console.log(
      chalk.magentaBright.green.bold.underline(
        "Environment Variables check Passed."
      )
    );
    return;
  }
};

module.exports = envValidator;
