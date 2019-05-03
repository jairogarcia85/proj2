const router = require("express").Router();
//const Users = require("../models/User");
const Ticket = require("../models/Ticket");
const { isLogged } = require("../handlers/middlewares");
const { isUser } = require("../handlers/middlewares");

router.get("/", isUser, (req, res, next) => res.render("user/user-profile"));

//Muestra todos los tickets del Usuario
router.get("/view-tickets", isLogged, (req, res, next) => {
  Ticket.find({})
    .sort({ createdAt: -1 })
    .then(tickets => {
      if (req.user.role === "Client") {
        res.redirect("../client");
      }
      res.render("user/user-profile", { tickets });
    })
    .catch(err => next(err));
});

router.post("/tickets/:id", (req, res, next) => {
  const { id } = req.params;
  if (!req.user) {
    res.redirect("/auth/login");
  }
  Ticket.findByIdAndUpdate(id, { status: req.body.status }, { new: true })
    .then(ticket => {
      if (req.user.role === "Client") {
        res.redirect("/client");
      }
      res.redirect("/user/view-tickets");
    })
    .catch(err => next(err));
});

module.exports = router;
