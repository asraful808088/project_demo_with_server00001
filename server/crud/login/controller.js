const { validationResult } = require("express-validator");
const login = (req, res, next) => {
  const mapData = validationResult(req).array();
  if (mapData.length === 0) {
    res.status(200).json({
      token: req.token,
      success: true,
    });
  } else {
    res.status(401).json({
      password: "the username or password that you have entered is incorrect",
    });
  }
};
module.exports = { login };
