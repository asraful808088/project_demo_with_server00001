import React, { useState } from "react";
import logo from "./../assest/icon/logo_with_name.png";
import CreateUser from "./createuser/createUser";
import Login from "./login/login";
import style from "./style.module.css";
export default function Index() {
  const [isLogin, setLoginStatus] = useState(true);
  const statusChanger = () => {
    setLoginStatus(!isLogin);
  };
  return (
    <div className={style.root}>
      <div className={style.subContainer}>
        <div className={style.items}>
          <div className={style.logo}>
            <img src={logo} alt="" height={"100%"} width="100%" />
          </div>
        </div>
        <div className={style.items}>
          <div className={style.card}>
            {isLogin ? (
              <Login onClick={statusChanger} />
            ) : (
              <CreateUser onClick={statusChanger} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
