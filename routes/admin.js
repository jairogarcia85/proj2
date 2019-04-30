const router = require("express").Router();
const User = require("../models/User");
const Ticket = require("../models/Ticket");

router.get("/", (req, res, next) => {
  const usersPromise = User.find({ role: "User" });
  const clientsPromise = User.find({ role: "Client" });

  Promise.all([usersPromise, clientsPromise]).then(([users, clients]) => {
    res.render("admin/profile", { users, clients });
  });
});

router.get("/users", (req, res, next) => {
  User.find({ role: "User" })
    .sort({ createdAt: -1 })
    .then(users => {
      res.render("admin/users", { users });
    })
    .catch(err => next(err));
});

// router.get("/users:id", (req, res, next) => {
//   const { id } = req.params;
//   User.findByIdAndDelete(id)
//     .then(() => res.redirect("admin/users"))
//     .catch(err => next(err));
// });

// router.post("/admin/users/create", (req, res, next) => {
//   User.create({ ...req.body })
//     .then(() => res.redirect("/admin/users"))
//     .catch(err => next(err));
// });

router.get("/create-user", (req, res, next) => res.render("admin/create-user"));

router.post("/create-user", (req, res, next) => {
  User.register({ ...req.body }, req.body.password)
    .then(() => {
      res.redirect("/admin/create-user");
    })
    .catch(err => next(err));
});

router.get("/create-client", (req, res, next) =>
  res.render("admin/create-client")
);

router.post("/create-client", (req, res, next) => {
  User.register({ ...req.body, role: "Client" }, req.body.password)
    .then(() => {
      res.redirect("/admin/create-client");
    })
    .catch(err => next(err));
});

router.get("/users", (req, res, next) => {
  User.find({ role: "User" })
    .sort({ createdAt: -1 })
    .then(users => {
      res.render("admin/users", { users });
    })
    .catch(err => next(err));
});

router.get("/users/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(() => res.redirect("/admin/users"))
    .catch(err => next(err));
});

router.get("/clients", (req, res, next) => {
  User.find({ role: "Client" })
    .sort({ createdAt: -1 })
    .then(clients => {
      res.render("admin/clients", { clients });
    })
    .catch(err => next(err));
});

router.get("/clients/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(() => res.redirect("/admin/clients"))
    .catch(err => next(err));
});

module.exports = router;
