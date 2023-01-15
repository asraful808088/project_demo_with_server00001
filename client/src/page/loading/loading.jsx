import React from "react";
import cap from "../../assest/icon/cap/cap.png";
import style from "./style.module.css";
import somke from '../../assest/icon/cap/smoke.png'
import somke2 from '../../assest/icon/cap/smoke2.png'
import somke3 from '../../assest/icon/cap/smoke3.png'
export default function Loading() {
  return (
    <div className={style.root}>
      <div className={style.logo}>
        <img
          src={cap}
          alt=""
          className={style.items}
          height="70%"
          width={"100%"}
        ></img>
        <img  src={somke} alt="" className={style.items} style={{
          "--i":"0%"
        }}></img>
        <img  src={somke2} alt="" className={style.items} style={{
          "--i":"-70%"
        }}></img>
        <img  src={somke3} alt="" className={style.items} style={{
          "--i":"60%"
        }}></img>
      </div>
      <div className={style.name}>
      Coffee Roasterie
      </div>
    </div>
  );
}
