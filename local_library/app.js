require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const log = require("debug")("app");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

const indexRouter = require("./routes/index");
const catalogRouter = require("./routes/catalog"); // Import routes for "catalog" area of site

const app = express();

log(".env MONGO_URL:", process.env.MONGO_URL);
console.log(".env NODE_ENV:", process.env.NODE_ENV);

mongoose.set("strictQuery", false);
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
main().catch((err) => log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up rate limiter: maximum of twenty requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
});
// Apply rate limiter to all requests
app.use(limiter);

app.disable("x-powered-by");
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
    },
  })
);
app.use(compression()); // Compress all routes
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.

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
