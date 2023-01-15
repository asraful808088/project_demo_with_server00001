require("dotenv").config();
const server = require("express");
const createUser = require("./crud/create_user/createUser");
const { pool } = require("./db/database");
const read = require("./crud/login/login");
const { getUser } = require("./crud/getUserData/getUserData");
const update = require("./crud/update/update");
const logout = require("./crud/logout/logout");
const userDelete = require("./crud/delete/delete");
pool
  .connect()
  .then(async () => {
    console.log("database successfully  connected ");
  })
  .catch((err) => {
    console.log("database connect failed");
  });

if (process.env.MODE === "pro") {
  setInterval(async () => {
    const query = await pool.query("select * from users");
    if (query.rowCount > 0) {
      for (let index = 0; index < query.rows.length; index++) {
        if (query.rows[index].create_time < Date.now() - 3600000) {
          await pool.query("delete from users where id=$1", [
            query.rows[index].id,
          ]);
        }
      }
    }
  }, 10000);
}
const cors = require("cors");
const PORT = process.env.PORT;
const app = server();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(server.urlencoded({ extended: true }));
app.use(server.json());
app.use("/create", createUser);
app.use("/logout", logout);
app.use("/update", update);
app.use("/delete", userDelete);
app.use("/read", read);
app.use("/", getUser);
app.listen(
  PORT,
  process.env.MODE === "dev"
    ? ["192.168.0.104", "127.0.0.1", "http://103.126.13.169"]
    : null,
  (err) => {
    if (!err) {
      console.log(
        `server start on ${PORT} PORT || http://localhost:${PORT} ||  http://192.168.0.104:${PORT}`
      );
    } else {
      console.log("server start failed");
    }
  }
);
