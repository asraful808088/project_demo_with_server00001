import axios from "axios";
import mapping from "../../../components/mapping/mapping";
import { removeCookie } from "../../../data/cookie/cookie";
import SERVERLINK from '../../../link/server/link'
function callServer(objData) {
  let trackData;
  if (objData.data.old_password.text === "") {
    trackData = mapping({
      objData: objData.data,
      targetField: "old_password",
      error: true,
    });
  } else {
    trackData = mapping({
      objData: objData.data,
      targetField: "old_password",
      error: false,
    });
  }

  objData.setData(trackData);
  if (objData.data.old_password.text === "") {
    return;
  }

  axios({
    withCredentials: true,
    method: "post",
    url: `${SERVERLINK}/update`,
    data: {
      username: objData.data.username.text,
      password: objData.data.password.text,
      email: objData.data.email.text,
      co_password: objData.data.co_password.text,
      old_password: objData.data.old_password.text,
      userEmail: objData.data.userEmail,
    },
    headers: {
      "content-type": "application/json",
    },
  })
    .then((result) => {
      objData.setData({
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
      removeCookie("coffeeShop");
      objData.setLogin(false);
    })
    .catch((err) => {
     try {
      let trackData;
      if (err.response.status === 401) {
        if (err.response.data.email) {
          trackData = mapping({
            objData: trackData ? trackData : objData.data,
            targetField: "email",
            error: true,
            msg: err.response.data.email,
          });
        } else {
          trackData = mapping({
            objData: trackData ? trackData : objData.data,
            targetField: "email",
            error: false,
          });
        }

        if (err.response.data.password) {
          trackData = mapping({
            objData: trackData ? trackData : objData.data,
            targetField: "co_password",
            error: true,
            msg: err.response.data.password,
          });
        } else {
          trackData = mapping({
            objData: trackData ? trackData : objData.data,
            targetField: "co_password",
            error: false,
          });
        }

        if (err.response.data.username) {
          trackData = mapping({
            objData: trackData ? trackData : objData.data,
            targetField: "username",
            error: true,
            msg: err.response.data.username,
          });
        } else {
          trackData = mapping({
            objData: trackData ? trackData : objData.data,
            targetField: "username",
            error: false,
          });
        }
        if (err.response.data.old_password) {
          trackData = mapping({
            objData: trackData ? trackData : objData.data,
            targetField: "old_password",
            error: true,
            msg: err.response.data.old_password,
          });
        } else {
          trackData = mapping({
            objData: trackData ? trackData : objData.data,
            targetField: "old_password",
            error: false,
          });
        }
        objData.setData(trackData);
      } else {
        // todo
      }
     } catch (error) {
      objData.toast("network problem.please try again later");
     }
    });
}
export default callServer;
