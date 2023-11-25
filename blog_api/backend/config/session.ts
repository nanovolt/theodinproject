// require("dotenv").config();
// import MongoStore from "connect-mongo";
import session from "express-session";
import RedisStore from "connect-redis";
import { redisClient } from "./redis";
// import { redisClient } from "ioredis";

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
    // maxAge 1 hour
    maxAge: 1000 * 60 * 60 * 1,
    httpOnly: true,

    // production
    sameSite: "none",
    secure: true,

    // development
    // sameSite: "strict",
  },
  rolling: true,
});

export { expressSession };
