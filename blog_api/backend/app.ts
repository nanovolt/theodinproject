import debug from "debug";
import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import indexRoute from "./routes/index";
import adminRoute from "./routes/admin";

const log = debug("app");

export const app = express();

const corsOptions: cors.CorsOptions = {
  // credentials: true,
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRoute);
app.use("/admin", adminRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err instanceof HttpError) {
    res.status(err.status);
  } else {
    log("error handler: non-http error:", err);
    res.status(500);
  }

  res.json(err);
});
