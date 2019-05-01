const router = require("express").Router();
const passport = require("../handlers/passport");
const User = require("../models/User");
const { isLogged } = require("../handlers/middlewares");

router.get("/signup", (req, res, next) => res.render("auth/signup"));

router.post("/signup", (req, res, next) => {
  User.register({ ...req.body }, req.body.password)
    .then(() => {
      res.redirect("/auth/login");
      console.log("It is Working");
    })
    .catch(err => next(err));
});

router.get("/login", (req, res, next) => res.render("auth/login"));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/auth/login");
    req.logIn(user, err => {
      if (err) return next(err);
      req.app.locals.loggedUser = user;
      if (req.user.role === "Admin") return res.redirect("/admin/profile");
      else if (req.user.role === "User") return res.redirect("/user");
      else if (req.user.role === "Client") return res.redirect("/client");
    });
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.app.locals.loggedUser = "";
  req.logOut();
  res.redirect("/auth/login");
});

router.get("/profile", isLogged, (req, res, next) =>
  res.render("auth/profile")
);

module.exports = router;
