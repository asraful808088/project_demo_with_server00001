import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Buttom from "../../components/button/button";
import Link from "../../components/link/link";
import Textinput from "../../components/TextInput/textInput";
import { getCookie } from "../../data/cookie/cookie";
import Loading from "../loading/loading";
import callServer from "../operation/login/callServer";
import style from "./style.module.css";
import SERVER_LINK from "../../link/server/link";
export default function Login({ onClick }) {
  const [islogin, setlogin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios({
      withCredentials: true,
      method: "get",
      url: `${SERVER_LINK}/`,
      headers: {
        authorization: getCookie("coffeeShop"),
      },
    })
      .then((res) => {
        console.log("active");
        setlogin(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        try {
          if (err.response.status) {
            return;
          }
        } catch (error) {
          toast("network problem.please try again later");
        }
      });
  }, []);
  const [userData, setUserData] = useState({
    username: {
      text: "",
      error: "",
    },
    password: {
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
  return loading ? (
    <Loading />
  ) : islogin ? (
    <Navigate to="/" replace={true} />
  ) : (
    <div className={style.root}>
      <div className={`${style.items} ${style.header}`}>Login</div>
      <div className={`${style.items} ${style.blank}`}></div>
      <div className={style.items}>
        <Textinput
          iconType={"username"}
          placeholder="username"
          id={"username"}
          onChange={onChange}
          value={userData.username.text}
          error={userData.username.error}
        />
      </div>
      <div className={style.items}>
        <Textinput
          type={"password"}
          placeholder={"password"}
          iconType="password"
          id={"password"}
          onChange={onChange}
          value={userData.password.text}
          error={userData.password.error}
        />
      </div>
      <div className={style.items}>
        <Buttom
          name="login"
          onClick={() => {
            callServer({
              data: userData,
              setData: setUserData,
              setlogin,
              toast,
            });
          }}
        />
      </div>
      <div className={`${style.items} ${style.link}`}>
        <Link
          name={"create user ?"}
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
