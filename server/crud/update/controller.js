const { pool } = require("../../db/database");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const update = async (req, res) => {
  const mapError = validationResult(req).mapped();
  if (validationResult(req).array().length > 0) {
    if (req.body.email === "" && validationResult(req).array().length === 1) {
      const userdata = await updateData(req.body);
      
      const token = jwt.sign(userdata, process.env.JWT_SECRET, {
        expiresIn: process.env.DATE_OVER_TIME,
      });
      return res.status(200).json({
        userdata,
        token: token,
        success: true,
      });
    } else {
      let pack = {};
      for (
        let index = 0;
        index < validationResult(req).array().length;
        index++
      ) {
        const getError = validationResult(req).array()[index];
        pack[getError.param] = getError.msg;
      }
      if (req.body.email === "") {
        delete pack["email"];
      }

      res.status(401).json(pack);
    }
  } else {
    await updateData(req.body);
    res.status(200).json({
      success: true,
    });
  }
};

const updateData = async (body) => {
  const id = await (
    await pool.query(`select * from users where email='${body.userEmail}'`)
  ).rows[0].id;
  await pool.query(
    `update users set last_update=${Date.now()} where email='${body.userEmail}'`
  );
  if (body.username != "") {
    await pool.query(
      `update users set username='${body.username}' where email='${body.userEmail}'`
    );
  }
  if (body.password != "") {
    const password = await bcrypt.hash(body.password, 10);
    await pool.query(
      `update users set password='${password}' where email='${body.userEmail}'`
    );
  }
  if (body.email != "") {
    await pool.query(
      `update users set email='${body.email}' where email='${body.userEmail}'`
    );
  }

  const query = await pool.query(`select * from users where id='${id}'`);
  const user = query.rows[0];
  delete user["password"];
  return user;
};

module.exports = { update };
