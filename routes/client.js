const router = require("express").Router();
const Clients = require("../models/Clients");
const User = require("../models/User");

const { isLogged } = require("../handlers/middlewares");

router.get("/", (req, res, next) => {
  User.findById(req.user._id)
    .populate("ticket")
    .then(user => {
      res.render("client/client-profile", { tickets: user.ticket });
    })
    .catch(err => next(err));
});

router.get("/view-tickets", (req, res, next) => {
  Clients.findById(req.user._id)
    .populate("ticket")
    .then(user => {
      res.send(user.ticket);
    })
    .catch(err => next(err));
});
module.exports = router;
