exports.isLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role === "Admin") return next();
  res.redirect("/login");
};

exports.isUser = (req, res, next) => {
  if (req.user.role === "User") return next();
  res.redirect("/login");
};

exports.isClient = (req, res, next) => {
  if (req.user.role === "Client") return next();
  res.redirect("/login");
};
