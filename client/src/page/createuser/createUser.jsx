import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Buttom from "../../components/button/button";
import Link from "../../components/link/link";
import Textinput from "../../components/TextInput/textInput";
import callServer from "../operation/create_user/callServer";
import style from "./style.module.css";
export default function CreateUser({ onClick }) {
  const [userData, setUserData] = useState({
    email: {
      text: "",
      error: "",
    },
    username: {
      text: "",
      error: "",
    },
    password: {
      text: "",
      error: "",
    },
    co_password: {
      text: "",
      error: "",
    },
  });

  const onChange = (e) => {
    const Data = {
      ...userData,
    };
    Data[e.target.id] = { ...Data[e.target.id], text: e.target.value };

    setUserData(Data);
  };
  return (
    <div className={style.root}>
      <div className={`${style.items}  ${style.header}`}>Create User</div>
      <div className={`${style.items}  ${style.blank}`}></div>
      <div className={style.items}>
        <Textinput
          onChange={onChange}
          iconType={"email"}
          placeholder="email"
          type={"email"}
          id="email"
          error={userData.email.error}
          value={userData.email.text}
        />
      </div>
      <div className={style.items}>
        <Textinput
          type={"text"}
          iconType={"username"}
          placeholder="username"
          id={"username"}
          error={userData.username.error}
          value={userData.username.text}
          onChange={onChange}
        />
      </div>
      <div className={style.items}>
        <Textinput
          placeholder={"password"}
          iconType="password"
          type="password"
          id={"password"}
          error={userData.password.error}
          value={userData.password.text}
          onChange={onChange}
        />
      </div>
      <div className={style.items}>
        <Textinput
          placeholder={"co-password"}
          iconType="password"
          type="password"
          id={"co_password"}
          error={userData.co_password.error}
          value={userData.co_password.text}
          onChange={onChange}
        />
      </div>
      <div className={style.items}>
        <Buttom
          name="create user"
          onClick={() => {
            callServer({
              data: userData,
              setData: setUserData,
              changeCard: onClick,
              toast,
            });
          }}
        />
      </div>
      <div className={`${style.items} ${style.link}`}>
        <Link
          name={"i  have an account "}
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
