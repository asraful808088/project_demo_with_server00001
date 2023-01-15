import React from "react";
import email from "../icon/email.png";
import key from "../icon/key.png";
import usernameIcon from "../icon/username.png";
import style from "./style.module.css";
export default function TextInput({
  error,
  placeholder,
  type,
  iconType,
  id,
  value,
  onChange,
}) {
  return (
    <div className={style.root}>
      <div className={style.inputBox}>
        <input
          value={value}
          onChange={(e) => {
            
            if (onChange) {
              onChange(e);
            }
          }}
          className={style.input}
          type={
            type === "email"
              ? "email"
              : type === "password"
              ? "password"
              : "text"
          }
          name={id}
          id={id}
          placeholder={placeholder}
        />{" "}
        <div className={style.icon}>
          <img
            src={
              iconType === "email"
                ? email
                : iconType === "password"
                ? key
                : iconType === "username"
                ? usernameIcon
                : ""
            }
            alt=""
            height={"100%"}
            width="100%"
          />
        </div>
      </div>
      <div className={style.error}>{error}</div>
    </div>
  );
}
