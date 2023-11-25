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

import helmet from "helmet";

import { passport } from "./config/passport";
import { expressSession } from "./config/session";
import { MongooseError } from "mongoose";

const log = debug("app");

export const app = express();

app.use(helmet());
app.set("trust proxy", true);

const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: [process.env.CORS_CMS, process.env.CORS_BLOG],
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
  next(createError(404, { error: "oops, page not found" }));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err instanceof HttpError) {
    return res.status(err.status).json(err);
  }

  log("error handler: non-http error:");
  // log(JSON.stringify(err));
  // log(err.name);
  // log(err.message);
  log("error:", err);

  if (err === "Error: failed to deserialize user") {
    return res.status(401).json({ error: "user not found" });
  }

  // if (err instanceof Error.ValidationError) {
  //   const messages = Object.values(err.errors).map((e) => e.message);

  //   return next(
  //     createError(400, "Could not create user due to some invalid fields", {
  //       error: messages,
  //     })
  //   );
  // } else if ((err as MongoError).code === 11000) {
  //   return next(
  //     createError(400, {
  //       error: "A user with this this unique key already exists!",
  //     })
  //   );
  // }

  if (err instanceof MongooseError) {
    log(err.name);
    log(err.message);
    log(err.cause);
    log(err.stack);

    return res.status(500).json({ error: "Database error", message: err.message });
  }

  // if (err.name && err.name === "MongoServerError" && err.code === 11000) {
  //   return res.status(400).json({ error: "There was a duplicate key error" });
  //   //  next(new Error("There was a duplicate key error"));
  // }

  // if (err instanceof MongoServerError) {
  //   log(err.name);
  //   log(err.message);
  //   log(err.cause);
  //   log(err.stack);

  //   return res.status(500).json({ error: "Database error" });
  // }

  return res.status(500).json({});
});
