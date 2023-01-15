import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/button/button";
import TextInput from "../../components/TextInput/textInput";
import { getCookie } from "../../data/cookie/cookie";
import Loading from "../loading/loading";
import deleteUser from "../operation/delete/delete";
import callServer from "../operation/update/update";
import style from "./style.module.css";
import SERVERLINK from '../../link/server/link'
export default function Settings() {
  const navigate = useNavigate();
  const [updateOption, changeOption] = useState(true);
  const [isLoin, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteInfo, setDeleteinfo] = useState({
    userEmail: "",
    de_password: {
      text: "",
      error: "",
    },
  });
  const [userUpdateData, setUpdateData] = useState({
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
    old_password: {
      text: "",
      error: "",
    },
    userEmail: "",
  });
  useEffect(() => {
    axios({
      withCredentials: true,
      method: "get",
      url: `${SERVERLINK}/`,
      headers: {
        authorization: getCookie("coffeeShop"),
      },
    })
      .then((res) => {
        setLogin(true);
        setLoading(false);
        setUpdateData({
          ...userUpdateData,
          userEmail: res.data.email,
        });
        setDeleteinfo({
          ...deleteInfo,
          userEmail: res.data.email,
        });
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
  const onChange = (e, deleteData) => {
    if (deleteData) {
      const Data = {
        ...deleteInfo,
      };
      Data[e.target.id] = { ...Data[e.target.id], text: e.target.value };
      setDeleteinfo(Data);
    } else {
      const Data = {
        ...userUpdateData,
      };
      Data[e.target.id] = { ...Data[e.target.id], text: e.target.value };
      setUpdateData(Data);
    }
  };
  return loading ? (
    <Loading />
  ) : isLoin ? (
    <div className={style.root}>
      <div className={style.header}>
        <div
          className={style.logo}
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src={require("./../../assest/bg/home/homeLogo.png")}
            alt=""
            height={"100%"}
            width={"100%"}
          />
        </div>
      </div>
      <div className={style.contentBox}>
        <div className={style.tab}>
          <h1>Settings</h1>
          <div className={style.Button}>
            <div
              onClick={() => {
                changeOption(true);
              }}
            >
              Update
            </div>
            <div
              onClick={() => {
                changeOption(false);
              }}
            >
              Delete account
            </div>
          </div>
        </div>
        <div className={style.tabResult}>
          {updateOption ? (
            <div className={style.update}>
              <h1>Update</h1>
              <div className={style.changefields}>
                <div className={style.fieldsBox}>
                  <div className={style.items}>
                    <div className={style.labelName}>email</div>
                    <div className={style.fields}>
                      <TextInput
                        type={"email"}
                        iconType={"email"}
                        id="email"
                        onChange={onChange}
                        error={userUpdateData.email.error}
                        value={userUpdateData.email.text}
                      />
                    </div>
                  </div>
                  <div className={style.items}>
                    <div className={style.labelName}>username</div>
                    <div className={style.fields}>
                      <TextInput
                        type={"text"}
                        iconType={"username"}
                        id="username"
                        onChange={onChange}
                        value={userUpdateData.username.text}
                        error={userUpdateData.username.error}
                      />
                    </div>
                  </div>
                  <div className={style.items}>
                    <div className={style.labelName}>password</div>
                    <div className={style.fields}>
                      <TextInput
                        type={"password"}
                        iconType={"password"}
                        id="password"
                        onChange={onChange}
                        value={userUpdateData.password.text}
                        error={userUpdateData.password.error}
                      />
                    </div>
                  </div>
                  <div className={style.items}>
                    <div className={style.labelName}>co-password</div>
                    <div className={style.fields}>
                      <TextInput
                        type={"password"}
                        iconType={"password"}
                        id="co_password"
                        onChange={onChange}
                        value={userUpdateData.co_password.text}
                        error={userUpdateData.co_password.error}
                      />
                    </div>
                  </div>
                  <div className={style.items}>
                    <div className={style.labelName}>old password</div>
                    <div className={style.fields}>
                      <TextInput
                        type={"password"}
                        iconType={"password"}
                        placeholder="required"
                        id="old_password"
                        onChange={onChange}
                        error={userUpdateData.old_password.error}
                        value={userUpdateData.old_password.text}
                      />
                    </div>
                  </div>
                  <div className={style.items}>
                    <div className={style.fields}>
                      <Button
                        name="Submit"
                        onClick={() => {
                          console.log("click");
                          callServer({
                            data: userUpdateData,
                            setData: setUpdateData,
                            setLogin,
                            toast,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={style.update}>
              <h1>Delete</h1>
              <div className={style.changefields}>
                <div className={style.fieldsBox}>
                  <div className={style.items}>
                    <div className={style.labelName}>password</div>
                    <div className={style.fields}>
                      <TextInput
                        type={"password"}
                        iconType={"password"}
                        id="de_password"
                        onChange={(e) => {
                          onChange(e, true);
                        }}
                        error={deleteInfo.de_password.error}
                        value={deleteInfo.de_password.text}
                      />
                    </div>
                  </div>
                  <div className={style.items}>
                    <div className={style.fields}>
                      <Button
                        name="Submit"
                        onClick={() => {
                          deleteUser({
                            data: deleteInfo,
                            setData: setDeleteinfo,
                            setLogin,
                            toast,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
