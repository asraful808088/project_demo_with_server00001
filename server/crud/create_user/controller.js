const { validationResult } = require("express-validator");
const { pool } = require("../../db/database");
const bcrypt = require("bcrypt");
const create = async (req, res, next) => {
  const mapError = validationResult(req).mapped();
  if (validationResult(req).array().length > 0) {
    let pack = {};
    for (let index = 0; index < validationResult(req).array().length; index++) {
      const getError = validationResult(req).array()[index];
      pack[getError.param] = getError.msg;
    }
    res.status(401).json(pack);
  } else {
    const password = await bcrypt.hash(req.body.password, 10);
    const result = await pool.query(
      `insert into users(email,username,password,is_staff,is_active,is_admin,create_time)values('${
        req.body.email
      }','${req.body.username}','${password}',false,true,false,${Date.now()})`
    );
    res.status(200).json({
      success: true,
    });
  }
};
module.exports = { create };
