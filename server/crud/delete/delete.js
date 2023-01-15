const deleteRoute = require("express").Router();
const { pool } = require("../../db/database");
const hash = require("bcrypt");
deleteRoute.post("/", async (req, res) => {
  const query = await pool.query("select * from users where email=$1", [
    req.body.userEmail,
  ]);
  if (query.rows[0]) {
    if (
      query.rows[0].password &&
      (await hash.compare(req.body.de_password, query.rows[0].password))
    ) {
      const query = await pool.query(`delete from users where email=$1`, [
        req.body.userEmail,
      ]);
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(401).json({
        de_password: "password incorrect",
        success: false,
      });
    }
  } else {
    res.status(401).json({
      success: false,
    });
  }
});

module.exports = deleteRoute;
