const router = require("express").Router();
const Users = require("../models/User");
const Ticket = require("../models/Ticket");
const { isLogged } = require("../handlers/middlewares");

router.get("/", (req, res, next) => res.render("user/user-profile"));

//Muestra todos los tickets del Usuario
router.get("/view-tickets", (req, res, next) => {
  Ticket.find({})
    .sort({ createdAt: -1 })
    .then(tickets => {
      res.render("user/user-profile", { tickets });
    })
    .catch(err => next(err));
});

// router.get("/:id", (req, res, next) => {
//   const { id } = req.params;
//   Ticket.findById(id)
//     .then(data => {
//       console.log(data);
//       res.render("user/user-profile", data);
//     })
//     .catch(err => next(err));
// });

// router.get('/tickets', (req, res,  next) => {
//  const { status } = req.body
//  Ticket.findOneAndUpdate(status)
//  .then(() => res.redirect('user/view-tickets'))
//  .catch(err => (err))
// })

router.post('/tickets/:id',(req, res, next) => {
  const { id } = req.params

  if(!req.user)
  {
    res.redirect("/auth/login")
  }

  Ticket.findByIdAndUpdate(id, {status: req.body.status}, {new: true})
    .then(ticket => {
      console.log(ticket)
      res.redirect('/user/view-tickets');
    })
    .catch(err => next(err))
})

module.exports = router;
