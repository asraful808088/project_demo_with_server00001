import React from "react";
import style from './style.module.css'
export default function Button({name='button',onClick}){
    return <button value={name} className={
        style.base
    } onClick={onClick}>
    {name}
    
    </button>
}