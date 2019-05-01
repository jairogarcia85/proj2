const router = require("express").Router();
const Clients = require("../models/Clients");
const { isLogged } = require("../handlers/middlewares");

router.get("/", (req, res, next) => res.render("client/client-profile"));

router.get("/view-tickets", (req, res, next) => {
  Clients.findById(req.user._id).populate('ticket')
  .then(user => {
    res.send(user.ticket)
  })
  .catch(err => next(err));

});
module.exports = router;
