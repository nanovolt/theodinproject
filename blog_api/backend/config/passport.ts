import "dotenv/config";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/user";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  jsonWebTokenOptions: {
    maxAge: "30s",
  },
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  console.log("jwtStrategy runs...");
  console.log("payload:", payload);
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false, { message: "Auth failed" });
    }
    return done(null, user);
  } catch (err) {
    console.log(err);
    done(err, false);
  }
});

passport.use(jwtStrategy);

export { passport };
