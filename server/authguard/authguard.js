const jwt = require("jsonwebtoken");
const { pool } = require("./../db/database");
const checkData = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization;
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const query = await pool.query("SELECT * FROM USERS where id=$1", [
        decode.id,
      ]);
      if (query.rows[0].last_update === decode.last_update) {
        req.user = decode;
      } else {
        throw "";
      }

      next();
    } catch (error) {
      res.status(401).json({
        success: false,
      });
    }
  } else {
    res.status(401).json({
      success: false,
    });
  }
};

module.exports = checkData;
