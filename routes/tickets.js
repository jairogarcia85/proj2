const router = require("express").Router();
const Ticket = require("../models/Ticket");
const User = require("../models/User");

const { ObjectId } = require("mongoose").Types;

const { isLogged } = require("../handlers/middlewares");

router.get("/create-ticket", isLogged, (req, res, next) =>
  res.render("admin/tickets")
);

router.post("/", isLogged, (req, res, next) => {
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

router.get("/view-tickets", isLogged, (req, res, next) => {
  Ticket.find({})
    .sort({ createdAt: -1 })
    .then(tickets => {
      if (req.user.role === "Client") {
        res.redirect("../client");
      }
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

router.post("/view/:id", isLogged, (req, res, next) => {
  let { id } = req.params;
  console.log(id);
  Ticket.findByIdAndUpdate(
    id,
    { $push: { userComment: req.body.one } },
    { new: true }
<<<<<<< HEAD
  ).then(user => {
    console.log(user);
    res.redirect(`/tickets/${id}`);
=======
  ).then(ticket => {
    console.log(ticket);
    res.render("admin/tickets-detail", ticket);
>>>>>>> 8ebf0bfda11967f25d428a1ea3a1b62a3810f760
  });
});

router.post("/:id", (req, res, next) => {
  const { id } = req.params;
  if (!req.user) {
    res.redirect("/auth/login");
  }
  Ticket.findByIdAndUpdate(id, { status: req.body.status })
<<<<<<< HEAD
    .then(() => {
=======
    .then(ticket => {
>>>>>>> 8ebf0bfda11967f25d428a1ea3a1b62a3810f760
      res.redirect("/tickets");
    })
    .catch(err => next(err));
});

module.exports = router;




