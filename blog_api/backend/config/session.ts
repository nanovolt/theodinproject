// const log = require("debug")("db");
// const mongoose = require("mongoose");
// require("dotenv").config();
// const session = require("express-session");
import session from "express-session";
// import MongoStore from "connect-mongo";
import RedisStore from "connect-redis";
import { redisClient } from "./redis";

// const dbOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const expressSession = session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  // store: MongoStore.create({
  //   mongoUrl: process.env.MONGO,
  //   collectionName: "sessions",
  //   autoRemoveInterval: 60,
  // }),
  store: new RedisStore({
    client: redisClient,
    prefix: "blog_api:",
  }),
  cookie: {
    maxAge: 1000 * 60,
    // httpOnly: true,
  },
  rolling: true,
});

export { expressSession };
