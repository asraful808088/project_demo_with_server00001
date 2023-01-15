import React  from "react";
import style from './link.module.css'


export default function Link({name,onClick}){
    return <p className={style.link} onClick={()=>{
        if(onClick!==null){
            onClick()
        }
    }}>
        {name}
    </p>
}