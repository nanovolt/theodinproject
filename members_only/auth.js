const log = require("debug")("auth");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const User = require("./models/user");

module.exports = function auth(express, app, passport) {
  app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.urlencoded({ extended: false }));

  passport.use(
    new LocalStrategy(
      // {
      //   passReqToCallback: true,
      // },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username });
          if (!user) {
            return done(null, false, { message: "Incorrect username" });
          }

          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.get("/signup", (req, res) => {
    res.locals.title = "Sign up";
    res.render("signup_form");
  });

  app.post("/signup", [
    body("firstname")
      .trim()
      .isLength({ max: 64 })
      .withMessage("too long, maximum length: 64")
      .escape(),
    body("lastname")
      .trim()
      .isLength({ max: 64 })
      .withMessage("too long, maximum length: 64")
      .escape(),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username field is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("too short, minimum length: 3")
      .isLength({ max: 64 })
      .withMessage("too long, maximum length: 64")
      .escape()
      .custom(async (value) => {
        const user = await User.findOne({ username: value });
        if (user) {
          throw new Error("Can't create this username");
        }
      }),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password field is required")
      .bail()
      .isLength({ min: 4 })
      .withMessage("too short, minimum length: 4")
      .escape(),
    body("confirm")
      .trim()
      .notEmpty()
      .withMessage("confirm field is required")
      .bail()
      .escape()
      .custom(async (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords don't match");
        }
      }),

    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);

      // log("errors:", errors.array());
      // if have errors
      if (!errors.isEmpty()) {
        res.locals.title = "Sign up";
        res.locals.firstnameValue = req.body.firstname;
        res.locals.lastnameValue = req.body.lastname;
        res.locals.usernameValue = req.body.username;
        res.locals.passwordValue = req.body.password;
        res.locals.confirmValue = req.body.confirm;
        res.locals.errors = errors.array();
        res.render("signup_form");
        return;
      }

      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          log(err);
          return err;
        }

        try {
          const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
            admin: false,
          });
          await user.save();

          req.login(user, (e) => {
            if (e) {
              log("login error:", e);
              return next(e);
            }

            return res.redirect(`/`);
          });

          return null;
        } catch (e) {
          return next(e);
        }
      });
    }),
  ]);

  app.get("/login", (req, res) => {
    res.locals.title = "Log in";
    res.authErrors = req.session.messages;
    res.render("login_form");
  });

  app.post("/login", [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username field is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("too short, minimum length: 3")
      .isLength({ max: 64 })
      .withMessage("too long, maximum length: 64")
      .escape(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password field is required")
      .bail()
      .isLength({ min: 4 })
      .withMessage("too short, minimum length: 4")
      .escape(),

    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.locals.title = "Log in";
        res.locals.usernameValue = req.body.username;
        res.locals.passwordValue = req.body.password;
        res.locals.errors = errors.array();
        res.render("login_form");
        return;
      }
      // log("ath 192: ", req.body);
      // passport.authenticate("local", {
      //   successRedirect: "/",
      //   failureRedirect: "/login",
      //   failureMessage: true,
      // })(req, res, next);
      passport.authenticate("local", (err, user, info) => {
        // log("info", info);

        if (err) {
          return next(err);
        }

        if (info) {
          const authErrors = [];

          if (info.message === "Incorrect username") {
            authErrors.push({ path: "username", msg: "incorrect username" });
          }

          if (info.message === "Incorrect password") {
            authErrors.push({ path: "password", msg: "incorrect password" });
          }

          res.locals.title = "Log in";
          res.locals.usernameValue = req.body.username;
          res.locals.passwordValue = req.body.password;
          res.locals.errors = authErrors;

          res.render("login_form");
          return null;
        }

        req.login(user, (e) => {
          if (e) {
            // log("login error:", e);
            return next(e);
          }

          return res.redirect(`/`);
        });

        return null;
      })(req, res, next);
    }),
  ]);

  app.get("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
      return null;
    });
  });
};
