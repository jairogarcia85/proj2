const router = require("express").Router();
const Clients = require("../models/Clients");
const { isLogged } = require("../handlers/middlewares");

router.get("/", (req, res, next) => res.render("client/client-profile"));

module.exports = router;
