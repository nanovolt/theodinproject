import "dotenv/config";
import passport from "passport";
import { Strategy as LocalStategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import { User } from "../models/user";

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
  secretOrKey: process.env.JWT_SECRET,
  jsonWebTokenOptions: {
    maxAge: "30s",
  },
};

const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
  console.log("jwtStrategy runs...");
  console.log("payload:", payload);
  try {
    const user = await User.findById(payload.sub.id);
    if (!user) {
      return done(null, false, { message: "Auth failed" });
    }

    return done(null, { id: user.id });
  } catch (err) {
    console.log(err);
    done(err, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export { passport };
