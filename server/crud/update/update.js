const updateRoute = require("express").Router();
const { update } = require("./controller");
const { isValid } = require("../middleware/update/update");

updateRoute.post("/", isValid, update);

module.exports = updateRoute;
