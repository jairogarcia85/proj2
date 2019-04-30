const router = require("express").Router();
const Ticket = require("../models/Ticket");
const { isLogged } = require("../handlers/middlewares");

router.get("/tickets", (req, res, next) => res.render("admin/tickets"));

router.post("/tickets", (req, res, next) => {
  if (req.user.role === "Client") {
    Ticket.create({ ...req.body })
      .then(() => {
        res.redirect("/tickets");
      })
      .catch(err => next(err));
  } else {
    res.redirect("/login");
  }
});

router.post("/tickets/:id", (req, res, next) => {
  const { id } = req.params;
  if (
    req.user.role === "Client" ||
    req.user.role === "User" ||
    req.user.role === "Admin"
  ) {
    Ticket.findByIdAndUpdate(id, { status: req.body.status })
      .then(() => {
        res.redirect("/tickets");
      })
      .catch(err => next(err));
  }
});

module.exports = router;
