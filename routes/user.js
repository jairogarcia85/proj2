const router = require("express").Router();
const Users = require("../models/User");
const Ticket = require("../models/Ticket");
const { isLogged } = require("../handlers/middlewares");

router.get("/", (req, res, next) => res.render("user/user-profile"));

router.get("/view-tickets", (req, res, next) => {
  // Users.findById(req.user._id)
  //   .populate("ticket")
  //   .then(user => {
  //     res.send(user.ticket);
  //   })
  //   .catch(err => next(err));

  Ticket.find({ user: req.user.ticket }) //FALTA seleccionar ticket relacionado a user
    .sort({ createdAt: -1 })
    .then(tickets => {
      res.render("admin/view-tickets", { tickets });
    })
    .catch(err => next(err));
});

module.exports = router;
