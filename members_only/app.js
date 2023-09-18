const nconf = require("nconf");
const log = require("debug")("app");
const path = require("path");

const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const clubRouter = require("./routes/club");

const auth = require("./auth");

nconf
  .argv()
  .env()
  .file({ file: `${__dirname}/config/config.json` });

// log(`nconf.get():`, nconf.get());
// log(`process.env:`, process.env);

mongoose.set("strictQuery", false);
async function main() {
  await mongoose.connect(nconf.get("mongodb"));
}
main().catch((err) => log(err));

const app = express();
log(`app.get("env"):`, app.get("env"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

auth(express, app, passport);

app.use((req, res, next) => {
  // log("req.user:", req.user);
  res.locals.user = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/club", clubRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
