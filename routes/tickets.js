const router = require("express").Router();
const Ticket = require("../models/Ticket");
const User = require("../models/User");

const { ObjectId } = require("mongoose").Types;

const { isLogged } = require("../handlers/middlewares");

router.get("/create-ticket", (req, res, next) => res.render("admin/tickets"));

router.post("/", (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }
  if (req.user.role === "Client") {
    Ticket.create({ ...req.body })
      .then(ticket => {
        console.log(ticket);
        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { ticket: ObjectId(ticket._id) }
          },
          { new: true }
        ).then(user => {
          console.log(user);
          res.redirect("/client");
        });
      })
      .catch(err => next(err));
  } else {
    res.redirect("/auth/login");
  }
});

router.post("/:id", (req, res, next) => {
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



router.get("/view-tickets", (req, res, next) => {
  Ticket.find({})
  .sort({ createdAt: -1 })
  .then(tickets => {
    res.render("admin/view-tickets", { tickets });
  })
  .catch(err => next(err));
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Ticket.findById(id)
  .then(data => {
    console.log(data);
    res.render("admin/tickets-detail", data);
  })
  .catch(err => next(err));
});

//router.get("/:id", (req, res, next) => {
//  const { id } = req.params;
//  if (
//    req.user.role !== "Client" ||
//    req.user.role !== "User" ||
//    req.user.role !== "Admin"
//  ) {
//    Ticket.findByIdAndUpdate(id, { status: req.body.status })
//      .then(() => {
//        res.redirect("/auth/login");
//      })
//      .catch(err => next(err));
//  }
//});

module.exports = router;
