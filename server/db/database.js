const { Client } = require("pg");
const localHost = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};
const onlineHost = process.env.PSQLSERVER;
const pool = new Client(process.env.MODE === "dev" ? localHost : onlineHost);
module.exports = { pool };
