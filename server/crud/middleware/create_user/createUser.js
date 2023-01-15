const { pool } = require("./../../../db/database");
const createError = require("http-errors");

const { body, validationResult } = require("express-validator");
const isValid = [
  body("email")
    .isEmail()
    .withMessage("your email invalid")
    .custom(async (data, fullInfo) => {
      const query = await pool.query(
        `select * from users where email='${data}'`
      );

      if (query.rowCount === 0) {
        return true;
      }
      throw createError("email already exists");
    }),
  body("username").custom(async (data, fullInfo) => {
    const query = await pool.query(
      `select * from users where username='${data}'`
    );

    if (query.rowCount === 0) {
      return true;
    }
    throw createError("username already exists");
  }),
  body("password").custom((data, fullInfo) => {
    const userdata = fullInfo.req.body;
    if (userdata.password === userdata.co_password) {
      return true;
    }
    throw createError("password and co-password does not match");
  }),
];

module.exports = { isValid };
