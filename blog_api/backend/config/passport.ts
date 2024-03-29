import "dotenv/config";
import debug from "debug";
import passport from "passport";
import { Strategy as LocalStategy } from "passport-local";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/user";
import createHttpError from "http-errors";

const log = debug("config:passport");

const localStrategy = new LocalStategy(async (username, password, done) => {
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return done(null, false, { message: "Incorrect username or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password or password" });
    }

    return done(null, { id: user.id, username: user.username });
  } catch (err) {
    return done(err);
  }
});

passport.use("local", localStrategy);

// adds passport property to req.session
passport.serializeUser(function (user, cb) {
  log("passport.serializeUser:", user);
  // pass in id
  cb(null, user.id);
});

// get id that was passed in serializeUser
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw Error();
    }
    return cb(null, { id: user.id, username: user.username });
  } catch (e) {
    return cb(createHttpError(401, { message: "failed to deserialize user" }));
  }
});

export { passport };
