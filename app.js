const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors"); // CROSS_ORIGIN RESORCE SHARING
const helmet = require("helmet"); // FOR HTTP HEADER SECURITY
const cookieParser = require("cookie-parser");
const serverHealth = require("server-health");
const passport = require("passport");
const envValidator = require("./Utils/envValidator");
require("./Utils/Passport")(passport);

require("dotenv/config");
envValidator();

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to MongoDB Established");
    serverHealth.addConnectionCheck("database", function () {
      return true;
    });
  })
  .catch((err) => {
    console.error(err);
    serverHealth.addConnectionCheck("database", function () {
      return false;
    });
  });

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

serverHealth.exposeHealthEndpoint(app, "/health", "express");
app.get("/", function (req, res) {
  res.status(200).send({ state: "OK", url: req.originalUrl });
});
app.use("/api", require("./routes/index"));
app.get("/*", (req, res) => {
  res.status(404).send({ message: "URL IS NOT AVAILABLE" });
});

app.listen(PORT, function () {
  console.log("Server started on port " + PORT);
});
