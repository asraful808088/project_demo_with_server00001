import axios from "axios";
import mapping from "../../../components/mapping/mapping";
import SERVERLINK from '../../../link/server/link'
function callServer(objData) {
  let trackData;
  if (objData.data.email.text === "") {
    trackData = mapping({
      objData: objData.data,
      targetField: "email",
      error: true,
    });
  } else {
    trackData = mapping({
      objData: objData.data,
      targetField: "email",
      error: false,
    });
  }
  if (objData.data.username.text === "") {
    trackData = mapping({
      objData: trackData ? trackData : objData.data,
      targetField: "username",
      error: true,
    });
  } else {
    trackData = mapping({
      objData: trackData ? trackData : objData.data,
      targetField: "username",
      error: false,
    });
  }
  if (objData.data.password.text === "") {
    trackData = mapping({
      objData: trackData ? trackData : objData.data,
      targetField: "password",
      error: true,
    });
  } else {
    trackData = mapping({
      objData: trackData ? trackData : objData.data,
      targetField: "password",
      error: false,
    });
  }
  if (objData.data.co_password.text === "") {
    trackData = mapping({
      objData: trackData ? trackData : objData.data,
      targetField: "co_password",
      error: true,
    });
  } else {
    trackData = mapping({
      objData: trackData ? trackData : objData.data,
      targetField: "co_password",
      error: false,
    });
  }
  objData.setData(trackData);
  if (
    objData.data.email.text === "" ||
    objData.data.username.text === "" ||
    objData.data.password.text === "" ||
    objData.data.co_password.text === ""
  ) {
    
    return;
  }
  axios
    .post(`${SERVERLINK}/create`, {
      email: objData.data.email.text,
      username: objData.data.username.text,
      password: objData.data.password.text,
      co_password: objData.data.co_password.text,
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
      });
      objData.changeCard();
    })
    .catch((err) => {
      let trackData;
      try {
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
          objData.setData(trackData);
        }  else {
          // todo
        }
      } catch (error) {
        objData.toast("network problem.please try again later");
      }
     
    });
}


export default callServer;
