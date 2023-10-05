import "dotenv/config";
import debug from "debug";
import passport from "passport";
import { Strategy as LocalStategy } from "passport-local";
import bcrypt from "bcryptjs";
import { User } from "../models/user";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = debug("config:passport");

const localStrategy = new LocalStategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, { id: user!.id, username: user!.username });
  } catch (err) {
    return done(err);
  }
});

passport.use("local", localStrategy);

// adds passport property to req.session
passport.serializeUser(function (user, cb) {
  log("serializeUser user:", user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id);
    return cb(null, { id: user!.id, username: user!.username });
  } catch (e) {
    return cb(e);
  }
});

export { passport };
