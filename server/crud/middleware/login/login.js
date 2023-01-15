const { body } = require("express-validator");
const createError = require("http-errors");
const { pool } = require("../../../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isValid = [
  body("username").custom(async (data) => {
    const getData = await pool.query(
      `select * from users where username='${data}'`
    );
    if (getData.rowCount > 0) {
      return true;
    }
    throw createError(
      " the username or password that you have entered is incorrect."
    );
  }),
  body("password").custom(async (data, info) => {
    const getData = await pool.query(
      `select * from users where username='${info.req.body.username}'`
    );

    if (getData.rowCount > 0) {
      const result = await bcrypt.compare(
        info.req.body.password,
        getData.rows[0].password
      );
      if (result) {
        const userdata = {
          ...getData.rows[0],
        };
        delete userdata["password"];
        const token = jwt.sign(userdata, process.env.JWT_SECRET, {
          expiresIn: process.env.DATE_OVER_TIME,
        });
        info.req.token = token;
        console.log(result);
        return result;
      } else {
        throw createError(
          "the username or password that you have entered is incorrect."
        );
      }
    }
    throw createError(
      "the username or password that you have entered is incorrect."
    );
  }),
];

module.exports = isValid;
