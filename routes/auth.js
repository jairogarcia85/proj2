const router = require("express").Router();
const passport = require("../handlers/passport");
const { isLogged } = require("../handlers/middlewares");

router.get("/login", (req, res, next) => res.render("auth/login"));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, err => {
      if (err) return next(err);
      req.app.locals.loggedUser = user;
      if (req.user.role === "Admin") return res.redirect("/admin");
      else if (req.user.role === "User") return res.redirect("/user");
      else if (req.user.role === "Client") return res.redirect("/client");
    });
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.app.locals.loggedUser = "";
  req.logOut();
  res.redirect("/login");
});

router.get("/profile", isLogged, (req, res, next) =>
  res.render("auth/profile")
);

module.exports = router;
