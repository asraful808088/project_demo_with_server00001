const { pool } = require("./../../../db/database");
const createError = require("http-errors");
const { body, validationResult } = require("express-validator");
const { compare } = require("bcrypt");
const isValid = [
  body("email")
    .isEmail()
    .withMessage("your email invalid")
    .custom(async (data, fullInfo) => {
      if (fullInfo.req.body.email != "") {
        const query = await pool.query(
          `select * from users where email='${data}'`
        );

        if (query.rowCount === 0) {
          return true;
        }
        throw createError("email already exists");
      } else {
        return true;
      }
    }),
  body("username").custom(async (data, fullInfo) => {
    if (fullInfo.req.body.username != "") {
      const query = await pool.query(
        `select * from users where username='${data}'`
      );

      if (query.rowCount === 0) {
        return true;
      }
      throw createError("username already exists");
    } else {
      return true;
    }
  }),
  body("password").custom((data, fullInfo) => {
    if (
      fullInfo.req.body.password != null ||
      fullInfo.req.body.co_password != null
    ) {
      const userdata = fullInfo.req.body;
      if (userdata.password === userdata.co_password) {
        return true;
      }
      throw createError("password and co-password does not match");
    } else {
      return true;
    }
  }),
  body("old_password").custom(async (data, fullInfo) => {
    const userdata = fullInfo.req.body;
    const query = await pool.query(
      `select * from users where email='${userdata.userEmail}'`
    );
    if (userdata.old_password != "") {
      if (await compare(userdata.old_password, query.rows[0].password)) {
        return true;
      } else {
        throw createError("password incorrect ");
      }
    }
    throw createError("password incorrect ");
  }),
];

module.exports = { isValid };
