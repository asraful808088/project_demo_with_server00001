const logout = require("express").Router();
logout.post("/", (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  return res.sendStatus(200)
});
module.exports = logout;
