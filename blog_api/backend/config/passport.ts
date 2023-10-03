import "dotenv/config";
import debug from "debug";
import passport from "passport";
import { Strategy as LocalStategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import { Request } from "express";
import { extractToken } from "./jwt";

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

    return done(null, { id: user.id });
  } catch (err) {
    return done(err);
  }
});

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  // secretOrKey: "hi",
  jsonWebTokenOptions: {
    maxAge: "30s",
  },
};

const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done({ message: "Auth failed" }, false);
    }

    return done(null, { id: user.id });
  } catch (err) {
    console.log(err);
    done(err, false);
  }
});

const cookieExtractor = function (req: Request) {
  let token = null;
  if (req && req.cookies.refreshToken) {
    token = extractToken(req.cookies.refreshToken.token);
  }
  log("cookie token:", token);
  return token;
};

const refreshOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.REFRESH_TOKEN_SECRET,
  jsonWebTokenOptions: {
    maxAge: "90s",
  },
};

const refresh = new JwtStrategy(refreshOptions, async (payload, done) => {
  console.log("refresh strategy");
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done({ message: "Auth failed" }, false);
    }

    return done(null, { id: user.id });
  } catch (err) {
    console.log(err);
    done(err, false);
  }
});

passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);
passport.use("refresh", refresh);

export { passport };
