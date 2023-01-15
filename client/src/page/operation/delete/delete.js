import axios from "axios";
import mapping from "../../../components/mapping/mapping";
import { removeCookie } from "../../../data/cookie/cookie";
import SERVERLINK from '../../../link/server/link'
const callServer = (objData) => {
  let trackData;
  if (objData.data.de_password.text === "") {
    trackData = mapping({
      objData: objData.data,
      targetField: "de_password",
      error: true,
    });
  } else {
    trackData = mapping({
      objData: objData.data,
      targetField: "de_password",
      error: false,
    });
  }
  console.log(trackData);
  objData.setData(trackData);
  if (objData.data.de_password.text === "") {
    return;
  }
  axios({
    withCredentials: true,
    method: "post",
    url: `${SERVERLINK}/delete`,
    data: {
      de_password: objData.data.de_password.text,
      userEmail: objData.data.userEmail,
    },
    headers: {
      "content-type": "application/json",
    },
  })
    .then((result) => {
      removeCookie("coffeeShop");
      objData.setLogin(false);
    })
    .catch((err) => {
     try {
      let trackData;

      if (err.response.status === 401) {
        if (err.response.data.de_password) {
          trackData = mapping({
            objData: trackData ? trackData : objData.data,
            targetField: "de_password",
            error: true,
            msg: err.response.data.de_password,
          });
        } else {
          trackData = mapping({
            objData: trackData ? trackData : objData.data,
            targetField: "de_password",
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
};
export default callServer;
