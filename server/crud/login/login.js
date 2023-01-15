const route = require("express").Router();
const { login } = require("./controller");
const isValidLogin = require("../middleware/login/login");
route.post("/", isValidLogin, login);
module.exports = route;
