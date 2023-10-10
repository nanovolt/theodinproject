import "dotenv/config";
import debug from "debug";
import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import "./config/mongodb";
import v1 from "./routes/api/v1";

import { passport } from "./config/passport";
import { expressSession } from "./config/session";

const log = debug("app");

export const app = express();

const corsOptions: cors.CorsOptions = {
  // credentials: true,
  origin: ["http://localhost:3001"],
  exposedHeaders: "Authorization",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(expressSession);
// app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/v1", v1);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, "oops, page not found"));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err instanceof HttpError) {
    res.status(err.status);
  } else {
    log("error handler: non-http error:");
    log(err);
    res.status(500);
  }

  res.json(err);
});
