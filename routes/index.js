const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/contact", (req, res, next) => {
  res.render("contact");
});

router.get("user/view-tickets", (req, res, next) => {
  if (req.user.role === "Admin" || req.user.role === "User") {
    res.redirect("/user/view-tickets");
  }
  if (req.user.role === "Client") res.redirect("/client");
});

module.exports = router;
