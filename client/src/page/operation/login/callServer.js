import axios from "axios";
import setCookie from "../../../data/cookie/cookie";
import mapping from "./../../../components/mapping/mapping";
import SERVER_LINK from "../../../link/server/link";
function callServer(objData) {
  let trackData;
  if (objData.data.username.text === "") {
    trackData = mapping({
      objData: objData.data,
      targetField: "username",
      error: true,
    });
  } else {
    trackData = mapping({
      objData: objData.data,
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
    console.log(trackData);
  }
  objData.setData(trackData);
  if (objData.data.username.text === "" || objData.data.password.text === "") {
    return;
  }

  axios({
    withCredentials: true,
    method: "post",
    url: `${SERVER_LINK}/read`,
    data: {
      username: objData.data.username.text,
      password: objData.data.password.text,
    },
    headers: {
      "content-type": "application/json",
    },
  })
    .then((result) => {
      objData.setlogin(true);
      objData.setData({
        username: {
          text: "",
          error: "",
        },
        password: {
          text: "",
          error: "",
        },
      });

      setCookie("coffeeShop", result.data.token);
    })
    .catch((err) => {
      try {
        let trackData;

        if (err.response.status === 401) {
          if (err.response.data.password) {
            trackData = mapping({
              objData: trackData ? trackData : objData.data,
              targetField: "password",
              error: true,
              msg: err.response.data.password,
            });
          } else {
            trackData = mapping({
              objData: trackData ? trackData : objData.data,
              targetField: "password",
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
        } else {
          // todo
        }
      } catch (error) {
        objData.toast("network problem.please try again later");
      }
    });
}

export default callServer;
