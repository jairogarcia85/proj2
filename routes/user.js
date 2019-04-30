const router = require("express").Router();
const Users = require("../models/User");
const { isLogged } = require("../handlers/middlewares");

router.get("/", (req, res, next) => 
res.render("user/user-profile"));

module.exports = router;
