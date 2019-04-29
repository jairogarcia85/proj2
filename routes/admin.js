const router = require("express").Router();
const User = require("../models/User");
const Client = require("../models/Client");
const Ticket = require("../models/Ticket");

router.get("/admin", (req, res, next) => res.render("admin/profile"));

router.get("/admin/users", (req, res, next) => {
  User.find({ role: "User" })
    .sort({ createdAt: -1 })
    .then(users => {
      res.render("admin/users", { users });
    })
    .catch(err => next(err));
});

router.get("/admin/clients", (req, res, next) => {
  User.find({ role: "Client" })
    .sort({ createdAt: -1 })
    .then(clients => {
      res.render("admin/client", { clients });
    })
    .catch(err => next(err));
});

// router.post("/admin/artists/create", (req, res, next) => {
//   Artist.create({ ...req.body })
//     .then(() => res.redirect("/admin/artists"))
//     .catch(err => next(err));
// });

// router.get("/admin/artists/delete/:id", (req, res, next) => {
//   const { id } = req.params;
//   Artist.findByIdAndDelete(id)
//     .then(() => res.redirect("/admin/artists"))
//     .catch(err => next(err));
// });

module.exports = router;
